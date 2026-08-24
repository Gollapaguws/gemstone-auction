const BUFFER_API = "https://api.buffer.com/1";

interface PublishParams {
  text: string;
  channelIds: string[];
  imageUrl?: string;
  scheduledAt?: Date;
}

export async function publishToSocial(params: PublishParams) {
  const body: Record<string, unknown> = {
    text: params.text,
    profile_ids: params.channelIds,
    shorten: true,
  };

  if (params.imageUrl) {
    body.photo = params.imageUrl;
  }

  if (params.scheduledAt) {
    body.scheduled_at = Math.floor(params.scheduledAt.getTime() / 1000);
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
    throw new Error(error.message || "Failed to publish to Buffer");
  }

  return res.json();
}

export async function getBufferChannels() {
  const res = await fetch(`${BUFFER_API}/channels.json`, {
    headers: {
      Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Buffer channels");
  }

  return res.json();
}
