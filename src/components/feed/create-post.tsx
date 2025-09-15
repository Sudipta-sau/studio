
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { users } from "@/lib/mock-data";
import { Button } from "../ui/button";
import { Image as ImageIcon, Video, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function CreatePost() {
    const currentUser = users.find(u => u.id === 'u5');
    if (!currentUser) return null;

    return (
        <Card className="shadow-lg shadow-black/20 bg-card/80">
            <CardHeader className="p-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Textarea 
                        placeholder="What's on your mind?" 
                        className="flex-1 bg-background/50 border-none text-base focus:ring-0 focus-visible:ring-0"
                        rows={2}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                        <ImageIcon className="mr-2 h-5 w-5" /> Photo
                    </Button>
                     <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                        <Video className="mr-2 h-5 w-5" /> Video
                    </Button>
                </div>
                <Button>
                    <Send className="mr-2 h-4 w-4" /> Post
                </Button>
            </CardContent>
        </Card>
    );
}
