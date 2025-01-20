"use client"

import CircularLoader from '@/app/loading'
import React from 'react'
import { ScanFace } from 'lucide-react'

const Avatar = () => {
  return (
    <div className="space-y-6">
      {/* Header Start */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Talk To AI 🤖</h1>
          <p className="text-gray-600">
            Talk to AI to get a personalized career roadmap.
          </p>
        </div>
      </div>
      {/* Header End */}

      {/* Scan Face Icon and Coming Soon */}
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <ScanFace size={120} className="text-gray-400" />
        <p className="text-xl font-semibold text-gray-500">Coming Soon</p>
      </div>
    </div>
  );
}

export default Avatar;