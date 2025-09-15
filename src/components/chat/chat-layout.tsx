
'use client'

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatRooms as initialChatRooms, users } from '@/lib/mock-data';
import type { ChatRoom, ChatMessage as MessageType, User } from '@/lib/mock-data';
import { ChatMessage } from './chat-message';
import { Button } from '../ui/button';
import { MessageSquare, Plus, Search, Send, Smile, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function ContactList({ onSelectUser }: { onSelectUser: (user: User) => void }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(u => u.id !== 'u5' && u.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search by username..." 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1">
                {filteredUsers.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => onSelectUser(user)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-sidebar-accent"
                    >
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-medium truncate">{user.name}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function ChatLayout() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(initialChatRooms);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | User>(chatRooms[0]);
  const [message, setMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUser = users.find(u => u.id === 'u5'); // 'You'

  useEffect(() => {
    // scroll to bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if(viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [selectedChat]);


  const handleSelectUser = (user: User) => {
    const existingChat = chatRooms.find(cr => cr.type === 'direct' && (cr.name === user.name));
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      const newChat: User & { isNew?: boolean } = { ...user, isNew: true };
      setSelectedChat(newChat);
    }
  };
  
  const isChatRoom = (chat: any): chat is ChatRoom => 'messages' in chat && !chat.isNew;
  const isNewChat = (chat: any): chat is User & { isNew: true } => 'isNew' in chat && chat.isNew;

  const chatName = isNewChat(selectedChat) ? selectedChat.name : (isChatRoom(selectedChat) ? selectedChat.name : '');
  const chatAvatar = isNewChat(selectedChat) ? selectedChat.avatarUrl : (isChatRoom(selectedChat) ? selectedChat.avatarUrl : '');

  const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim() || !currentUser) return;

      const newMessage: MessageType = {
          id: `m${Date.now()}`,
          sender: currentUser,
          text: message,
          timestamp: 'Just now',
      };
      
      if (isChatRoom(selectedChat)) {
           const updatedChatRooms = chatRooms.map(cr => {
               if (cr.id === selectedChat.id) {
                   return { ...cr, messages: [...cr.messages, newMessage], lastMessage: newMessage.text };
               }
               return cr;
           });
           setChatRooms(updatedChatRooms);
           const updatedSelectedChat = updatedChatRooms.find(cr => cr.id === selectedChat.id);
           if (updatedSelectedChat) setSelectedChat(updatedSelectedChat);

      } else if (isNewChat(selectedChat)) {
          const newChatRoom: ChatRoom = {
              id: `cr${Date.now()}`,
              name: selectedChat.name,
              type: 'direct',
              avatarUrl: selectedChat.avatarUrl,
              unreadCount: 0,
              lastMessage: newMessage.text,
              lastMessageTime: 'Just now',
              messages: [newMessage],
          };
          setChatRooms([newChatRoom, ...chatRooms]);
          setSelectedChat(newChatRoom);
      }

      setMessage('');
  }

  return (
    <div className="grid flex-1 grid-cols-1 md:grid-cols-[300px_1fr] h-full">
      <aside className="hidden md:flex flex-col border-r">
        <div className="p-4 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search chats..." className="pl-9" />
            </div>
            <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                New Group
            </Button>
        </div>
        
        <Tabs defaultValue="chats" className="flex-1">
            <TabsList className="grid w-full grid-cols-2 p-0 h-auto rounded-none bg-transparent border-b">
                <TabsTrigger value="chats" className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <MessageSquare className="mr-2 h-4 w-4"/> All Chats
                </TabsTrigger>
                <TabsTrigger value="contacts" className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                    <Users className="mr-2 h-4 w-4"/> Contacts
                </TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1">
                 <TabsContent value="chats">
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
                            {isChatRoom(chat) && chat.unreadCount > 0 && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {chat.unreadCount}
                            </div>
                            )}
                        </button>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="contacts">
                   <ContactList onSelectUser={handleSelectUser} />
                </TabsContent>
            </ScrollArea>
        </Tabs>
      </aside>

      <div className="flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
          <Avatar>
            <AvatarImage src={chatAvatar} alt={chatName} />
            <AvatarFallback>{chatName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{chatName}</p>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
                {isChatRoom(selectedChat) ? selectedChat.messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                )) : (
                    <div className="text-center text-muted-foreground p-8">Start a conversation with {chatName}.</div>
                )}
            </div>
        </ScrollArea>

        <div className="p-4 border-t">
            <form className="relative" onSubmit={handleSendMessage}>
                <Input 
                    placeholder="Type a message..." 
                    className="pr-20"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                />
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
