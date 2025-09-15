import { ModerationClient } from '@/components/moderation/moderation-client';
import { AppContainer, AppHeader } from '@/components/layout/app-header';

export default function ModerationPage() {
    return (
        <AppContainer>
            <AppHeader title="AI Moderation Tool" />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <div className="mx-auto max-w-2xl space-y-8">
                    <ModerationClient />
                </div>
            </main>
        </AppContainer>
    );
}
