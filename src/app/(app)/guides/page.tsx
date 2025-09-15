import { GuideList } from '@/components/guides/guide-list';
import { AppContainer, AppHeader } from '@/components/layout/app-header';

export default function GuidesPage() {
    return (
        <AppContainer>
            <AppHeader title="Find a Guide" />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <GuideList />
            </main>
        </AppContainer>
    );
}
