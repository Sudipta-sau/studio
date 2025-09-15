import { AppContainer, AppHeader } from "@/components/layout/app-header";
import { VerificationClient } from "@/components/verification/verification-client";

export default function VerificationPage() {
    return (
        <AppContainer>
            <AppHeader title="Get Verified" />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <div className="mx-auto max-w-4xl space-y-8">
                    <VerificationClient />
                </div>
            </main>
        </AppContainer>
    );
}
