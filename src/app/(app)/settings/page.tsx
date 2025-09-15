import { AppContainer, AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <AppContainer>
            <AppHeader title="Settings" />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <div className="mx-auto max-w-4xl space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Display</CardTitle>
                            <CardDescription>Customize the look and feel of the application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="theme">Theme</Label>
                                    <p className="text-sm text-muted-foreground">Select a color theme for the app.</p>
                                </div>
                                <Select defaultValue="dark">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dark">Cyber Dark</SelectItem>
                                        <SelectItem value="light">Neon Light</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator />
                             <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="font-size">Font Size</Label>
                                    <p className="text-sm text-muted-foreground">Adjust the font size for better readability.</p>
                                </div>
                                <Select defaultValue="medium">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                            <CardDescription>Update your public profile information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="roamfree_user" />
                                <p className="text-sm text-muted-foreground">
                                    Your unique username. Can be used to search for you.
                                </p>
                            </div>
                             <Separator />
                             <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Tell us a little about yourself" />
                            </div>
                            <div className="flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AppContainer>
    );
}
