import { Post } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ThumbsUp, MessageSquare, Verified, Star } from 'lucide-react';
import { Badge } from '../ui/badge';

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden shadow-lg shadow-black/20 bg-card">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{post.author.name}</p>
            {post.author.isVerified && (
              <Verified className="h-4 w-4 text-accent" title="Verified User" />
            )}
            {post.author.isGuide && (
                <Badge variant="secondary" className="flex items-center gap-1 border-none bg-primary/20 text-primary">
                    <Star className="h-3 w-3" /> Guide
                </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{post.createdAt}</p>
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
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-accent">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-accent">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
