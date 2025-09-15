import { ProfileClient } from '@/components/profile/profile-client';
import { AppContainer, AppHeader } from '@/components/layout/app-header';
import { users } from '@/lib/mock-data';

export default function ProfilePage() {
    const currentUser = users.find(u => u.id === 'u5'); // 'You'

    if (!currentUser) {
        return <div>User not found</div>
    }

    return (
        <AppContainer>
            <AppHeader title="My Profile" isProfilePage={true} />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <ProfileClient user={currentUser} isCurrentUser />
            </main>
        </AppContainer>
    );
}
