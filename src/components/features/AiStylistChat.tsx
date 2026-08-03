import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';
import { Avatar } from '../ui';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiStylistChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello darling! I am your personal Fashionista AI Stylist. How can I help elevate your wardrobe today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickReplies = [
    'Suggest wedding outfits',
    'Suggest under $1000',
    'What goes with velvet?',
    'Summer runway trends',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isThinking, isOpen]);

  // Canned Keyword AI Response Logic
  const generateAiReply = (prompt: string): string => {
    const p = prompt.toLowerCase();

    if (p.includes('wedding') || p.includes('bride') || p.includes('groom')) {
      return 'For wedding celebrations, I recommend our Royal Velvet Sherwani or Silk Bridal Train with cathedral veils. Explore the Wedding Hub for custom packages!';
    }
    if (p.includes('under') || p.includes('budget') || p.includes('1000') || p.includes('5000')) {
      return 'Looking for chic luxury within budget? Explore our Satin Pleated Cocktail Dress ($980), Champagne Clutch ($620), or Mulberry Silk Scarf ($340).';
    }
    if (p.includes('velvet') || p.includes('fabric')) {
      return 'Royal Velvet pairs magnificently with Mulberry Silk scarves, crystal mesh clutches, and champagne gold heels. Try our Custom Studio fitting to test fabrics!';
    }
    if (p.includes('trend') || p.includes('summer') || p.includes('runway')) {
      return 'Paris Fashion Week 2026 highlights include sheer organza capes, high-slit satin dresses, and royal purple lapel blazers!';
    }

    return 'I would love to help you find your dream look! Are you styling for an evening gala, a royal wedding, or custom atelier fitting?';
  };

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputPrompt;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsThinking(true);

    // Simulate 1-second AI thinking delay
    setTimeout(() => {
      const aiReplyText = generateAiReply(userMsg.text);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-royal-purple to-purple-900 text-white shadow-2xl flex items-center justify-center border border-white/20 focus:outline-none"
        >
          {/* Pulsing Glow Ring */}
          <span className="absolute inset-0 rounded-full bg-royal-purple/50 animate-ping pointer-events-none opacity-75" />

          {isOpen ? (
            <X className="w-6 h-6 relative z-10" />
          ) : (
            <Sparkles className="w-6 h-6 text-champagne-gold relative z-10 animate-pulse" />
          )}

          {!isOpen && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-poppins font-semibold shadow-lg whitespace-nowrap hidden group-hover:block transition-all pointer-events-none border border-slate-800">
              Chat with AI Stylist ✨
            </span>
          )}
        </motion.button>
      </div>

      {/* Animated Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-36 md:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px] font-inter"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-royal-purple via-purple-900 to-slate-950 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar size="sm" name="AI Stylist" status="online" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-sm text-lavender flex items-center gap-1.5">
                    Fashionista AI Stylist
                    <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                  </h3>
                  <span className="text-[10px] text-slate-300 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active Now
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-soft-grey/30 dark:bg-slate-950/40">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs space-y-1 ${
                      msg.sender === 'user'
                        ? 'bg-royal-purple text-white rounded-br-none shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700/60 shadow-sm'
                    }`}
                  >
                    <p className="leading-relaxed font-inter">{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right font-mono ${
                        msg.sender === 'user' ? 'text-lavender/70' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* 3-Dot Bouncing Typing Indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700/60 flex items-center space-x-1.5 shadow-sm">
                    <span className="text-[10px] text-slate-400 font-poppins mr-1">AI Thinking</span>
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-royal-purple dark:bg-lavender"
                    />
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-champagne-gold"
                    />
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 rounded-full bg-rose-gold"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickReplies.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-lavender/40 dark:bg-slate-800 text-royal-purple dark:text-lavender text-[10px] font-poppins font-medium hover:bg-lavender transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask AI Stylist anything..."
                className="flex-1 px-3.5 py-2 bg-soft-grey dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-royal-purple/20"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isThinking}
                className="p-2.5 rounded-xl bg-royal-purple text-white hover:bg-royal-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiStylistChat;
