import { CommunityFeed } from '@/components/feed/community-feed';
import { AppContainer, AppHeader } from '@/components/layout/app-header';

export default function HomePage() {
  return (
    <AppContainer>
      <AppHeader title="Community Feed" />
      <CommunityFeed />
    </AppContainer>
  );
}
