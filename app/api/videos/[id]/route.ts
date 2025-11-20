import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import VideoModel from "@/models/Video";
import mongoose from "mongoose";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json({ error: "Invalid video ID" }, { status: 400 });
        }

        const video = await VideoModel.findById(id);

        if (!video) {
            return Response.json({ error: "Video not found" }, { status: 404 });
        }

        return Response.json({
            _id: video._id.toString(),
            title: video.title,
            description: video.description,
            videoUrl: video.videoUrl,
            thumbnailUrl: video.thumbnailUrl,
            createdAt: video.createdAt ? video.createdAt.toISOString() : undefined,
        });
    } catch (error) {
        console.error("Error fetching video:", error);
        return Response.json(
            { error: "Failed to fetch video" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json({ error: "Invalid video ID" }, { status: 400 });
        }

        const deletedVideo = await VideoModel.findByIdAndDelete(id);

        if (!deletedVideo) {
            return Response.json({ error: "Video not found" }, { status: 404 });
        }

        return Response.json({
            message: "Video deleted successfully",
            deletedVideo: {
                _id: deletedVideo._id.toString(),
                title: deletedVideo.title
            }
        });
    } catch (error) {
        console.error("Error deleting video:", error);
        return Response.json(
            { error: "Failed to delete video" },
            { status: 500 }
        );
    }
}
