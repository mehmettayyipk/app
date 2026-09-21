import React, { useState } from 'react';
import {
  Search,
  ArrowLeft,
  Send,
  Camera,
  MapPin,
  Mic,
  Play,
  Plus,
  Check,
  CheckCheck,
  Radio,
} from 'lucide-react';
import { ChatThread, ChatMessage, ScreenId } from '../types';
import { INITIAL_CHAT_THREADS, SAMPLE_CHAT_MESSAGES } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

interface Screen12ChatProps {
  onNavigate: (screen: ScreenId) => void;
  activeThreadId?: string | null;
}

export const Screen12Chat: React.FC<Screen12ChatProps> = ({
  onNavigate,
  activeThreadId: initialActiveThreadId,
}) => {
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeTab, setActiveTab] = useState<'direct' | 'group' | 'regional'>('direct');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(
    initialActiveThreadId
      ? threads.find((t) => t.id === initialActiveThreadId) || threads[0]
      : null
  );

  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');

  const filteredThreads = threads.filter((t) => {
    const matchesTab = t.type === activeTab;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'me',
      type: 'text',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const handleSendVoice = () => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'me',
      type: 'audio',
      audioDuration: '0:07',
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // If inside an active conversation
  if (selectedThread) {
    return (
      <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
        {/* Chat Conversation Header */}
        <header className="px-4 py-3 bg-white/90 dark:bg-[#151720]/90 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSelectedThread(null)}
              className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="relative">
              <img
                src={selectedThread.avatar}
                alt={selectedThread.title}
                className="w-8 h-8 rounded-full object-cover"
              />
              {selectedThread.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#151720]" />
              )}
            </div>

            <div>
              <h3 className="font-bold text-xs text-neutral-950 dark:text-white leading-tight">
                {selectedThread.title}
              </h3>
              <p className="text-[10px] text-neutral-400">
                {selectedThread.isOnline ? 'Çevrimiçi' : selectedThread.subtitle}
              </p>
            </div>
          </div>

          {selectedThread.type === 'regional' && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <Radio className="w-3 h-3" />
              <span>Telsiz Açık</span>
            </span>
          )}
        </header>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => {
            const isMe = m.sender === 'me';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[78%] p-3 rounded-2xl text-xs ${
                    isMe
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded-br-xs'
                      : 'bg-white dark:bg-[#181a24] text-neutral-900 dark:text-white ring-1 ring-black/[0.04] dark:ring-white/[0.06] rounded-bl-xs'
                  }`}
                >
                  {/* Text Message */}
                  {m.type === 'text' && <p className="leading-relaxed">{m.text}</p>}

                  {/* Audio Message */}
                  {m.type === 'audio' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSendVoice}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          isMe
                            ? 'bg-white/20 text-white dark:bg-black/10 dark:text-neutral-900'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                      <div className="flex items-center gap-1">
                        <div className="w-24 h-4 flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-current rounded-full" />
                          <span className="w-1 h-4 bg-current rounded-full" />
                          <span className="w-1 h-2 bg-current rounded-full" />
                          <span className="w-1 h-5 bg-current rounded-full" />
                          <span className="w-1 h-3 bg-current rounded-full" />
                          <span className="w-1 h-2 bg-current rounded-full" />
                        </div>
                        <span className="text-[10px] opacity-75 font-mono">{m.audioDuration}</span>
                      </div>
                    </div>
                  )}

                  {/* Location Message */}
                  {m.type === 'location' && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{m.locationInfo?.title}</span>
                      </div>
                      <p className="text-[10px] opacity-75">{m.locationInfo?.subtitle}</p>
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-neutral-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input Dock */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white/90 dark:bg-[#151720]/90 backdrop-blur-xl border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleSendVoice}
            className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shrink-0 active:scale-95"
            title="Telsiz Ses Gönder"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Mesaj yaz veya telsiz bas..."
            className="flex-1 bg-neutral-100 dark:bg-neutral-800 py-2.5 px-3.5 rounded-2xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition ${
              inputText.trim()
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 active:scale-95'
                : 'text-neutral-400 bg-transparent'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  // Thread List View
  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
      {/* Header */}
      <header className="px-5 pt-3 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Sohbet & Telsiz
          </h1>

          <button
            onClick={() => onNavigate('create_group')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Grup Kur</span>
          </button>
        </div>

        {/* Tab Segment */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-200/50 dark:bg-[#181a24] rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('direct')}
            className={`py-1.5 rounded-xl transition ${
              activeTab === 'direct'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Birebir
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`py-1.5 rounded-xl transition ${
              activeTab === 'group'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Gruplar
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`py-1.5 rounded-xl transition ${
              activeTab === 'regional'
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Bölge Ağı
          </button>
        </div>
      </header>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5">
        {filteredThreads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setSelectedThread(thread)}
            className="w-full p-3 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:bg-neutral-100 dark:hover:bg-[#1a1c26] transition flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={thread.avatar}
                  alt={thread.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {thread.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#151720]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                    {thread.title}
                  </h4>
                  <span className="text-[10px] text-neutral-400 shrink-0 ml-1">
                    {thread.lastMessageTime}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {thread.lastMessage}
                </p>
              </div>
            </div>

            {thread.unreadCount && thread.unreadCount > 0 ? (
              <span className="ml-2 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                {thread.unreadCount}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="chat" onSelectScreen={onNavigate} />
    </div>
  );
};
