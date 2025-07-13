
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { useLanguage } from '../contexts/LanguageContext';
import { ChatbotIcon, CloseIcon, SendIcon } from './Icons';

type Message = {
    role: 'user' | 'model';
    parts: string;
};

const AiChatbot = () => {
    const { translations } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasInteracted = useRef(false);
    const [isAvailable, setIsAvailable] = useState(false);

    // Effect to show the proactive prompt on first load
    useEffect(() => {
        const alreadyInteracted = sessionStorage.getItem('chatbotInteracted');
        if (!alreadyInteracted) {
            const timer = setTimeout(() => {
                if (!hasInteracted.current) {
                    setShowPrompt(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        // Gracefully check for process.env.API_KEY, which won't exist in a plain browser environment.
        const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : undefined;

        if (!apiKey) {
            console.warn("API_KEY not found. Chatbot is disabled for local testing.");
            setIsAvailable(false);
            setMessages([{ role: 'model', parts: "Hi! I'm Chathurya. The chatbot is disabled during local testing as it requires a secure API key from the server." }]);
            return;
        }
        
        setIsAvailable(true);
        const ai = new GoogleGenAI({ apiKey });
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction: translations.chatbot.systemInstruction },
        });
        setChat(newChat);
        setMessages([{ role: 'model', parts: translations.chatbot.greeting }]);

    }, [translations.chatbot.systemInstruction, translations.chatbot.greeting]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);
    
    const handleInteraction = () => {
        if (!hasInteracted.current) {
            hasInteracted.current = true;
            sessionStorage.setItem('chatbotInteracted', 'true');
        }
        setShowPrompt(false);
    };

    const toggleChat = () => {
        handleInteraction();
        setIsOpen(prev => !prev);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat || !isAvailable) return;

        const userMessage: Message = { role: 'user', parts: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseStream = await chat.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', parts: '' }]);

            for await (const chunk of responseStream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].parts = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message to Gemini:', error);
            setMessages(prev => [...prev, { role: 'model', parts: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const assistantImageUrl = 'https://i.postimg.cc/t4G2VHmN/chatbot-avatar.png';

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[60]">
                {/* Proactive Prompt */}
                {showPrompt && !isOpen && (
                    <div className="absolute bottom-full right-0 mb-4 w-64 animate-fade-in-up">
                        <div className="bg-white text-gray-800 rounded-xl p-4 shadow-2xl relative">
                             <button 
                                onClick={() => setShowPrompt(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
                                aria-label="Close prompt"
                            >
                                <CloseIcon className="w-4 h-4" />
                            </button>
                            <div className="flex items-center">
                                <img src={assistantImageUrl} alt={translations.chatbot.name} className="w-10 h-10 rounded-full mr-3"/>
                                <div>
                                    <p className="font-semibold">{translations.chatbot.prompt.title}</p>
                                    <p className="text-sm text-gray-600">{translations.chatbot.prompt.subtitle}</p>
                                </div>
                            </div>
                            {/* Speech bubble pointer */}
                            <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white transform rotate-45"></div>
                        </div>
                    </div>
                )}

                {/* Main Chat Button */}
                <button
                    onClick={toggleChat}
                    className="bg-accent text-accent-text rounded-full p-4 shadow-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent"
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatbotIcon className="w-8 h-8" />}
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[calc(100vw-48px)] max-w-md h-[70vh] max-h-[600px] bg-surface shadow-2xl rounded-2xl flex flex-col z-50 border border-border-color overflow-hidden animate-fade-in-up">
                    <header className="bg-background p-4 border-b border-border-color flex items-center">
                         <img src={assistantImageUrl} alt={translations.chatbot.name} className="w-10 h-10 rounded-full mr-3"/>
                        <h3 className="text-xl font-bold text-on-background">{translations.chatbot.name}</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && <img src={assistantImageUrl} alt="assistant" className="w-6 h-6 rounded-full self-start" />}
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-white ${msg.role === 'user' ? 'bg-accent rounded-br-lg' : 'bg-gray-700 rounded-bl-lg'}`}
                                >
                                    <p className="text-base leading-relaxed whitespace-pre-wrap">{msg.parts}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start items-end gap-2">
                                <img src={assistantImageUrl} alt="assistant" className="w-6 h-6 rounded-full self-start" />
                                <div className="max-w-[80%] p-3 rounded-2xl bg-gray-700 rounded-bl-lg flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>

                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-border-color bg-background">
                        <div className="flex items-center bg-gray-800 rounded-full px-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={translations.chatbot.placeholder}
                                className="flex-1 bg-transparent p-3 text-on-background placeholder-on-surface focus:outline-none"
                                disabled={isLoading || !isAvailable}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) { handleSendMessage(e as any); }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || !isAvailable}
                                className="p-3 text-accent rounded-full hover:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                                aria-label="Send message"
                            >
                                <SendIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
            `}</style>
        </>
    );
};

export default AiChatbot;