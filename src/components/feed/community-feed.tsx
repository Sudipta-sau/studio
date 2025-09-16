'use client';

import { PostCard } from './post-card';
import { posts } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useMemo } from 'react';
import type { Post } from '@/lib/mock-data';
import { CreatePost } from './create-post';

export function CommunityFeed() {
  const [sortType, setSortType] = useState<'popular' | 'recent' | 'following'>('popular');

  const sortedPosts = useMemo(() => {
    let newSortedPosts = [...posts];
    if (sortType === 'popular') {
      newSortedPosts.sort((a, b) => b.likes - a.likes);
    } else if (sortType === 'recent') {
      // For 'recent', we'll just use the original order for this mock
      newSortedPosts = [...posts].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortType === 'following') {
        // Mock following logic, e.g., you follow users 'u1' and 'u3'
        const followingIds = ['u1', 'u3'];
        newSortedPosts = posts.filter(p => followingIds.includes(p.author.id));
    }
    return newSortedPosts;
  }, [sortType]);
  
  return (
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-6">
          <CreatePost />
           <div className="flex justify-center">
            <Tabs defaultValue="popular" className="w-full max-w-sm" onValueChange={(value) => setSortType(value as 'popular' | 'recent' | 'following')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="popular" className="hover:text-accent-foreground focus:text-accent-foreground">Popular</TabsTrigger>
                <TabsTrigger value="recent" className="hover:text-accent-foreground focus:text-accent-foreground">Recent</TabsTrigger>
                <TabsTrigger value="following" className="hover:text-accent-foreground focus:text-accent-foreground">Following</TabsTrigger>
              </TabsList>
            </Tabs>
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
