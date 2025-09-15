import { AppContainer, AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { users } from '@/lib/mock-data';
import { Check, UserPlus, X } from 'lucide-react';

const friendRequests = [
    users.find(u => u.id === 'u3'),
];
const pendingRequests = [
    users.find(u => u.id === 'u1'),
];
const currentFriends = [
    users.find(u => u.id === 'u2'),
]

export default function FriendsPage() {
    return (
        <AppContainer>
            <AppHeader title="Friends" />
            <main className="flex-1 p-4 md:p-6">
                <Tabs defaultValue="friends">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="friends">Friends ({currentFriends.length})</TabsTrigger>
                        <TabsTrigger value="requests">Requests ({friendRequests.length})</TabsTrigger>
                        <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="friends">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Friends</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {currentFriends.map(user => user && (
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
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="requests">
                         <Card>
                            <CardHeader>
                                <CardTitle>Friend Requests</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {friendRequests.map(user => user && (
                                    <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="outline" className="text-green-500 hover:text-green-500"><Check className="h-4 w-4"/></Button>
                                            <Button size="icon" variant="outline" className="text-red-500 hover:text-red-500"><X className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="pending">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Requests</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {pendingRequests.map(user => user && (
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
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </AppContainer>
    );
}
