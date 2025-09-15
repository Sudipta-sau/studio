import { CommunityFeed } from '@/components/feed/community-feed';
import { AppContainer } from '@/components/layout/app-header';

export default function HomePage() {
  return (
    <AppContainer>
      <CommunityFeed />
    </AppContainer>
  );
}
