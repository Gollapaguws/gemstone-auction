import { NextResponse } from "next/server";
import { generateSocialCaption } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { postType, productName, productDescription } = await request.json();

    if (!postType || !productName) {
      return NextResponse.json({ error: "Post type and product name are required" }, { status: 400 });
    }

    const caption = await generateSocialCaption(postType, productName, productDescription || "");
    return NextResponse.json({ caption });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate caption" }, { status: 500 });
  }
}
