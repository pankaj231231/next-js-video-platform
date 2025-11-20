import { Video } from "@imagekit/next";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { Play } from "lucide-react";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group/video w-full block">
          <div
            className="rounded-xl overflow-hidden relative w-full border-2 border-transparent group-hover/video:border-primary transition-all duration-300"
            style={{ aspectRatio: "9/16" }}
          >
            <Video
              src={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-primary rounded-full p-4 transform scale-90 group-hover/video:scale-100 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary-content fill-current" />
              </div>
            </div>
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:text-primary transition-colors duration-200"
        >
          <h2 className="card-title text-lg font-bold">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
