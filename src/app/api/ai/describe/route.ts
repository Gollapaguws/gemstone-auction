import { NextResponse } from "next/server";
import { generateProductDescription } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { name, type, origin, specs } = await request.json();

    if (!name || !type) {
      return NextResponse.json({ error: "Name and type are required" }, { status: 400 });
    }

    const description = await generateProductDescription(name, type, origin || "", specs || "");
    return NextResponse.json({ description });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate description" }, { status: 500 });
  }
}
