'use client'

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatRooms, users } from '@/lib/mock-data';
import type { ChatRoom, ChatMessage as MessageType } from '@/lib/mock-data';
import { ChatMessage } from './chat-message';
import { Button } from '../ui/button';
import { Search, Send, Smile } from 'lucide-react';

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<ChatRoom>(chatRooms[0]);

  return (
    <div className="grid flex-1 grid-cols-1 md:grid-cols-[300px_1fr] h-[calc(100%-4rem)]">
      <aside className="hidden md:flex flex-col border-r">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-9" />
          </div>
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-1 p-2">
            {chatRooms.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-sidebar-accent',
                  selectedChat.id === chat.id && 'bg-sidebar-accent'
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={chat.avatarUrl} alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium truncate">{chat.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {chat.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <div className="flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
          <Avatar>
            <AvatarImage src={selectedChat.avatarUrl} alt={selectedChat.name} />
            <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{selectedChat.name}</p>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
                {selectedChat.messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
            </div>
        </ScrollArea>

        <div className="p-4 border-t">
            <form className="relative">
                <Input placeholder="Type a message..." className="pr-20" />
                <Button variant="ghost" size="icon" className="absolute right-11 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground">
                    <Smile className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
}
