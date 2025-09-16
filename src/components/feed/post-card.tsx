
'use client';
import { Post } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ThumbsUp, MessageSquare, Verified, Star, MapPin, ThumbsDown, MoreVertical, Flag, Link as LinkIcon, Share2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function PostCard({ post }: { post: Post }) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    }
    setHasLiked(!hasLiked);
  };

  const handleDislike = () => {
    if (hasDisliked) {
        setDislikes(dislikes -1);
    } else {
        setDislikes(dislikes + 1);
        if (hasLiked) {
            setLikes(likes - 1);
            setHasLiked(false);
        }
    }
    setHasDisliked(!hasDisliked);
  };

  const handleComment = () => {
    toast({
      title: "Feature coming soon!",
      description: "You'll be able to comment on posts in a future update.",
    });
  }

  const handleReport = () => {
    toast({
      title: "Post Reported",
      description: "Thank you for your feedback. We will review this post.",
    });
  }

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'copy') => {
    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/post/${post.id}` : '';
    const shareText = `Check out this post from ${post.author.name}: ${post.content}`;
    let shareUrl = '';

    switch (platform) {
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${postUrl}`)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(postUrl);
            toast({ title: "Link Copied!", description: "Post link copied to your clipboard." });
            return;
    }
    window.open(shareUrl, '_blank');
  };

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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleReport} className="hover:text-accent-foreground focus:text-accent-foreground">
                    <Flag className="mr-2 h-4 w-4" /> Report
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </DropdownMenuSubTrigger>
                     <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => handleShare('copy')}>
                           <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleShare('whatsapp')}>Share on WhatsApp</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('facebook')}>Share on Facebook</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('twitter')}>Share on Twitter</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
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
           <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-red-500" onClick={handleDislike}>
            <ThumbsDown className={cn("h-4 w-4", hasDisliked && "fill-current text-red-500")} />
            <span>{dislikes}</span>
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
