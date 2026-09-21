import { NextResponse, type NextRequest } from "next/server";
import { createInsForgeServerClient } from "@/lib/insforge/server";
export async function POST(request: NextRequest) { const form = await request.formData(); const client = await createInsForgeServerClient(); await client.auth.sendResetPasswordEmail({ email: String(form.get("email")), redirectTo: new URL("/reset-password", request.url).toString() }); return NextResponse.redirect(new URL("/forgot-password?sent=1", request.url), 303); }
