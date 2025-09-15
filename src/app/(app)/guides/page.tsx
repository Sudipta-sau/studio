
'use client';
import { useMemo, useState } from 'react';
import { AppContainer, AppHeader } from '@/components/layout/app-header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { guides, posts, chatRooms } from '@/lib/mock-data';
import { GuideList } from '@/components/guides/guide-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCard } from '@/components/feed/post-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    const filteredGuides = useMemo(() => {
        if (!searchTerm) return guides;
        return guides.filter(guide => 
            guide.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            guide.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const filteredPosts = useMemo(() => {
        if (!searchTerm) return [];
        return posts.filter(post => 
            post.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const filteredGroups = useMemo(() => {
        if (!searchTerm) return [];
        return chatRooms.filter(room =>
            room.type === 'group' && (
                room.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    const handleJoinGroup = (groupName: string) => {
        toast({
            title: "Group Joined!",
            description: `You have successfully joined the group: ${groupName}.`,
        });
    };
    
    const showResults = searchTerm.length > 0;

    return (
        <AppContainer>
            <AppHeader title="Search & Explore" />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search guides by name, location, posts, or groups..."
                        className="pl-10 text-base py-6"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {showResults ? (
                    <Tabs defaultValue="guides" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="guides">Guides ({filteredGuides.length})</TabsTrigger>
                            <TabsTrigger value="posts">Posts ({filteredPosts.length})</TabsTrigger>
                            <TabsTrigger value="groups">Groups ({filteredGroups.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="guides">
                           {filteredGuides.length > 0 ? <GuideList guides={filteredGuides} /> : <p className="text-muted-foreground text-center mt-4">No guides found.</p>}
                        </TabsContent>
                        <TabsContent value="posts">
                           <div className="space-y-4 mt-4">
                             {filteredPosts.length > 0 ? filteredPosts.map(post => <PostCard key={post.id} post={post}/>) : <p className="text-muted-foreground text-center">No posts found.</p>}
                           </div>
                        </TabsContent>
                        <TabsContent value="groups">
                             <Card className="mt-4">
                                <CardHeader>
                                    <CardTitle>Community Groups</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {filteredGroups.length > 0 ? filteredGroups.map(room => (
                                        <div key={room.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={room.avatarUrl} />
                                                    <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                  <Link href={`/chat`} className="font-medium hover:underline">{room.name}</Link>
                                                  <p className="text-sm text-muted-foreground">{room.location}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => handleJoinGroup(room.name)}>Join</Button>
                                        </div>
                                    )) : <p className="text-muted-foreground text-center">No groups found.</p>}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">Recommended Guides</h2>
                        <GuideList guides={guides} />
                    </>
                )}
            </main>
        </AppContainer>
    );
}
