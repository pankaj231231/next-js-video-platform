"use client";

import { Video } from "@imagekit/next";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

interface VideoData {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt?: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function VideoPage({ params }: PageProps) {
  const { id } = use(params);
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) {
          router.push("/");
          return;
        }
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this video? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      } else {
        alert("Failed to delete video. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("An error occurred while deleting the video.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!video) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="btn btn-ghost gap-2 mb-6 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl">
              <figure className="relative">
                <div
                  className="w-full relative bg-black rounded-t-2xl overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Video
                    src={video.videoUrl}
                    transformation={[
                      {
                        height: "1080",
                        width: "1920",
                      },
                    ]}
                    controls={true}
                    className="w-full h-full"
                  />
                </div>
              </figure>
            </div>
          </div>

          {/* Video Info */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-2xl sticky top-24">
              <div className="card-body">
                <h1 className="card-title text-2xl font-bold mb-2">{video.title}</h1>
                
                {video.createdAt && (
                  <div className="flex items-center gap-2 text-sm text-base-content/60 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(video.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}

                <div className="divider my-2"></div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Description
                  </h3>
                  <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="divider my-4"></div>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="btn btn-error btn-outline w-full gap-2 hover:btn-error transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  {deleting ? "Deleting..." : "Delete Video"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
