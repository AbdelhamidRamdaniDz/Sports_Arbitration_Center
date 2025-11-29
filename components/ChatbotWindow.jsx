"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, X, Sparkles } from "lucide-react";
import { getCustomChatbotResponse } from "@/app/actions/chat";

const INITIAL_BOT_MESSAGE = {
    text: "مرحباً بك. أنا المحكّم الآلي لمنصة **tahkeem-tech**، ومهمتي هي إرشادك حول إجراءات التحكيم التقني والنزاعات البرمجية. كيف يمكنني خدمتك اليوم؟",
    sender: 'bot',
    id: 1
};

const SUGGESTED_QUESTIONS = [
    "كيف أقدم قضية تحكيم تقني؟",
    "ما هي مدة إجراءات التحكيم؟",
    "كيف يتم اختيار المحكّم؟"
];

export function ChatbotWindow({ isOpen, onClose }) {
    const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (message = input) => {
        if (!message.trim() || isLoading) return;

        const userMessage = { text: message, sender: 'user', id: Date.now() };
        const conversationHistoryToSend = [...messages.filter(msg => msg.id !== 1), userMessage];

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setShowSuggestions(false);
        setIsLoading(true);

        const result = await getCustomChatbotResponse(conversationHistoryToSend);

        const botResponse = {
            text: result.response,
            sender: 'bot',
            id: Date.now() + 1
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
    };

    const handleSuggestionClick = (question) => {
        handleSend(question);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[1000] w-[400px] shadow-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col h-[650px]">
                
                {/* Header */}
                <div className="bg-emerald-600 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base">المحكّم الآلي</h3>
                            <p className="text-emerald-100 text-xs">tahkeem-tech</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                                    msg.sender === 'user'
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-700'
                                }`}
                            >
                                {msg.text.includes('**') ? (
                                    <div 
                                        className="[&>strong]:font-semibold"
                                        dangerouslySetInnerHTML={{ 
                                            __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                                        }} 
                                    />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Suggested Questions */}
                    {showSuggestions && messages.length === 1 && (
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium px-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>أسئلة مقترحة</span>
                            </div>
                            {SUGGESTED_QUESTIONS.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(question)}
                                    className="w-full text-right px-4 py-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-all hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">يكتب...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex gap-2">
                        <Input
                            placeholder="اكتب رسالتك..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            disabled={isLoading}
                            className="flex-1 h-11 rounded-xl border-gray-200 dark:border-gray-700 focus-visible:ring-emerald-500"
                        />
                        <Button
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim()}
                            className="h-11 w-11 p-0 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}