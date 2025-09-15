import { ProfileClient } from '@/components/profile/profile-client';
import { AppContainer, AppHeader } from '@/components/layout/app-header';
import { users } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default function UserProfilePage({ params }: { params: { userId: string } }) {
    const user = users.find(u => u.id === params.userId);

    if (!user) {
        notFound();
    }
    
    // Redirect to the main profile page if the user is viewing their own profile
    if (user.id === 'u5') {
        const { redirect } = require('next/navigation');
        redirect('/profile');
    }

    return (
        <AppContainer>
            <AppHeader title={`${user.name}'s Profile`} />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <ProfileClient user={user} />
            </main>
        </AppContainer>
    );
}
