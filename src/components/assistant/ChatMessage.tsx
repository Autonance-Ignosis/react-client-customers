import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/pages/AIAssistant';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.type === 'user';

    return (
        <div className={cn(
            "flex w-full",
            isUser ? "justify-end" : "justify-start"
        )}>
            <div
                className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                )}
            >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <div className={cn(
                    "mt-1 text-[10px] opacity-70 text-right",
                    isUser ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </div>
    );
}
