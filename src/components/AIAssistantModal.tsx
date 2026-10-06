import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  HelpCircle,
  Headphones,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Search,
  CheckCircle2,
  ShieldCheck,
  Award,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { PRESET_FAQS, SUPPORT_INFO, ChatbotFAQ } from '../data/chatbotFaq';
import { audioEngine } from '../utils/audioEngine';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  showSupportAction?: boolean;
}

export type AIRole = 'concierge' | 'research' | 'standards';
export type ViewTab = 'chat' | 'faqs' | 'support';

interface AIAssistantModalProps {
  onOpenRegisterModal: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ onOpenRegisterModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('chat');
  const [role, setRole] = useState<AIRole>('concierge');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Greetings! I am **INNOVA-AI**, the official Intelligence Concierge for **IEEE InnovateX 2026**.\n\nAsk me anything about registration, keynote sessions, schedule, or technical tracks. You can also explore pre-set FAQs or contact our Helpdesk directly!',
      timestamp: 'Online',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    audioEngine.playClick();

    // Check if the query closely matches our pre-configured dataset first for instant response
    const matchedFaq = PRESET_FAQS.find(
      (f) =>
        text.toLowerCase().includes(f.question.toLowerCase().replace('?', '')) ||
        (text.toLowerCase().includes('free') && f.id === 'faq-1') ||
        (text.toLowerCase().includes('speaker') && f.id === 'faq-2') ||
        (text.toLowerCase().includes('certificate') && f.id === 'faq-3') ||
        (text.toLowerCase().includes('schedule') && f.id === 'faq-4') ||
        (text.toLowerCase().includes('society') && f.id === 'faq-5')
    );

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    // If query asks for human support / contact help
    const isAskingForSupport =
      text.toLowerCase().includes('support') ||
      text.toLowerCase().includes('contact') ||
      text.toLowerCase().includes('human') ||
      text.toLowerCase().includes('helpdesk') ||
      text.toLowerCase().includes('customer');

