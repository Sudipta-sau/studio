import { ChatLayout } from '@/components/chat/chat-layout';
import { AppContainer } from '@/components/layout/app-header';
import { AppHeader } from '@/components/layout/app-header';

export default function ChatPage() {
  return (
    <AppContainer>
        <div className="flex h-full flex-col">
            <AppHeader title="Chats" />
            <ChatLayout />
        </div>
    </AppContainer>
  );
}
