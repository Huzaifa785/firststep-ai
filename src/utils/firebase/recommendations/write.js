import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const promptTemplate = (assessmentData) => `
Based on the following assessment data, provide career recommendations in a structured JSON format.
Assessment data: ${JSON.stringify(assessmentData)}

Provide recommendations in exactly this JSON structure:
{
  "primaryCareerPaths": [{
    "career": string,
    "matchScore": number,
    "reasonForMatch": string,
    "industryOutlook": {
      "growthRate": string,
      "marketDemand": string,
      "futureProspects": string,
      "topRecruiters": [{
        "type": string,
        "companies": [string],
        "averagePackage": string
      }]
    },
    "subFields": [{
      "name": string,
      "description": string,
      "currentTrends": [string],
      "requiredSkills": {
        "technical": [{
          "skill": string,
          "technologies": [string],
          "proficiencyLevel": string
        }],
        "soft": [string]
      },
      "preparationResources": {
        "courses": [{
          "name": string,
          "platform": string,
          "duration": string,
          "cost": string,
          "certification": boolean,
          "link": string
        }]
      }
    }]
  }],
  "additionalInsights": {
    "careerProgression": {
      "year1": { "role": string, "focus": string, "expectedPackage": string },
      "year3": { "role": string, "focus": string, "expectedPackage": string },
      "year5": { "role": string, "focus": string, "expectedPackage": string }
    },
    "workLifeBalance": {
      "averageWorkHours": string,
      "remoteOpportunities": string,
      "stressLevel": string,
      "tips": [string]
    }
  }
}
`;

export const getRecommendations = async ({ uid }) => {
    try {
        // Fetch the user document which contains the assessment data
        const userDoc = await getDoc(doc(db, `users/${uid}`));
        console.log("💪🏼", userDoc)
        
        if (!userDoc.exists()) {
            throw new Error("User not found");
        }

        const userData = userDoc.data();

        console.log("🧠", userData)
        
        // Check if assessment data exists
        if (!userData) {
            throw new Error("No assessment data found");
        }

        // Get recommendations from Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = promptTemplate(userData);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse recommendations
        const recommendations = JSON.parse(text);
        
        // Store recommendations back in the user document
        await setDoc(doc(db, `users/${uid}`), {
            recommendations,
            recommendationsGeneratedAt: new Date().toISOString()
        }, { merge: true });

        console.log("🔥", recommendations);

        return recommendations;
        
    } catch (error) {
        console.error("Error generating recommendations:", error);
        throw error;
    }
}

export const fetchUserRecommendations = async ({ uid }) => {
    try {
        // Fetch the user document
        const userDoc = await getDoc(doc(db, `users/${uid}`));
        
        if (!userDoc.exists()) {
            throw new Error("User not found");
        }

        const userData = userDoc.data();
        
        // Check if recommendations exist
        if (!userData.recommendations) {
            // If no recommendations exist, you might want to generate them
            throw new Error("No recommendations found for this user");
        }

        // Return the recommendations along with generation timestamp
        return {
            recommendations: userData.recommendations,
            generatedAt: userData.recommendationsGeneratedAt
        };
        
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}