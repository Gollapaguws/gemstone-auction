import { NextRequest, NextResponse } from "next/server";

const BUFFER_API = "https://api.buffer.com/1";

interface PostBody {
  text: string;
  channelIds: string[];
  media?: { photo?: string; video?: string };
  scheduledAt?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { text, channelIds, media, scheduledAt }: PostBody = await request.json();

    const body: Record<string, unknown> = {
      text,
      profile_ids: channelIds,
      shorten: true,
    };

    if (media) {
      if (media.photo) body.photo = media.photo;
      if (media.video) body.video = media.video;
    }

    if (scheduledAt) {
      body.scheduled_at = Math.floor(new Date(scheduledAt).getTime() / 1000);
    }

    const res = await fetch(`${BUFFER_API}/updates/create.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { error: error.message || "Failed to create post" },
        { status: res.status }
      );
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Social post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const res = await fetch(`${BUFFER_API}/channels.json`, {
      headers: {
        Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
      },
    });

    const channels = await res.json();
    return NextResponse.json(channels);
  } catch (error) {
    console.error("Buffer channels error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
