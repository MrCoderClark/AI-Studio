import { AuthScreen } from "@/components/auth-screen";
export default async function SignUp({ searchParams }: PageProps<"/sign-up">) { const { error } = await searchParams; return <AuthScreen mode="sign-up" error={Array.isArray(error) ? error[0] : error} />; }
