'use client';

import { User, users } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Edit, ShieldCheck, Star, UserPlus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";

export function ProfileClient({ user, isCurrentUser }: { user: User, isCurrentUser?: boolean }) {
    const { toast } = useToast();
    const [requestSent, setRequestSent] = useState(false);

    const handleFriendRequest = () => {
        setRequestSent(true);
        toast({
            title: "Friend Request Sent",
            description: `Your friend request to ${user.name} has been sent.`,
        });
    };
    
    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-28 w-28 border-4 border-primary">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {isCurrentUser && (
                            <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card">
                                <Edit className="h-4 w-4"/>
                                <span className="sr-only">Edit avatar</span>
                            </Button>
                        )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-headline font-bold">{user.name}</h2>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                            {user.isVerified && <Badge variant="secondary" className="border-accent text-accent"><ShieldCheck className="h-4 w-4 mr-1"/>Verified</Badge>}
                            {user.isGuide && <Badge variant="secondary" className="border-primary text-primary"><Star className="h-4 w-4 mr-1"/>Guide</Badge>}
                        </div>
                        <p className="text-muted-foreground mt-4">Loves to explore new cultures and cuisines. Always on the lookout for the next adventure!</p>
                    </div>
                     {isCurrentUser ? (
                        <Button variant="outline" asChild>
                            <Link href="/settings">Edit Profile</Link>
                        </Button>
                    ) : (
                         <Button onClick={handleFriendRequest} disabled={requestSent}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            {requestSent ? 'Request Sent' : 'Add Friend'}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
