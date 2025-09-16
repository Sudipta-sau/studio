'use client';

import { PostCard } from './post-card';
import { posts as initialPosts } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useMemo } from 'react';
import type { Post } from '@/lib/mock-data';
import { CreatePost } from './create-post';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CommunityFeed() {
  const [sortType, setSortType] = useState<'popular' | 'recent' | 'following'>('popular');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { toast } = useToast();

  const sortedPosts = useMemo(() => {
    let newSortedPosts = [...posts];
    if (sortType === 'popular') {
      newSortedPosts.sort((a, b) => b.likes - a.likes);
    } else if (sortType === 'recent') {
      newSortedPosts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortType === 'following') {
        const followingIds = ['u1', 'u3'];
        newSortedPosts = posts.filter(p => followingIds.includes(p.author.id));
    }
    return newSortedPosts;
  }, [sortType, posts]);
  
  const handleRefresh = () => {
    // Simulate fetching new posts
    const newPost: Post = {
        id: `p${Date.now()}`,
        author: { id: 'u4', name: 'David Kim', avatarUrl: 'https://picsum.photos/seed/104/100/100', isVerified: true, isGuide: true },
        content: 'Just explored the beautiful tea gardens in Munnar. What a serene experience! Highly recommend a visit. #Kerala #IncredibleIndia',
        imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
        imageHint: 'tea gardens',
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        location: 'Munnar',
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    toast({
        title: "Feed Updated",
        description: "New posts have been loaded.",
    });
  }

  return (
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-6">
          <CreatePost />
           <div className="flex justify-between items-center">
            <Tabs defaultValue="popular" className="w-full max-w-sm" onValueChange={(value) => setSortType(value as 'popular' | 'recent' | 'following')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="popular" className="hover:text-accent-foreground focus:text-accent-foreground">Popular</TabsTrigger>
                <TabsTrigger value="recent" className="hover:text-accent-foreground focus:text-accent-foreground">Recent</TabsTrigger>
                <TabsTrigger value="following" className="hover:text-accent-foreground focus:text-accent-foreground">Following</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
            </Button>
          </div>
          {sortedPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-in fade-in-0 slide-in-from-top-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </main>
  );
}
