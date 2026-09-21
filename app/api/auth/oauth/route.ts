import { NextResponse, type NextRequest } from "next/server";
import { createAuthActions } from "@insforge/sdk/ssr";
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const provider = String(form.get("provider"));
  if (provider !== "google" && provider !== "github")
    return NextResponse.redirect(new URL("/sign-in?error=oauth", request.url), 303);
  const response = NextResponse.redirect(
    new URL("/sign-in?error=oauth", request.url),
    303,
  );
  const auth = createAuthActions({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });
  const { data, error } = await auth.signInWithOAuth(provider, {
    redirectTo: new URL("/api/auth/callback", request.url).toString(),
    skipBrowserRedirect: true,
  });
  if (error || !data?.url || !data.codeVerifier) return response;
  const redirect = NextResponse.redirect(data.url, 303);
  redirect.cookies.set("insforge_code_verifier", data.codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return redirect;
}
