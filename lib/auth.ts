export function appUrl() { return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"; }
export function safeNext(value: FormDataEntryValue | null) { return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/"; }
