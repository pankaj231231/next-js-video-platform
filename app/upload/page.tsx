"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import { Upload } from "lucide-react";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Upload New Video
            </h1>
            <p className="text-base-content/70">
              Share your creativity with the world
            </p>
          </div>
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
              <VideoUploadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}