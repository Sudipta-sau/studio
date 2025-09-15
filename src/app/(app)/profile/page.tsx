import { ProfileClient } from '@/components/profile/profile-client';
import { AppContainer, AppHeader } from '@/components/layout/app-header';

export default function ProfilePage() {
    return (
        <AppContainer>
            <AppHeader title="My Profile" />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <ProfileClient />
            </main>
        </AppContainer>
    );
}
