
'use client';
import { Post } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ThumbsUp, MessageSquare, Verified, Star, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function PostCard({ post }: { post: Post }) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  const handleComment = () => {
    toast({
      title: "Feature coming soon!",
      description: "You'll be able to comment on posts in a future update.",
    });
  }

  return (
    <Card className="overflow-hidden shadow-lg shadow-black/20 bg-card transition-transform duration-300 hover:scale-[1.02] hover:shadow-accent/20 hover:shadow-2xl">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Link href={`/profile/${post.author.id}`} className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 grid gap-1">
          <div className="flex items-center gap-2">
            <Link href={`/profile/${post.author.id}`} className="font-semibold hover:underline">
              {post.author.name}
            </Link>
            {post.author.isVerified && (
              <Verified className="h-4 w-4 text-accent" title="Verified User" />
            )}
            {post.author.isGuide && (
                <Badge variant="secondary" className="flex items-center gap-1 border-none bg-primary/20 text-primary">
                    <Star className="h-3 w-3" /> Guide
                </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{timeAgo}</span>
              {post.location && (
                <>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{post.location}</span>
                  </div>
                </>
              )}
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={post.imageHint}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-accent" onClick={handleLike}>
            <ThumbsUp className={cn("h-4 w-4", hasLiked && "fill-current text-accent")} />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-accent" onClick={handleComment}>
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
