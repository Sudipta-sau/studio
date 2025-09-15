'use client';

import { AppHeader } from '@/components/layout/app-header';
import { PostCard } from './post-card';
import { posts } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useMemo } from 'react';
import type { Post } from '@/lib/mock-data';

export function CommunityFeed() {
  const [sortType, setSortType] = useState<'popular' | 'recent'>('popular');

  const sortedPosts = useMemo(() => {
    let newSortedPosts = [...posts];
    if (sortType === 'popular') {
      newSortedPosts.sort((a, b) => b.likes - a.likes);
    } else {
      // For 'recent', we'll just use the original order for this mock
      newSortedPosts = [...posts];
    }
    return newSortedPosts;
  }, [sortType]);
  
  return (
    <>
      <AppHeader title="Community Feed">
        <Tabs defaultValue="popular" className="w-[200px]" onValueChange={(value) => setSortType(value as 'popular' | 'recent')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
        </Tabs>
      </AppHeader>
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-6">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
