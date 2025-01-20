import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../config"

export const submitAssessment = async ({uid,submissionData})=>{
    await setDoc(doc(db,`users/${uid}`),{
        assessment:{...submissionData}
    },{
        merge:true
    })
}

export const getAssessments = async ({uid})=>{
    const docRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    // console.log("🥳", docSnap.data())
    return docSnap.data() || []
}