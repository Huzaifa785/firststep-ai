"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { fetchUserRecommendations } from "@/utils/firebase/recommendations/write";
import Link from "next/link";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const userState = useSelector((state) => state.user);
  const user = isClient ? userState : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!isClient || !user?.uid) return;

      try {
        setIsLoading(true);
        const data = await fetchUserRecommendations({ uid: user.uid });
        console.log("😅", data);
        setRecommendations(data.recommendations);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [isClient, user?.uid]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 text-violet-600 animate-spin mx-auto" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const primaryCareer = recommendations?.primaryCareerPaths?.[0];

  const stats = [
    {
      title: "Career Match Score",
      value: primaryCareer?.matchScore ? `${primaryCareer.matchScore}%` : "N/A",
      change: primaryCareer?.reasonForMatch || "Based on your profile",
      icon: Target,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
    },
    {
      title: "Growth Rate",
      value: primaryCareer?.industryOutlook?.growthRate || "N/A",
      change: "Industry Outlook",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Work Hours",
      value:
        recommendations?.additionalInsights?.workLifeBalance
          ?.averageWorkHours || "N/A",
      change: "Weekly Average",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Market Demand",
      value: primaryCareer?.industryOutlook?.marketDemand || "N/A",
      change: "Current Status",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.displayName || "User"}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your career journey.
          </p>
        </div>
        <Link href="/dashboard/assessment">
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            Take Assessment
          </button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-600 text-sm">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Progression */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Career Progression
            </h2>
          </div>
          <div className="space-y-6">
            {Object.entries(
              recommendations?.additionalInsights?.careerProgression || {}
            ).map(([year, data], index) => (
              <div key={year} className="flex items-start gap-4">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Target className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{data.role}</p>
                  <p className="text-sm text-gray-600">{data.focus}</p>
                  <p className="text-sm text-violet-600 mt-1">
                    {data.expectedPackage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work-Life Balance */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Work-Life Balance
            </h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Remote Work</p>
                <p className="text-lg font-medium text-gray-900 mt-1">
                  {recommendations?.additionalInsights?.workLifeBalance
                    ?.remoteOpportunities || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Stress Level</p>
                <p className="text-lg font-medium text-gray-900 mt-1">
                  {recommendations?.additionalInsights?.workLifeBalance
                    ?.stressLevel || "N/A"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                Work-Life Balance Tips
              </h3>
              <div className="space-y-2">
                {recommendations?.additionalInsights?.workLifeBalance?.tips?.map(
                  (tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-violet-600 mt-1" />
                      <p className="text-gray-600">{tip}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
