"use client";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
// import { useNavigate } from 'react-router-dom';
=======
>>>>>>> 8c50874 (updated dashboard, assessment and roadmap)
import {
  Brain,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Flower,
  MapPin,
  Star,
  XCircle,
  AlertCircle,
  Edit2,
  Eye,
  Clock,
  BookOpen,
  GraduationCap,
  User,
  Heart,
  Briefcase,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  submitAssessment,
  getAssessments,
} from "@/utils/firebase/assessment/write";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { getUserAssessment } from "@/utils/firebase/assessment/read";
import { formatObjectToText } from "@/utils/util";
=======
import Link from "next/link";
>>>>>>> 8c50874 (updated dashboard, assessment and roadmap)

const CustomAlert = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "rounded-lg p-4";
  const variantClasses = {
    default: "bg-violet-50 border border-violet-200",
    warning: "bg-yellow-50 border border-yellow-200",
    error: "bg-red-50 border border-red-200",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Updated AssessmentNotification
const AssessmentNotification = ({ hasRecommendations }) => {
  if (!hasRecommendations) {
    return (
      <CustomAlert variant="warning" className="mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-yellow-900 font-medium mb-1">
              Your assessment is being processed
            </h3>
            <p className="text-yellow-700">
              We're generating your personalized career recommendations. This
              might take a few minutes.
            </p>
          </div>
        </div>
      </CustomAlert>
    );
  }

  return (
    <CustomAlert variant="default" className="mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-violet-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-violet-900 font-medium mb-1">
            Assessment completed successfully
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-violet-700">
              Your personalized career roadmap is ready to explore.
            </p>
            <Link
              href="/dashboard/roadmap"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors shrink-0"
            >
              View Roadmap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </CustomAlert>
  );
};

const AssessmentResult = ({ assessment }) => {
  if (!assessment) return null;

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const recommendations = assessment.recommendations;
  const primaryCareer = recommendations?.primaryCareerPaths?.[0];

  return (
    <div className="space-y-6">
      {/* Completion Alert */}
      <Alert variant="default" className="bg-violet-50 border-violet-200">
        <CheckCircle className="h-4 w-4 text-violet-600" />
        <AlertTitle className="text-violet-900 flex items-center gap-2">
          Assessment Completed Successfully
          <span className="text-sm font-normal text-violet-600">
            ({formatDate(assessment.metadata.completedAt)})
          </span>
        </AlertTitle>
        <AlertDescription className="text-violet-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <p>
              A personalized career roadmap has been generated based on your
              responses.
            </p>
            <Link
              href="/dashboard/roadmap"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors shrink-0"
            >
              View Roadmap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Education */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-medium text-gray-900">Education</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Current Status: {assessment.education.currentStatus}
            </p>
            <p className="text-sm text-gray-600">
              Stream: {assessment.education.stream12th}
            </p>
            <p className="text-sm text-gray-600">
              Degree: {assessment.education.degree}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Strong Subjects</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {assessment.skills.strongSubjects.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Career Match */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Top Career Match</h3>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              {primaryCareer?.career}
            </p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">
                {primaryCareer?.matchScore}% Match
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {primaryCareer?.reasonForMatch}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interest & Goals */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Heart className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-medium text-gray-900">Interests & Goals</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Technical Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {assessment.interests.technicalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-violet-50 text-violet-600 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Work Environment
              </p>
              <p className="text-sm text-gray-600">
                {assessment.interests.workEnvironment}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Short Term Goals
              </p>
              <div className="flex flex-wrap gap-2">
                {assessment.careerGoals.shortTermGoals.map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-violet-50 text-violet-600 text-sm rounded-full"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Target className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-medium text-gray-900">Career Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-lg font-medium text-gray-900">
                  {primaryCareer?.industryOutlook.growthRate}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Market Demand</p>
                <p className="text-lg font-medium text-gray-900">
                  {primaryCareer?.industryOutlook.marketDemand.split(".")[0]}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Top Recruiters
              </p>
              {primaryCareer?.industryOutlook.topRecruiters.map(
                (recruiter, index) => (
                  <div key={index} className="mb-3">
                    <p className="text-sm font-medium text-gray-900">
                      {recruiter.type}
                    </p>
                    <p className="text-sm text-violet-600">
                      {recruiter.averagePackage}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recruiter.companies.map((company, idx) => (
                        <span key={idx} className="text-sm text-gray-600">
                          {company}
                          {idx !== recruiter.companies.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Navigation Component
const SectionNav = ({
  sections,
  currentSection,
  currentQuestion,
  questions,
  answers,
}) => {
  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-6 bg-white rounded-xl p-2 sm:p-4 shadow-sm">
      {sections.map((section, idx) => {
        const sectionQuestions = questions.filter(
          (q) => q.section === section.id
        );
        const isActive = currentSection.id === section.id;
        const isCompleted = sectionQuestions.every((q) => {
          const questionIndex = questions.findIndex(
            (quest) => quest.id === q.id
          );
          const answer = answers[questionIndex];
          if (!answer) return false;
          if (q.type === "text") return answer.trim().length >= 10;
          if (q.isMultiSelect)
            return Array.isArray(answer) && answer.length > 0;
          return true;
        });

        return (
          <div
            key={section.id}
            className={`flex flex-col items-center px-2 sm:px-4 py-2 rounded-lg transition-all
              ${isActive ? "bg-violet-50" : ""}`}
          >
            <div
              className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 ${
                isActive ? "text-violet-600" : "text-gray-500"
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-medium text-center sm:text-left hidden sm:block">
                {section.title}
              </span>
            </div>
            <div className="mt-2 w-full h-1 rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-violet-600"
                    : "bg-gray-200"
                }`}
                style={{
                  width: isCompleted
                    ? "100%"
                    : isActive
                    ? `${
                        ((currentQuestion -
                          questions.findIndex((q) => q.section === section.id) +
                          1) /
                          sectionQuestions.length) *
                        100
                      }%`
                    : "0%",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Section definitions
const sections = [
  { id: "education", title: "Education", icon: GraduationCap, color: "violet" },
  { id: "skills", title: "Skills", icon: Brain, color: "blue" },
  { id: "interests", title: "Interests", icon: Heart, color: "pink" },
  { id: "personal", title: "Personal", icon: User, color: "green" },
  { id: "career", title: "Career", icon: Target, color: "orange" },
];

// Questions array
const questions = [
  // Educational Background Section
  {
    id: 1,
    section: "education",
    type: "multiple",
    question: "What is your current educational status?",
    options: [
      "10th Standard",
      "12th Standard",
      "Undergraduate",
      "Postgraduate",
      "Working Professional",
    ],
  },
  {
    id: 2,
    section: "education",
    type: "multiple",
    question: "Which stream did you choose in 12th Standard?",
    options: [
      "Science (PCM)",
      "Science (PCB)",
      "Commerce",
      "Arts/Humanities",
      "Other",
    ],
  },
  {
    id: 3,
    section: "education",
    type: "multiple",
    question: "What degree are you pursuing/completed?",
    options: [
      "B.Tech/B.E.",
      "BCA/BSc (Computer Science)",
      "B.Com",
      "BBA",
      "BA",
      "Other",
    ],
  },
  // Skills Section
  {
    id: 4,
    section: "skills",
    type: "multiple",
    isMultiSelect: true,
    question: "Select your strongest subjects:",
    options: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer Science",
      "Economics",
      "Languages",
    ],
  },
  {
    id: 5,
    section: "skills",
    type: "scale",
    question: "How would you rate your overall academic performance?",
    options: [1, 2, 3, 4, 5],
    labels: ["Below Average", "Excellent"],
  },
  // Interests Section
  {
    id: 6,
    section: "interests",
    type: "multiple",
    isMultiSelect: true,
    question: "Which technical skills interest you most?",
    options: [
      "Programming/Coding",
      "Data Analysis",
      "Design/Creative Tools",
      "Digital Marketing",
      "Project Management",
      "Research & Analysis",
    ],
  },
  {
    id: 7,
    section: "interests",
    type: "multiple",
    question: "What type of work environment interests you?",
    options: [
      "Startup Culture",
      "Corporate Setting",
      "Government Sector",
      "Research Institution",
      "Own Business",
    ],
  },
  // Personal Traits Section
  {
    id: 8,
    section: "personal",
    type: "scale",
    question: "How comfortable are you with public speaking?",
    options: [1, 2, 3, 4, 5],
    labels: ["Very Uncomfortable", "Very Comfortable"],
  },
  {
    id: 9,
    section: "personal",
    type: "multiple",
    isMultiSelect: true,
    question: "Select your working style preferences:",
    options: [
      "Independent Work",
      "Team Collaboration",
      "Leadership Roles",
      "Creative Freedom",
      "Structured Environment",
    ],
  },
  // Career Goals Section
  {
    id: 10,
    section: "career",
    type: "multiple",
    isMultiSelect: true,
    question: "What are your career goals in the next 2 years?",
    options: [
      "Higher Studies",
      "Job/Employment",
      "Entrepreneurship",
      "Skill Development",
      "Competitive Exams",
    ],
  },
  {
    id: 11,
    section: "career",
    type: "multiple",
    question: "What is your preferred work location?",
    options: [
      "Within Home State",
      "Major Indian Cities",
      "Tier 2/3 Cities",
      "International Opportunities",
      "No Preference",
    ],
  },
  {
    id: 12,
    section: "career",
    type: "text",
    question:
      "In your own words, describe your ideal career path and where you see yourself in 5 years. Feel free to express in any language you're comfortable with.",
    placeholder: "Share your career aspirations, goals, and dreams...",
  },
];

// Existing Assessment Card Component
const ExistingAssessmentCard = ({ assessment, onEdit, onView }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Your Career Assessment
            </h2>
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(assessment.metadata.completedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 text-white bg-violet-600 hover:bg-violet-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-violet-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-medium">Education</p>
              <p className="text-sm text-gray-600">
                {assessment.education.currentStatus}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Skills</p>
              <p className="text-sm text-gray-600">
                {assessment.skills.strongSubjects.slice(0, 2).join(", ")}
                {assessment.skills.strongSubjects.length > 2 && "..."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Target className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="font-medium">Career Goals</p>
              <p className="text-sm text-gray-600">
                {assessment.careerGoals.shortTermGoals.slice(0, 2).join(", ")}
                {assessment.careerGoals.shortTermGoals.length > 2 && "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          Completed {assessment.metadata.questionsAnswered} of{" "}
          {assessment.metadata.totalQuestions} questions
        </div>
      </div>
    </div>
  );
};

// Main Assessment Component
const Assessment = () => {
  const user = useSelector((state) => state.user);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [existingAssessment, setExistingAssessment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSubmittedAssessment, setHasSubmittedAssessment] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      setUserId(user.uid);
      const fetchAssessments = async () => {
        try {
          const response = await getAssessments({ uid: user.uid });
          console.log("🧠", response);
          if (response?.length > 0) {
            setExistingAssessment(response[0]);
            setHasSubmittedAssessment(true);
            if (isEditing) {
              const prefilledAnswers = mapAssessmentToAnswers(response[0]);
              setAnswers(prefilledAnswers);
            }
          }
        } catch (error) {
          console.error("Error fetching assessments:", error);
        }
      };
      fetchAssessments();
    }
  }, [user, isEditing]);

  const mapAssessmentToAnswers = (assessment) => {
    return {
      0: assessment.education.currentStatus,
      1: assessment.education.stream12th,
      2: assessment.education.degree,
      3: assessment.skills.strongSubjects,
      4: assessment.skills.academicPerformance,
      5: assessment.interests.technicalSkills,
      6: assessment.interests.workEnvironment,
      7: assessment.personalTraits.publicSpeaking,
      8: assessment.personalTraits.workingStyle,
      9: assessment.careerGoals.shortTermGoals,
      10: assessment.careerGoals.preferredLocation,
      11: assessment.careerGoals.careerVision,
    };
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setShowCompletion(false);
    const prefilledAnswers = mapAssessmentToAnswers(existingAssessment);
    setAnswers(prefilledAnswers);
  };

  const handleView = () => {
    router.push("/dashboard/roadmap");
  };

  // useEffect(()=>{

  // },[])

  const getCurrentSection = () => {
    const currentQ = questions[currentQuestion];
    return sections.find((s) => s.id === currentQ.section);
  };

  const validateQuestion = (questionIndex) => {
    const question = questions[questionIndex];
    const answer = answers[questionIndex];

    if (!answer) return false;

    if (question.type === "text") {
      return answer.trim().length >= 10;
    }

    if (question.isMultiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }

    return true;
  };

  const prepareSubmissionData = () => {
    return {
      education: {
        currentStatus: answers[0],
        stream12th: answers[1],
        degree: answers[2],
      },
      skills: {
        strongSubjects: answers[3] || [],
        academicPerformance: answers[4],
      },
      interests: {
        technicalSkills: answers[5] || [],
        workEnvironment: answers[6],
      },
      personalTraits: {
        publicSpeaking: answers[7],
        workingStyle: answers[8] || [],
      },
      careerGoals: {
        shortTermGoals: answers[9] || [],
        preferredLocation: answers[10],
        careerVision: answers[11],
      },
      metadata: {
        completedAt: new Date().toISOString(),
        totalQuestions: questions.length,
        questionsAnswered: Object.keys(answers).length,
      },
    };
<<<<<<< HEAD

    // console.log("🥳 response:-\n", formattedResponse);

    return formattedResponse;
=======
>>>>>>> 8c50874 (updated dashboard, assessment and roadmap)
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    setValidationErrors({
      ...validationErrors,
      [currentQuestion]: null,
    });
  };

  const handleNext = () => {
    if (validateQuestion(currentQuestion)) {
      setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
    } else {
      setValidationErrors({
        ...validationErrors,
        [currentQuestion]: "Please provide a valid answer to continue",
      });
    }
  };

  const handleSubmit = async () => {
    // Validate all questions
    const invalidQuestions = questions.reduce((acc, _, index) => {
      if (!validateQuestion(index)) {
        acc[index] = "This field is required";
      }
      return acc;
    }, {});

    if (Object.keys(invalidQuestions).length > 0) {
      setValidationErrors(invalidQuestions);
      setCurrentQuestion(Number(Object.keys(invalidQuestions)[0]));
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = prepareSubmissionData();
      await submitAssessment({
        uid: user?.uid,
        submissionData: submissionData,
      });
<<<<<<< HEAD
      toast.success("Assessment Submitted");
      // await new Promise((resolve) => setTimeout(resolve, 1500));
=======
      toast.success("Assessment submitted successfully!");
>>>>>>> 8c50874 (updated dashboard, assessment and roadmap)
      setShowCompletion(true);
    } catch (error) {
      setShowError(true);
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewRoadmap = () => {
    router.push("/dashboard/roadmap");
  };

  const renderScale = (question) => (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{question.labels[0]}</span>
        <span>{question.labels[1]}</span>
      </div>
      <div className="flex justify-between gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`w-full h-16 rounded-xl border-2 transition-all duration-200 ${
              answers[currentQuestion] === option
                ? "border-violet-600 bg-violet-50 text-violet-600"
                : "border-gray-200 hover:border-violet-200 hover:bg-violet-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderMultiple = (question) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => {
            if (question.isMultiSelect) {
              const currentAnswers = answers[currentQuestion] || [];
              const newAnswers = currentAnswers.includes(option)
                ? currentAnswers.filter((a) => a !== option)
                : [...currentAnswers, option];
              handleAnswer(newAnswers);
            } else {
              handleAnswer(option);
            }
          }}
          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 relative ${
            question.isMultiSelect
              ? answers[currentQuestion]?.includes(option)
                ? "border-violet-600 bg-violet-50 text-violet-600"
                : "border-gray-200 hover:border-violet-200 hover:bg-violet-50"
              : answers[currentQuestion] === option
              ? "border-violet-600 bg-violet-50 text-violet-600"
              : "border-gray-200 hover:border-violet-200 hover:bg-violet-50"
          }`}
        >
          {option}
          {question.isMultiSelect &&
            answers[currentQuestion]?.includes(option) && (
              <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-violet-600" />
            )}
        </button>
      ))}
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-4">
      <textarea
        value={answers[currentQuestion] || ""}
        onChange={(e) => handleAnswer(e.target.value)}
        placeholder={questions[currentQuestion].placeholder}
        className="w-full h-40 p-4 rounded-xl border-2 border-gray-200 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:outline-none transition-all resize-none"
      />
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">
          Minimum 10 characters required
        </span>
        <span className="text-sm text-gray-500">
          {(answers[currentQuestion] || "").length} characters
        </span>
      </div>
    </div>
  );

  const renderCompletionScreen = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-violet-100 rounded-full blur-2xl opacity-60 animate-pulse" />
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Flower className="w-12 h-12 text-white animate-bounce" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Assessment Complete! 🎉
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Great job completing your assessment! Your personalized career roadmap
          is now ready for you to explore.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleViewRoadmap}
            className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            View Your Career Roadmap
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Your responses have been saved
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          (async () => {
            try {
              const res = await getUserAssessment({ uid: user?.uid });
              // console.log("res:::", res);
              console.log('foramted text::',formatObjectToText(res));
            } catch (err) {
              toast.error(err?.message);
            }
          })()
        }
        className="bg-red-400 rounded-lg px-4 py-2 text-white"
      >
        Get Assessment{" "}
      </button>

      <div className="mt-6 bg-violet-50 rounded-xl p-6">
        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-violet-600" />
          What's Next?
        </h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
            Explore your personalized career roadmap
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
            Review recommended learning paths and resources
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
            Track your progress towards your career goals
          </li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    if (existingAssessment && !isEditing) {
      const hasRecommendations = Boolean(
        existingAssessment?.recommendations?.primaryCareerPaths?.length
      );

      return (
        <div className="space-y-6">
          <AssessmentNotification hasRecommendations={hasRecommendations} />
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Career Assessment
            </h1>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Update Assessment
            </button>
          </div>
          <ExistingAssessmentCard
            assessment={existingAssessment}
            onEdit={handleStartEdit}
            onView={handleView}
          />
          <div className="bg-violet-50 rounded-xl p-6">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-600" />
              Why Update Your Assessment?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
                Keep your career roadmap aligned with your evolving goals
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
                Get fresh recommendations based on your current interests
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
                Reflect on your progress and adjust your path accordingly
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (showCompletion) {
      return renderCompletionScreen();
    }

    const currentSection = getCurrentSection();

    // In your Assessment component
    if (existingAssessment && !isEditing) {
      return <AssessmentResult assessment={existingAssessment} />;
    }

    return (
      <div className="space-y-6">
        {isSubmitting && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
              <p className="text-gray-600">Processing your responses...</p>
            </div>
          </div>
        )}

        {showError && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md text-center space-y-4">
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="text-xl font-semibold">Something went wrong</h3>
              <p className="text-gray-600">
                Unable to submit your assessment. Please try again.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowError(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowError(false);
                    handleSubmit();
                  }}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Update Your Assessment" : "Career Assessment"} 📝
            </h1>
            <p className="text-gray-600">
              {isEditing
                ? "Update your responses to receive a fresh career roadmap."
                : "Complete the assessment to receive a personalized career roadmap."}
            </p>
          </div>
        </div>

        <SectionNav
          sections={sections}
          currentSection={currentSection}
          currentQuestion={currentQuestion}
          questions={questions}
          answers={answers}
        />

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {questions[currentQuestion].question}
          </h3>

          {validationErrors[currentQuestion] && (
            <div className="mb-4 flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {validationErrors[currentQuestion]}
            </div>
          )}

          {questions[currentQuestion].type === "text"
            ? renderTextInput()
            : questions[currentQuestion].type === "scale"
            ? renderScale(questions[currentQuestion])
            : renderMultiple(questions[currentQuestion])}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ${
                currentQuestion === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                {isEditing ? "Update Assessment" : "Submit Assessment"}
                <Star className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-violet-600 hover:bg-violet-50 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Section Tips */}
        <div className="mt-6 bg-violet-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-violet-600" />
            <h3 className="font-medium text-gray-900">
              Section Tips: {currentSection.title}
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            {currentSection.id === "education" && (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Be specific about your educational background and
                  qualifications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Include any relevant certifications or additional courses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Consider how your education aligns with your career goals
                </li>
              </>
            )}
            {currentSection.id === "skills" && (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Reflect honestly on your skill levels and competencies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Include both technical and soft skills in your assessment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Think about skills you're currently developing
                </li>
              </>
            )}
            {currentSection.id === "interests" && (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Consider both professional and personal interests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Think about what truly motivates and excites you
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Factor in long-term sustainability of your interests
                </li>
              </>
            )}
            {currentSection.id === "personal" && (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Consider your natural working style and preferences
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Think about feedback you've received from others
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Reflect on your strengths and areas for growth
                </li>
              </>
            )}
            {currentSection.id === "career" && (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Balance short-term and long-term career aspirations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Consider various paths that align with your goals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-violet-600" />
                  Think about practical steps to achieve your objectives
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default Assessment;
