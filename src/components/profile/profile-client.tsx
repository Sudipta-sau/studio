'use client';

import { users } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Edit, ShieldCheck, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ProfileClient() {
    const user = users[4]; // 'You'

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-28 w-28 border-4 border-primary">
                            <AvatarImage src={"https://picsum.photos/seed/user99/200/200"} alt={user.name} />
                            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card">
                            <Edit className="h-4 w-4"/>
                            <span className="sr-only">Edit avatar</span>
                        </Button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-headline font-bold">{user.name}</h2>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                            {user.isVerified && <Badge variant="secondary" className="border-accent text-accent"><ShieldCheck className="h-4 w-4 mr-1"/>Verified</Badge>}
                            {user.isGuide && <Badge variant="secondary" className="border-primary text-primary"><Star className="h-4 w-4 mr-1"/>Guide</Badge>}
                        </div>
                        <p className="text-muted-foreground mt-4">Loves to explore new cultures and cuisines. Always on the lookout for the next adventure!</p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your account privacy and notification settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="show-location" className="font-semibold">Show my location to groups</Label>
                            <p className="text-sm text-muted-foreground">Allow groups to see your approximate location.</p>
                        </div>
                        <Switch id="show-location" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                         <div>
                            <Label htmlFor="read-receipts" className="font-semibold">Send read receipts</Label>
                            <p className="text-sm text-muted-foreground">Let others know when you've read their messages.</p>
                        </div>
                        <Switch id="read-receipts" defaultChecked />
                    </div>
                     <Separator />
                    <div className="flex items-center justify-between">
                         <div>
                            <Label htmlFor="friend-requests" className="font-semibold">Allow friend requests</Label>
                            <p className="text-sm text-muted-foreground">Allow other users to send you connection requests.</p>
                        </div>
                        <Switch id="friend-requests" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
