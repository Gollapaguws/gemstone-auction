const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

const optionalEnvVars = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "YOCO_SECRET_KEY",
  "YOCO_PUBLIC_KEY",
  "OPENAI_API_KEY",
  "BUFFER_API_KEY",
  "RESEND_API_KEY",
  "NEXT_PUBLIC_SITE_URL",
] as const;

export function validateEnv() {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`);
    return false;
  }

  return true;
}

export function getEnvStatus() {
  const status: Record<string, boolean> = {};

  for (const envVar of [...requiredEnvVars, ...optionalEnvVars]) {
    status[envVar] = !!process.env[envVar];
  }

  return status;
}
