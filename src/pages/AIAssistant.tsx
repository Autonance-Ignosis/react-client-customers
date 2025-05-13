import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, X, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ChatMessage } from '@/components/assistant/ChatMessage';

// Define message types
export type MessageType = 'user' | 'assistant' | 'system';

export interface Message {
    id: string;
    content: string;
    type: MessageType;
    timestamp: Date;
}

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: message,
            type: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/chatbot/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.response || 'Sorry, I did not understand that.',
                type: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error: any) {
            toast.error("Failed to get response from assistant");
            console.error("API error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };




    const toggleAssistant = () => {
        setIsOpen(!isOpen);
    };




    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <Card className="w-80 md:w-96 shadow-lg border border-border">
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-muted/50">
                        <h3 className="font-medium text-sm">AI Assistant</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleAssistant}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="p-3 h-80 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))}
                            {isLoading && (
                                <div className="flex items-center justify-center py-2">
                                    <div className="animate-pulse flex space-x-1">
                                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </CardContent>

                    <CardFooter className="p-3 border-t">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !message.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>

                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    onClick={toggleAssistant}
                    className="rounded-full h-12 w-12 shadow-lg"
                >
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-pulse"
                    >
                        <path d="M12 3a5 5 0 0 0-5 5v9a5 5 0 0 0 10 0V8a5 5 0 0 0-5-5z"></path>
                        <path d="M3 11.5v1a9 9 0 0 0 18 0v-1"></path>
                    </svg> */}
                    <MessageCircle />
                </Button>
            )}
        </div>
    );
}
