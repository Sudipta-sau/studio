
'use client';

import { AppContainer, AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { users } from '@/lib/mock-data';
import { Check, UserPlus, X } from 'lucide-react';
import type { User } from '@/lib/mock-data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


const initialFriendRequests = [
    users.find(u => u.id === 'u3'),
];
const initialPendingRequests = [
    users.find(u => u.id === 'u1'),
];
const initialCurrentFriends = [
    users.find(u => u.id === 'u2'),
]

export default function FriendsPage() {
    const { toast } = useToast();
    const [friends, setFriends] = useState<(User | undefined)[]>(initialCurrentFriends);
    const [requests, setRequests] = useState<(User | undefined)[]>(initialFriendRequests);
    const [pending, setPending] = useState<(User | undefined)[]>(initialPendingRequests);

    const handleAcceptRequest = (userToAccept: User) => {
        setRequests(requests.filter(user => user?.id !== userToAccept.id));
        setFriends([...friends, userToAccept]);
        toast({
            title: "Friend Added",
            description: `You are now friends with ${userToAccept.name}.`,
        });
    };

    const handleDeclineRequest = (userToDecline: User) => {
        setRequests(requests.filter(user => user?.id !== userToDecline.id));
        toast({
            title: "Request Declined",
            description: `You have declined the friend request from ${userToDecline.name}.`,
            variant: "destructive"
        });
    };

    return (
        <AppContainer>
            <AppHeader title="Friends" />
            <main className="flex-1 p-4 md:p-6">
                <Tabs defaultValue="friends">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
                        <TabsTrigger value="requests">Requests ({requests.length})</TabsTrigger>
                        <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="friends">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Friends</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {friends.length > 0 ? friends.map(user => user && (
                                    <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                        <Button variant="outline" size="sm">Message</Button>
                                    </div>
                                )) : <p className="text-muted-foreground text-center p-4">You have no friends yet.</p>}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="requests">
                         <Card>
                            <CardHeader>
                                <CardTitle>Friend Requests</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {requests.length > 0 ? requests.map(user => user && (
                                    <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="outline" className="text-green-500 hover:text-green-500" onClick={() => handleAcceptRequest(user)}>
                                                <Check className="h-4 w-4"/>
                                            </Button>
                                            <Button size="icon" variant="outline" className="text-red-500 hover:text-red-500" onClick={() => handleDeclineRequest(user)}>
                                                <X className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                )) : <p className="text-muted-foreground text-center p-4">No new friend requests.</p>}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="pending">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Requests</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {pending.length > 0 ? pending.map(user => user && (
                                    <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                        <Button variant="outline" size="sm" disabled>Request Sent</Button>
                                    </div>
                                )) : <p className="text-muted-foreground text-center p-4">No pending requests.</p>}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </AppContainer>
    );
}
