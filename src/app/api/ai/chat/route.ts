import { NextResponse } from "next/server";
import { chatWithBot } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const reply = await chatWithBot(message, "");
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process message" }, { status: 500 });
  }
}
