import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#111b21] p-4">
            {/* WhatsApp Logo Styling */}
            <div className="mb-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#00a884] rounded-full flex items-center justify-center shadow-lg mb-4">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-1.557-.594-2.666-1.574-.845-.741-1.426-1.627-1.594-1.956-.168-.33-.018-.51.148-.671.15-.145.33-.384.496-.57.164-.183.22-.309.329-.517.11-.206.054-.385-.028-.563-.081-.178-.733-1.748-.992-2.388-.252-.624-.515-.533-.733-.533-.205-.005-.434-.006-.662-.006-.23 0-.586.085-.894.417-.307.332-1.174 1.144-1.174 2.782 0 1.638 1.196 3.22 1.358 3.442.162.222 2.355 3.597 5.706 5.044.798.345 1.419.55 1.908.706.804.256 1.535.219 2.112.135.642-.093 1.966-.803 2.243-1.579.277-.776.277-1.442.193-1.579-.083-.137-.305-.221-.643-.389z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-light text-[#41525d] dark:text-[#e9edef]">WhatsApp Web</h1>
            </div>

            <div className="w-full max-w-[400px] bg-white dark:bg-[#202c33] p-8 rounded-lg shadow-md">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-[#00a884] hover:bg-[#008f71] text-sm normal-case",
                            card: "shadow-none p-0 bg-transparent dark:text-white",
                            headerTitle: "dark:text-white",
                            headerSubtitle: "dark:text-zinc-400",
                            socialButtonsBlockButton: "dark:bg-zinc-800 dark:border-zinc-700 dark:text-white",
                            formFieldLabel: "dark:text-zinc-300",
                            footerActionText: "dark:text-zinc-400",
                            footerActionLink: "text-[#00a884] hover:text-[#008f71]"
                        }
                    }}
                />
            </div>

            <p className="mt-6 text-sm text-[#667781] dark:text-[#8696a0]">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-[#00a884] font-medium hover:underline">
                    Sign in here
                </Link>
            </p>
        </div>
    );
}
