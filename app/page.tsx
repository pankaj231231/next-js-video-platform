"use client";

import React, { useEffect, useState } from "react";
import VideoComponent from "./components/VideoComponent";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { NotificationProvider } from "./components/Notification";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoComponent key={video._id?.toString()} video={video} />
        ))}
      </div>
      {videos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-base-content/70">No videos found.</p>
        </div>
      )}
    </main>
  );
}
