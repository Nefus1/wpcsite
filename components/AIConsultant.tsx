import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ShieldAlert, Sparkles, FileText, Loader2 } from 'lucide-react';
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

    // Create placeholder for model response
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
    if (messages.length <= 1) return; // Don't transfer if only welcome message
    
    setIsSummarizing(true);
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const summary = await summarizeChat(history);
    
    onTransferToForm(summary);
    setIsOpen(false);
    setIsSummarizing(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-brand-gold hover:bg-yellow-500'
        }`}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6 text-brand-900 animate-pulse" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-brand-900 px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          AI Case Evaluator
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right border border-brand-700 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        } bg-brand-900`}
      >
        {/* Header */}
        <div className="bg-brand-800 p-4 flex items-center justify-between border-b border-brand-700">
          <div className="flex items-center gap-3">
            <div className="bg-brand-gold p-2 rounded-lg">
              <Bot className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-white">WPC Assistant</h3>
              <p className="text-xs text-brand-gold">AI Powered • 24/7 Intake</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <button
              onClick={handleTransfer}
              disabled={isSummarizing || messages.length <= 1}
              className="p-2 hover:bg-brand-700 rounded-full transition-colors text-slate-400 hover:text-brand-gold disabled:opacity-30 disabled:hover:text-slate-400"
              title="Transfer conversation to Contact Form"
            >
              {isSummarizing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-brand-700 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-900/95 backdrop-blur-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-gold text-brand-900 font-medium rounded-tr-none'
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

        {/* Disclaimer */}
        <div className="bg-brand-900 px-4 py-2 border-t border-brand-800">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
            <ShieldAlert className="w-3 h-3" />
            <span>Not legal advice. For intake purposes only.</span>
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-brand-800 border-t border-brand-700">
          <div className="flex gap-2 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your situation..."
              className="flex-1 bg-brand-900 border border-brand-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold placeholder-slate-500 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1.5 p-1.5 bg-brand-gold text-brand-900 rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIConsultant;