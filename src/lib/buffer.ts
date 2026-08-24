const BUFFER_API = "https://api.buffer.com/1";

interface PostParams {
  text: string;
  channelIds: string[];
  media?: { photo?: string; video?: string };
  scheduledAt?: Date;
  shorten?: boolean;
}

export async function getChannels() {
  const res = await fetch(`${BUFFER_API}/channels.json`, {
    headers: {
      Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
    },
  });
  return res.json();
}

export async function createPost(params: PostParams) {
  const body: Record<string, unknown> = {
    text: params.text,
    profile_ids: params.channelIds,
    shorten: params.shorten ?? true,
  };

  if (params.media) {
    if (params.media.photo) body.photo = params.media.photo;
    if (params.media.video) body.video = params.media.video;
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

  return res.json();
}

export async function getPendingPosts(channelId: string) {
  const res = await fetch(
    `${BUFFER_API}/profiles/${channelId}/updates/pending.json`,
    {
      headers: {
        Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
      },
    }
  );
  return res.json();
}
