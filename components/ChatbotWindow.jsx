"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, X, Sparkles, Minimize2, Trash2, Copy, Check } from "lucide-react";
import { getCustomChatbotResponse } from "@/app/actions/chat";

const INITIAL_BOT_MESSAGE = {
    text: "مرحباً بك. أنا المحكّم الآلي لمنصة **tahkeem-tech**، ومهمتي هي إرشادك حول إجراءات التحكيم التقني والنزاعات البرمجية. كيف يمكنني خدمتك اليوم؟",
    sender: 'bot',
    id: 1,
    timestamp: new Date().toISOString()
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
    const [isMinimized, setIsMinimized] = useState(false);
    const [copiedMessageId, setCopiedMessageId] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // التركيز على حقل الإدخال عند الفتح
    useEffect(() => {
        if (isOpen && inputRef.current && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, isMinimized]);

    // التمرير التلقائي للرسائل الجديدة
    useEffect(() => {
        const scrollContainer = messagesEndRef.current?.parentElement;
        if (scrollContainer) {
            const isAtBottom = 
                scrollContainer.scrollHeight - scrollContainer.clientHeight 
                <= scrollContainer.scrollTop + 100;
            
            if (isAtBottom) {
                messagesEndRef.current?.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "end" 
                });
            }
        }
    }, [messages, isLoading]);

    // اختصار لوحة المفاتيح Ctrl+K للتركيز
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // إعادة تعيين المحادثة
    const handleReset = useCallback(() => {
        if (confirm("هل تريد بدء محادثة جديدة؟ سيتم مسح جميع الرسائل الحالية.")) {
            setMessages([{
                ...INITIAL_BOT_MESSAGE,
                timestamp: new Date().toISOString()
            }]);
            setShowSuggestions(true);
            setInput('');
        }
    }, []);

    // نسخ نص الرسالة
    const handleCopyMessage = useCallback(async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    }, []);

    // إرسال الرسالة
    const handleSend = useCallback(async (message = input) => {
        const trimmedMessage = message.trim();
        
        if (!trimmedMessage || isLoading || trimmedMessage.length > 1000) {
            if (trimmedMessage.length > 1000) {
                alert("الرسالة طويلة جداً. الحد الأقصى 1000 حرف.");
            }
            return;
        }

        const userMessage = { 
            text: trimmedMessage, 
            sender: 'user', 
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        
        // إرسال آخر 10 رسائل فقط لتجنب تجاوز حدود الـ tokens
        const recentMessages = messages.slice(-10);
        const conversationHistoryToSend = [...recentMessages.filter(msg => msg.id !== 1), userMessage];

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setShowSuggestions(false);
        setIsLoading(true);

        try {
            const result = await getCustomChatbotResponse(conversationHistoryToSend);
            
            const botResponse = {
                text: result.response,
                sender: 'bot',
                id: Date.now() + 1,
                timestamp: new Date().toISOString()
            };
            
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = {
                text: "عذراً، حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.",
                sender: 'bot',
                id: Date.now() + 1,
                isError: true,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, messages]);

    // النقر على سؤال مقترح
    const handleSuggestionClick = useCallback((question) => {
        handleSend(question);
    }, [handleSend]);

    if (!isOpen) return null;

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] lg:hidden transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Chatbot Window */}
            <div className={`
                fixed z-[1000] 
                transition-all duration-300 ease-in-out
                ${isMinimized ? 'lg:translate-y-0' : ''}
                
                inset-0 lg:inset-auto
                lg:bottom-6 lg:left-6 
                lg:w-[420px] 
                md:inset-4 md:w-auto
                lg:shadow-2xl
                ${isMinimized ? 'lg:h-auto' : 'lg:h-[85vh] lg:max-h-[700px]'}
            `}>
                <div className={`
                    bg-white dark:bg-gray-900 
                    rounded-none lg:rounded-2xl 
                    overflow-hidden 
                    border-0 lg:border lg:border-gray-200 dark:lg:border-gray-800 
                    flex flex-col 
                    h-full
                    shadow-xl lg:shadow-2xl
                    animate-in slide-in-from-bottom-4 duration-300
                `}>
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 sm:px-5 py-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base sm:text-lg">المحكّم الآلي</h3>
                                <p className="text-emerald-100 text-xs sm:text-sm">tahkeem-tech</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {/* Reset Chat */}
                            <button
                                onClick={handleReset}
                                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                                title="بدء محادثة جديدة"
                            >
                                <Trash2 className="w-4 h-4 text-white" />
                            </button>
                            
                            {/* Minimize */}
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="hidden lg:flex w-9 h-9 rounded-full hover:bg-white/10 items-center justify-center transition-colors"
                                title={isMinimized ? "تكبير" : "تصغير"}
                            >
                                <Minimize2 className="w-4 h-4 text-white" />
                            </button>
                            
                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95"
                                title="إغلاق"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    {!isMinimized && (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div className={`max-w-[85%] sm:max-w-[80%] relative group`}>
                                            <div
                                                className={`
                                                    px-3 sm:px-4 
                                                    py-2.5 sm:py-3 
                                                    rounded-2xl 
                                                    text-sm sm:text-[15px] 
                                                    leading-relaxed
                                                    break-words
                                                    ${msg.sender === 'user'
                                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                                        : msg.isError
                                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md border border-gray-100 dark:border-gray-700'
                                                    }
                                                `}
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
                                                
                                                {/* Message timestamp */}
                                                <div className={`text-xs mt-1.5 ${
                                                    msg.sender === 'user' 
                                                        ? 'text-emerald-100' 
                                                        : msg.isError
                                                        ? 'text-red-400'
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString('ar-SA', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    }) : ''}
                                                </div>
                                            </div>
                                            
                                            {/* Copy Button */}
                                            <button
                                                onClick={() => handleCopyMessage(msg.text, msg.id)}
                                                className={`
                                                    absolute top-1 ${msg.sender === 'user' ? 'left-1' : 'right-1'}
                                                    w-7 h-7 rounded-lg
                                                    flex items-center justify-center
                                                    opacity-0 group-hover:opacity-100
                                                    transition-all duration-200
                                                    ${msg.sender === 'user'
                                                        ? 'bg-white/20 hover:bg-white/30'
                                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                    }
                                                `}
                                                title="نسخ الرسالة"
                                            >
                                                {copiedMessageId === msg.id ? (
                                                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                                ) : (
                                                    <Copy className={`w-3 h-3 ${
                                                        msg.sender === 'user' 
                                                            ? 'text-white' 
                                                            : 'text-gray-600 dark:text-gray-300'
                                                    }`} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Suggested Questions */}
                                {showSuggestions && messages.length === 1 && (
                                    <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium px-1">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            <span>أسئلة مقترحة</span>
                                        </div>
                                        {SUGGESTED_QUESTIONS.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSuggestionClick(question)}
                                                className="
                                                    w-full text-right 
                                                    px-3 sm:px-4 
                                                    py-2.5 sm:py-3 
                                                    rounded-xl 
                                                    bg-white dark:bg-gray-800 
                                                    hover:bg-emerald-50 dark:hover:bg-gray-700 
                                                    active:scale-[0.98]
                                                    border border-gray-200 dark:border-gray-700 
                                                    text-xs sm:text-sm 
                                                    text-gray-700 dark:text-gray-300 
                                                    transition-all 
                                                    hover:border-emerald-300 dark:hover:border-emerald-700 
                                                    shadow-sm hover:shadow-md
                                                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20
                                                "
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Loading Indicator */}
                                {isLoading && (
                                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">جاري التفكير...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Character Counter */}
                                {input.length > 0 && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
                                        {input.length}/1000
                                    </div>
                                )}
                                
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 sm:p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0 safe-area-bottom">
                                <div className="flex gap-2">
                                    <Input
                                        ref={inputRef}
                                        placeholder="اكتب رسالتك... (اضغط Ctrl+K للتركيز)"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend();
                                            }
                                        }}
                                        disabled={isLoading}
                                        maxLength={1000}
                                        className="
                                            flex-1 
                                            h-11 sm:h-12 
                                            rounded-xl 
                                            border-gray-200 dark:border-gray-700 
                                            focus-visible:ring-emerald-500
                                            text-sm sm:text-base
                                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                                            resize-none
                                        "
                                    />
                                    <Button
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !input.trim()}
                                        className="
                                            h-11 sm:h-12 
                                            w-11 sm:w-12 
                                            p-0 
                                            rounded-xl 
                                            bg-emerald-600 
                                            hover:bg-emerald-700 
                                            disabled:opacity-50 disabled:cursor-not-allowed
                                            active:scale-95
                                            transition-transform
                                            focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                                        "
                                        title="إرسال الرسالة"
                                    >
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                    الذكاء الاصطناعي قد يقدم معلومات غير دقيقة. استشر متخصصاً للحالات الهامة.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}