    if (isAskingForSupport) {
      setTimeout(() => {
        const supportReply: ChatMessage = {
          id: `support-${Date.now()}`,
          role: 'assistant',
          content: `Here are the official contact credentials for the **IEEE InnovateX 2026 Delegate Helpdesk**:\n\n• **Email**: \`${SUPPORT_INFO.email}\`\n• **Desk**: ${SUPPORT_INFO.deskLocation}\n• **Hours**: ${SUPPORT_INFO.hours}\n• **Response Guarantee**: ${SUPPORT_INFO.responseGuarantee}\n\nYou can also click the **🎧 Support Desk** tab to submit an inquiry or email the secretariat directly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showSupportAction: true,
        };
        setMessages((prev) => [...prev, supportReply]);
        setIsLoading(false);
        audioEngine.playChime(750, 0.15, 'sine');
      }, 400);
      return;
    }

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || (matchedFaq ? matchedFaq.fullAnswer : 'No response generated from the neural nexus.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showSupportAction: data.reply?.toLowerCase().includes('support@'),
      };

      setMessages((prev) => [...prev, botReply]);
      audioEngine.playChime(750, 0.15, 'sine');
    } catch {
      // Graceful fallback with instant pre-configured FAQ or Support Desk contact
      const fallbackContent = matchedFaq
        ? `${matchedFaq.fullAnswer}\n\n*(Verified Knowledge Base)*`
        : `⚠️ I was unable to resolve this query through the automated neural nexus.\n\nFor immediate human assistance, please reach out directly to our **Delegate Support Helpdesk** at **${SUPPORT_INFO.email}** or switch to the **🎧 Support Desk** tab.`;

      const errorReply: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: fallbackContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showSupportAction: true,
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFaq = (faq: ChatbotFAQ) => {
    setActiveTab('chat');
    handleSendMessage(faq.question);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_INFO.email);
    setCopiedEmail(true);
    audioEngine.playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleClearHistory = () => {
    audioEngine.playClick();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          'Memory buffer cleared. How can I assist your IEEE InnovateX 2026 exploration?',
        timestamp: 'Online',
      },
    ]);
  };

  const filteredFaqs = PRESET_FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.shortAnswer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <>
      {/* 1. Floating AI Beacon Orb Button with Vivid Prismatic Sheen (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsOpen(true);
            }}
            className="group relative flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white rounded-full shadow-2xl shadow-purple-500/50 border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Open INNOVA-AI Assistant"
          >
            {/* Pulsing neon halo */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-50 blur-md group-hover:opacity-80 animate-pulse pointer-events-none" />

            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950/80 border border-pink-400/60 text-pink-300">
              <Sparkles className="w-4 h-4 animate-spin [animation-duration:6s]" />
            </div>

            <div className="relative flex flex-col items-start text-left font-mono">
              <span className="text-[10px] text-pink-200 tracking-widest uppercase font-bold leading-none">
                AI ORACLE & HELPDESK
              </span>
              <span className="text-xs font-extrabold text-white tracking-wide leading-tight">
                Ask INNOVA-AI
              </span>
            </div>

            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
          </button>
        </div>
      )}

      {/* 2. Chat Drawer / Modal Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 transition-all duration-300 flex flex-col ${
            isExpanded
              ? 'w-[95vw] sm:w-[620px] h-[90vh] max-h-[820px]'
              : 'w-[95vw] sm:w-[440px] h-[590px] max-h-[88vh]'
          }`}
        >
          <div className="flex flex-col h-full bg-[#070D1E]/95 border border-purple-500/50 rounded-3xl shadow-2xl shadow-purple-950/80 backdrop-blur-xl overflow-hidden font-sans">
            
            {/* Top Bar Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-purple-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">
                      INNOVA-AI
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-pink-500/40 text-[9px] font-mono text-pink-300 font-bold">
                      GEMINI 3.8
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    IEEE Symposium Intelligence & Helpdesk
                  </span>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                {activeTab === 'chat' && (
                  <button
                    onClick={handleClearHistory}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Clear Chat History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
                  title={isExpanded ? 'Minimize Size' : 'Expand Size'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Chat / FAQs / Support Desk) with Distinct Colors */}
            <div className="px-3 py-2 bg-slate-950/90 border-b border-purple-500/20 flex items-center justify-between gap-1.5 text-xs font-mono">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setActiveTab('chat');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl transition-all ${
                  activeTab === 'chat'
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-400/60 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-purple-300 hover:bg-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Chat</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  setActiveTab('faqs');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl transition-all ${
                  activeTab === 'faqs'
                    ? 'bg-pink-500/25 text-pink-300 border border-pink-400/60 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-pink-300 hover:bg-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                <span>Instant FAQs</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  setActiveTab('support');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl transition-all ${
                  activeTab === 'support'
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/60 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span>Support Desk</span>
              </button>
            </div>

            {/* TAB 1: AI CHAT INTERFACE */}
            {activeTab === 'chat' && (
              <>
                {/* Persona Role Switcher with Colorful Badges */}
                <div className="px-4 py-1.5 bg-slate-950/70 border-b border-purple-500/20 flex items-center justify-between gap-1 text-[11px] font-mono">
                  <span className="text-slate-500 text-[10px] hidden sm:inline">PERSONA:</span>
                  <button
                    onClick={() => setRole('concierge')}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-all ${
                      role === 'concierge'
                        ? 'bg-purple-500/25 text-purple-300 border border-purple-400/60 font-bold'
                        : 'text-slate-400 hover:text-purple-300'
                    }`}
                  >
                    🛰️ Concierge
                  </button>
                  <button
                    onClick={() => setRole('research')}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-all ${
                      role === 'research'
                        ? 'bg-pink-500/25 text-pink-300 border border-pink-400/60 font-bold'
                        : 'text-slate-400 hover:text-pink-300'
                    }`}
                  >
                    ⚡ Research
                  </button>
                  <button
                    onClick={() => setRole('standards')}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-all ${
                      role === 'standards'
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-400/60 font-bold'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    📜 Standards
                  </button>
                </div>

                {/* Scrollable Conversation Thread */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
                  {messages.map((msg) => {
                    const isBot = msg.role === 'assistant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        {isBot && (
                          <div className="w-6 h-6 rounded-lg bg-purple-950 border border-pink-500/40 text-pink-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                            isBot
                              ? 'bg-slate-900/90 border border-slate-800 text-slate-200'
                              : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium shadow-md shadow-purple-950/60'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{msg.content}</div>

                          {/* Fallback / Support Escalate Action Button */}
                          {msg.showSupportAction && (
                            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => {
                                  audioEngine.playClick();
                                  setActiveTab('support');
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 hover:bg-emerald-900/80 text-emerald-300 text-[11px] font-mono font-bold rounded-lg transition-colors"
                              >
                                <Headphones className="w-3 h-3" />
                                <span>Open Support Desk</span>
                              </button>

                              <a
                                href={`mailto:${SUPPORT_INFO.email}?subject=IEEE%20InnovateX%202026%20Delegate%20Inquiry`}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-mono rounded-lg transition-colors border border-slate-700"
                              >
                                <Mail className="w-3 h-3" />
                                <span>Email Support</span>
                              </a>
                            </div>
                          )}

                          <div
                            className={`text-[9px] font-mono mt-1.5 ${
                              isBot ? 'text-slate-500' : 'text-pink-200'
                            }`}
                          >
                            {msg.timestamp}
                          </div>
                        </div>

                        {!isBot && (
                          <div className="w-6 h-6 rounded-lg bg-fuchsia-950 border border-pink-500/40 text-pink-300 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing loader */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-pink-400 font-mono text-xs p-2">
                      <Bot className="w-4 h-4 animate-bounce" />
                      <span>Synthesizing intelligence from IEEE mainframe...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Pre-configured Questions Chips Bar */}
                <div className="px-3.5 py-2 bg-slate-950/90 border-t border-purple-500/20 overflow-x-auto flex gap-1.5 scrollbar-none items-center">
                  <span className="text-[10px] font-mono text-pink-400 font-bold shrink-0">FAQS:</span>
                  {PRESET_FAQS.slice(0, 4).map((faq, idx) => (
                    <button
                      key={faq.id}
                      onClick={() => handleSendMessage(faq.question)}
                      className={`px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg text-[11px] font-mono whitespace-nowrap border transition-colors shrink-0 ${
                        idx % 2 === 0
                          ? 'text-pink-300 border-pink-500/30 hover:border-pink-400'
                          : 'text-cyan-300 border-cyan-500/30 hover:border-cyan-400'
                      }`}
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>

                {/* Message Input Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-slate-950 border-t border-purple-500/20 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about schedule, fee, speakers, or type 'support'..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-white rounded-xl transition-all shadow-md shadow-purple-950"
                    title="Send Query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {/* TAB 2: INSTANT FAQS KNOWLEDGE BASE */}
            {activeTab === 'faqs' && (
              <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder="Search pre-configured questions & answers..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>

                {/* FAQ List */}
                <div className="space-y-2.5 flex-1">
                  {filteredFaqs.map((faq, idx) => {
                    const isExpanded = activeFaqId === faq.id;
                    const categoryColor =
                      faq.category === 'Registration'
                        ? 'text-pink-400'
                        : faq.category === 'Keynotes'
                        ? 'text-purple-400'
                        : faq.category === 'Certificates'
                        ? 'text-emerald-400'
                        : faq.category === 'Schedule'
                        ? 'text-amber-400'
                        : 'text-cyan-400';

                    return (
                      <div
                        key={faq.id}
                        className="bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 rounded-2xl p-3.5 transition-all shadow-md"
                      >
                        <button
                          onClick={() => {
                            audioEngine.playClick();
                            setActiveFaqId(isExpanded ? null : faq.id);
                          }}
                          className="w-full flex items-start justify-between text-left gap-2 focus:outline-none"
                        >
                          <div>
                            <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold block mb-0.5 ${categoryColor}`}>
                              {faq.category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                              {faq.question}
                            </h4>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform shrink-0 mt-1 ${
                              isExpanded ? 'rotate-90 text-pink-400' : ''
                            }`}
                          />
                        </button>

                        {isExpanded ? (
                          <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2 animate-in fade-in duration-150">
                            <p className="whitespace-pre-wrap">{faq.fullAnswer}</p>
                            <div className="pt-2 flex justify-end">
                              <button
                                onClick={() => handleSelectFaq(faq)}
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-pink-400 hover:text-pink-300 font-bold"
                              >
                                <span>Discuss in Chat</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 mt-1.5 truncate">
                            {faq.shortAnswer}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {filteredFaqs.length === 0 && (
                    <div className="text-center py-8 space-y-2">
                      <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-400">No matching pre-set questions found.</p>
                      <button
                        onClick={() => {
                          audioEngine.playClick();
                          setActiveTab('support');
                        }}
                        className="text-xs text-pink-400 underline font-mono"
                      >
                        Contact Customer Support instead
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Assistance Banner */}
                <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-pink-400 shrink-0" />
                    <span className="text-slate-300">Didn't find what you need?</span>
                  </div>
                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      setActiveTab('support');
                    }}
                    className="px-2.5 py-1 bg-purple-900/60 hover:bg-purple-800/60 text-pink-300 font-mono text-[11px] font-bold rounded-lg border border-pink-500/40"
                  >
                    Support Desk
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOMER SUPPORT & HELPDESK */}
            {activeTab === 'support' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs">
                
                {/* Header Badge */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DELEGATE ACCREDITATION & HELPDESK</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono mt-1">
                    Customer Support Desk
                  </h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">
                    If AI was unable to understand your question or if you need manual assistance, our team is standing by.
                  </p>
                </div>

                {/* Official Contact Details Cards */}
                <div className="space-y-3">
                  
                  {/* Primary Email (Pink Accent) */}
                  <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-pink-950 text-pink-400 rounded-xl border border-pink-500/30">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Official Helpdesk Email
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white font-mono">
                          {SUPPORT_INFO.email}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                      title="Copy Email Address"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Secretariat Desk Info (Purple Accent) */}
                  <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-md">
                    <div className="p-2.5 bg-purple-950 text-purple-400 rounded-xl border border-purple-500/30">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Physical Helpdesk Location
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {SUPPORT_INFO.deskLocation}
                      </span>
                    </div>
                  </div>

                  {/* Working Hours (Emerald Accent) */}
                  <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-md">
                    <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-500/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Support Operating Hours
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {SUPPORT_INFO.hours}
                      </span>
                      <span className="text-[10px] text-emerald-400 block font-mono">
                        Avg Response: {SUPPORT_INFO.responseGuarantee}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Direct Action Buttons with Vibrant Multi-Color Gradients */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={`mailto:${SUPPORT_INFO.email}?subject=IEEE%20InnovateX%202026%20Support%20Request&body=Hi%20IEEE%20InnovateX%20Support%20Team,%0D%0A%0D%0AMy%20query%20is:%20`}
                    className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-bold font-mono text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 transition-all uppercase tracking-wider border border-white/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Query via Email App</span>
                  </a>

                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      onOpenRegisterModal();
                    }}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-slate-200 hover:text-white font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-pink-400" />
                    <span>Open Registration Portal</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Support ticket escalation ID: #INX-SUP-2026
                </p>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
