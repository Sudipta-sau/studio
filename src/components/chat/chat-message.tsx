import { ChatMessage as MessageType, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CornerDownRight, Smile } from "lucide-react";
import { Card } from "../ui/card";

export function ChatMessage({ message }: { message: MessageType }) {
    const isCurrentUser = message.sender.id === users[4].id; // 'You' are user u5
    
    return (
        <div className={cn("group flex items-start gap-3", isCurrentUser && "flex-row-reverse")}>
            <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender.avatarUrl} />
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className={cn("max-w-xs md:max-w-md", isCurrentUser ? "items-end" : "items-start", "flex flex-col")}>
                <div className={cn(
                    "relative rounded-lg px-3 py-2 text-sm",
                    isCurrentUser ? "bg-primary text-primary-foreground" : "bg-card"
                )}>
                    {!isCurrentUser && <p className="font-semibold text-xs mb-1 text-primary">{message.sender.name}</p>}
                    
                    {message.replyTo && (
                        <Card className="mb-2 p-2 text-xs bg-black/10 border-white/20">
                            <p className="line-clamp-1 text-muted-foreground">Replying to a message</p>
                        </Card>
                    )}

                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.reactions && (
                        <div className="absolute -bottom-3 left-2 flex gap-1">
                            {Object.entries(message.reactions).map(([emoji, count]) => (
                                <div key={emoji} className="flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs">
                                    <span>{emoji}</span>
                                    <span className="ml-1 font-medium">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                     <div className={cn("absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity", isCurrentUser ? "-left-16" : "-right-16")}>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Smile className="h-4 w-4 text-muted-foreground" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><CornerDownRight className="h-4 w-4 text-muted-foreground" /></Button>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
            </div>
        </div>
    );
}
