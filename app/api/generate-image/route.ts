import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // TODO: Replace with actual AI service call (e.g., OpenAI)
    // For now, we'll mock it by fetching a random image from Unsplash based on the prompt
    // In a real scenario:
    // const aiResponse = await openai.images.generate({ prompt, ... });
    // const imageUrl = aiResponse.data[0].url;

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    // Upload to ImageKit
    // We can upload via URL
    const uploadResponse = await imagekit.upload({
      file: imageUrl,
      fileName: `generated-${Date.now()}.jpg`,
      folder: "/generated",
    });

    return NextResponse.json({ success: true, url: uploadResponse.url, details: uploadResponse });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
