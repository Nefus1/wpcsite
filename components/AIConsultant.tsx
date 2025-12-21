import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ShieldAlert, Sparkles, FileText, Loader2, ArrowRight } from 'lucide-react';
import { streamChatResponse, summarizeChat } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIConsultantProps {
  onTransferToForm: (summary: string) => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ onTransferToForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to Western Pacific Counsel. I'm your AI intake assistant. How can we assist you with your legal matters today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: modelMsgId,
      role: 'model',
      text: '',
      isStreaming: true
    }]);

    let fullResponse = '';

    await streamChatResponse(
      messages.map(m => ({ role: m.role, text: m.text })),
      userMsg.text,
      (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullResponse } 
            : msg
        ));
      }
    );

    setMessages(prev => prev.map(msg => 
      msg.id === modelMsgId 
        ? { ...msg, isStreaming: false } 
        : msg
    ));
    setIsLoading(false);
  };

  const handleTransfer = async () => {
    if (messages.length <= 1 || isSummarizing) return;
    
    setIsSummarizing(true);
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const summary = await summarizeChat(history);
    
    onTransferToForm(summary);
    setIsOpen(false);
    setIsSummarizing(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-brand-gold hover:bg-yellow-500'
        }`}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6 text-brand-900 animate-pulse" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-brand-900 px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          AI Case Evaluator
        </span>
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[420px] h-[650px] max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right border border-brand-700 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none translate-y-10'
        } bg-brand-900`}
      >
        {/* Header */}
        <div className="bg-brand-800 p-5 flex items-center justify-between border-b border-brand-700">
          <div className="flex items-center gap-3">
            <div className="bg-brand-gold p-2.5 rounded-xl shadow-inner">
              <Bot className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg tracking-tight">WPC Legal Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">Active Intake</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-brand-700 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-brand-900/98 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div
                className={`max-w-[88%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-gold text-brand-900 font-semibold rounded-tr-none'
                    : 'bg-brand-800 text-slate-200 border border-brand-700 rounded-tl-none'
                }`}
              >
                {msg.text}
                {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-brand-gold animate-pulse"></span>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt for transfer when conversation exists */}
        {messages.length > 2 && !isLoading && !isSummarizing && (
          <div className="px-5 py-3 bg-brand-800/50 border-t border-brand-700/50 animate-fade-in-up">
             <button
              onClick={handleTransfer}
              className="w-full py-2.5 px-4 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-900 border border-brand-gold/30 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group"
            >
              Ready to consult an attorney?
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-5 bg-brand-800 border-t border-brand-700 relative">
          {isSummarizing && (
            <div className="absolute inset-0 z-20 bg-brand-800/90 flex flex-col items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-brand-gold animate-spin mb-2" />
              <p className="text-xs font-bold text-brand-gold uppercase tracking-widest">Preparing Report...</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-3 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your case..."
              className="flex-1 bg-brand-900 border border-brand-700 text-white text-sm rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 placeholder-slate-500 transition-all shadow-inner"
              disabled={isLoading || isSummarizing}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || isSummarizing}
              className="p-3.5 bg-brand-gold text-brand-900 rounded-xl hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 justify-center">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-gold" />
            <span className="font-medium tracking-tight">AI Intake only. No legal advice provided.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIConsultant;