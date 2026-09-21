import { createAdminClient } from "@insforge/sdk";

type SyncUserInput =
  | {
      id: string;
      email: string;
      emailVerified?: boolean;
      providers?: string[];
      createdAt?: string;
      profile?: { name?: string; avatar_url?: string } | null;
      metadata?: Record<string, unknown> | null;
    }
  | null
  | undefined;

let adminClient: ReturnType<typeof createAdminClient> | null = null;
function admin() {
  if (!adminClient) {
    adminClient = createAdminClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL,
      apiKey: process.env.INSFORGE_API_KEY as string,
    });
  }
  return adminClient;
}

/**
 * Upsert the authenticated user into public.users. Runs server-side with the
 * admin key (bypasses RLS). Pass `{ signIn: true }` from actual sign-in/sign-up
 * events so last_sign_in_at is refreshed; otherwise only last_seen_at moves.
 */
export async function syncUser(user: SyncUserInput, { signIn = false }: { signIn?: boolean } = {}) {
  if (!user?.id) return;
  const now = new Date().toISOString();
  const row: Record<string, unknown> = {
    id: user.id,
    email: user.email,
    name: user.profile?.name ?? null,
    avatar_url: user.profile?.avatar_url ?? null,
    providers: user.providers ?? [],
    email_verified: user.emailVerified ?? false,
    auth_created_at: user.createdAt ?? null,
    metadata: user.metadata ?? null,
    last_seen_at: now,
    updated_at: now,
  };
  if (signIn) row.last_sign_in_at = now;

  const { error } = await admin()
    .database.from("users")
    .upsert([row], { onConflict: "id" });
  if (error) console.error("[syncUser] failed to upsert user", error);
}
