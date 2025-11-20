"use client";

import React, { useEffect, useState } from "react";
import VideoComponent from "./components/VideoComponent";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { Film, Sparkles } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Video Platform
            </h1>
            <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover amazing videos from creators around the world
          </p>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
                <div className="px-4 pt-4">
                  <div className="bg-base-300 rounded-xl" style={{ aspectRatio: "9/16", height: "300px" }}></div>
                </div>
                <div className="card-body p-4 space-y-2">
                  <div className="h-6 bg-base-300 rounded w-3/4"></div>
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoComponent key={video._id?.toString()} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-base-300 mb-6">
              <Film className="w-12 h-12 text-base-content/50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No videos yet</h3>
            <p className="text-base-content/70 mb-6">Be the first to upload a video!</p>
            <a href="/upload" className="btn btn-primary btn-lg gap-2">
              <Sparkles className="w-5 h-5" />
              Upload Video
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
