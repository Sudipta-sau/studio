
import { ChatMessage as MessageType, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CornerDownRight, Smile } from "lucide-react";
import { Card } from "../ui/card";

type ChatMessageProps = {
    message: MessageType;
    onReact: (emoji: string) => void;
    onReply: () => void;
}

export function ChatMessage({ message, onReact, onReply }: ChatMessageProps) {
    const isCurrentUser = message.sender.id === users.find(u => u.name === 'You')?.id;
    
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
                            <p className="line-clamp-1 text-muted-foreground">Replying to: "{message.replyTo}"</p>
                        </Card>
                    )}

                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.reactions && (
                        <div className="absolute -bottom-4 left-2 flex gap-1">
                            {Object.entries(message.reactions).map(([emoji, count]) => (
                                <div key={emoji} className="flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs shadow-md">
                                    <span>{emoji}</span>
                                    <span className="ml-1 font-medium text-secondary-foreground">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                     <div className={cn("absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity", isCurrentUser ? "-left-20" : "-right-20")}>
                        <div className="flex items-center gap-1 bg-card p-1 rounded-full border shadow-md">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReact('👍')}>
                                <span className="text-base">👍</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReact('❤️')}>
                                 <span className="text-base">❤️</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onReply}><CornerDownRight className="h-4 w-4 text-muted-foreground" /></Button>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
            </div>
        </div>
    );
}

    