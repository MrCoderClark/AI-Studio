import { NextResponse, type NextRequest } from "next/server";
import { createAuthActions } from "@insforge/sdk/ssr";
import { syncUser } from "@/lib/insforge/sync-user";
export async function POST(request: NextRequest) { const form = await request.formData(); const response = NextResponse.redirect(new URL("/", request.url), 303); const auth = createAuthActions({ requestCookies: request.cookies, responseCookies: response.cookies }); const { data, error } = await auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) }); if (error) return NextResponse.redirect(new URL("/sign-in?error=credentials", request.url), 303); await syncUser(data?.user, { signIn: true }); return response; }
