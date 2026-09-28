import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Sparkles,
  Send,
  X,
  Volume2,
  Lock,
} from 'lucide-react';
import { Avatar, Badge, useToast } from '../ui';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabaseClient';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: {
    id: string;
    designer_name: string;
    designer_avatar?: string | null;
    scheduled_at: string;
    notes?: string | null;
  } | null;
  onCallEnded?: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  consultation,
  onCallEnded,
}) => {
  const { toast } = useToast();
  const { user } = useAuthStore();

  // Call States
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(0);

  // In-Call Chat Messages
  const [chatMessages, setChatMessages] = useState<
    { id: string; sender: string; text: string; time: string; isSelf: boolean }[]
  >([
    {
      id: '1',
      sender: consultation?.designer_name || 'Designer',
      text: 'Bonjour! Welcome to your live 3D fitting session. I have your measurement details ready.',
      time: 'Just now',
      isSelf: false,
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Call Timer Counter
  useEffect(() => {
    if (!isOpen) {
      setCallDurationSeconds(0);
      return;
    }

    const timer = setInterval(() => {
      setCallDurationSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !consultation) return null;

  // Format Timer output (MM:SS)
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle Sending In-Call Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: user?.name || 'You',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulate Designer automated reply in call mockup
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: consultation.designer_name,
          text: `Got it! I am adjusting the ${
            chatInput.toLowerCase().includes('fabric') ? 'silk sample' : '3D blueprint'
          } accordingly.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: false,
        },
      ]);
    }, 1200);
  };

  // Handle Ending Call & Updating Supabase Status
  const handleEndCall = async () => {
    try {
      if (consultation.id) {
        await supabase
          .from('consultations')
          .update({ status: 'completed' })
          .eq('id', consultation.id);
      }

      toast({
        title: 'Consultation Ended',
        description: `Your live session with ${consultation.designer_name} has concluded.`,
        variant: 'info',
      });

      if (onCallEnded) onCallEnded();
    } catch (err) {
      console.error('Error ending consultation:', err);
    } finally {
      onClose();
    }
  };

  const designerAvatar =
    consultation.designer_avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between overflow-hidden select-none font-inter text-slate-100"
      >
        {/* Top Floating Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-sm sm:text-base text-white flex items-center gap-2">
                {consultation.designer_name}
                <Badge variant="gold" size="sm" dot>Live 1-on-1</Badge>
              </h2>
              <p className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>HD 1080p • 256-bit Encrypted</span>
              </p>
            </div>
          </div>

          {/* Timer & Screen indicators */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 font-mono font-bold text-xs text-rose-gold flex items-center gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {formatTimer(callDurationSeconds)}
            </div>

            <button
              onClick={handleEndCall}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
              title="Close Room"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Stage: Remote Designer Video View Placeholder */}
        <div className="relative flex-1 w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Subtle Ambient Background Gradient Animation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-slate-950 to-slate-950" />
          <div className="absolute w-[600px] h-[600px] bg-royal-purple/10 rounded-full blur-3xl animate-pulse" />

          {/* Designer Central Avatar Video Frame */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center"
          >
            <div className="relative">
              {/* Outer Voice Audio Ripples */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-royal-purple to-rose-gold opacity-40 blur-md"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -inset-8 rounded-full bg-amber-500/20 blur-xl"
              />

              {/* Main Avatar Container */}
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full ring-4 ring-royal-purple/40 overflow-hidden shadow-2xl shadow-royal-purple/40 bg-slate-900">
                <img
                  src={designerAvatar}
                  alt={consultation.designer_name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Audio Speaking Wave Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-700 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span>Speaking</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-poppins font-extrabold text-xl sm:text-2xl text-white tracking-wide">
                {consultation.designer_name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {consultation.notes || 'Haute Couture Consultation & 3D Fitting'}
              </p>
            </div>
          </motion.div>

          {/* PIP Self-View Thumbnail (Bottom Right / Corner) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            className="absolute bottom-24 right-4 sm:bottom-28 sm:right-8 z-20 w-32 h-44 sm:w-40 sm:h-52 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-md flex flex-col items-center justify-center"
          >
            {isVideoOff ? (
              <div className="flex flex-col items-center space-y-2 text-slate-500">
                <VideoOff className="w-8 h-8" />
                <span className="text-[10px] font-bold">Camera Off</span>
              </div>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
                <Avatar
                  name={user?.name || 'You'}
                  src={user?.avatar_url}
                  size="lg"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded-full text-white backdrop-blur-sm">
                  You (Client)
                </span>
                {isMuted && (
                  <span className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full text-white">
                    <MicOff className="w-3 h-3" />
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Slide-in In-Call Chat Side Drawer */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 z-30 w-full sm:w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 flex flex-col justify-between p-4 shadow-2xl"
              >
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="font-poppins font-bold text-sm text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-royal-purple" />
                    Consultation Chat
                  </h4>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto py-3 space-y-3 font-inter text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.isSelf ? 'items-end' : 'items-start'
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 font-mono mb-0.5">
                        {msg.sender} • {msg.time}
                      </span>
                      <div
                        className={`p-2.5 rounded-2xl max-w-[85%] ${
                          msg.isSelf
                            ? 'bg-royal-purple text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-royal-purple font-inter"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-royal-purple hover:bg-purple-700 rounded-xl text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Floating Control Dock */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-2xl flex items-center gap-4 sm:gap-6">
          {/* Mute Mic Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-all duration-200 ${
              isMuted
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>

          {/* Camera Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-full transition-all duration-200 ${
              isVideoOff
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
          </motion.button>

          {/* Chat Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-3 rounded-full relative transition-all duration-200 ${
              isChatOpen
                ? 'bg-royal-purple text-white border border-lavender/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Toggle In-Call Chat"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2" />
          </motion.button>

          {/* End Call Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEndCall}
            className="p-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/40 hover:brightness-110 transition-all"
            title="End Consultation"
          >
            <PhoneOff className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
