import { AuthScreen } from "@/components/auth-screen";
export default async function SignIn({ searchParams }: PageProps<"/sign-in">) { const { error } = await searchParams; return <AuthScreen mode="sign-in" error={Array.isArray(error) ? error[0] : error} />; }
