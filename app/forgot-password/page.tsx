import { AuthScreen } from "@/components/auth-screen";
export default async function ForgotPassword({ searchParams }: PageProps<"/forgot-password">) { const { error } = await searchParams; return <AuthScreen mode="forgot-password" error={Array.isArray(error) ? error[0] : error} />; }
