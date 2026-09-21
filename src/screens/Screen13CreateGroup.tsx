import React, { useState } from 'react';
import { ArrowLeft, Plus, X, Lock, Globe } from 'lucide-react';
import { ChatThread } from '../types';

interface Screen13CreateGroupProps {
  onBack: () => void;
  onCreateGroup: (newGroup: ChatThread) => void;
}

export const Screen13CreateGroup: React.FC<Screen13CreateGroupProps> = ({
  onBack,
  onCreateGroup,
}) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [groupType, setGroupType] = useState<'open' | 'private'>('private');
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState<string[]>(['@murat_tag34', '@baris_surucu']);
  const [error, setError] = useState('');

  const handleAddMember = () => {
    if (!memberInput.trim()) return;
    const clean = memberInput.startsWith('@') ? memberInput.trim() : `@${memberInput.trim()}`;
    if (!members.includes(clean)) setMembers([...members, clean]);
    setMemberInput('');
  };

  const handleRemoveMember = (tag: string) => {
    setMembers(members.filter((m) => m !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError('Lütfen bir grup adı yazın.');
      return;
    }

    const created: ChatThread = {
      id: `ch-grp-${Date.now()}`,
      type: 'group',
      title: groupName,
      subtitle: description || 'Yeni grup kuruldu.',
      avatar: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=160&q=80',
      unreadCount: 0,
      lastMessageTime: 'Şimdi',
      memberCount: members.length + 1,
      badge: groupType === 'private' ? 'Özel' : 'Açık',
    };

    onCreateGroup(created);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 overflow-y-auto font-sans transition-colors">
      {/* Top Header */}
      <header className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#181a24] ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold tracking-tight text-neutral-900 dark:text-white">
          Yeni Sürücü Grubu
        </span>
        <div className="w-8" />
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 py-2 flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1 px-1">
              Grup Adı
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Örn: Kadıköy - Beşiktaş Hattı"
              className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
              autoFocus
            />
            {error && <p className="text-xs text-rose-500 mt-1 px-1">{error}</p>}
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1 px-1">
              Açıklama (Opsiyonel)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Grup amacı, çalışma saatleri..."
              className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Privacy Selector */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 px-1">
              Gizlilik Türü
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGroupType('private')}
                className={`p-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold transition-all ${
                  groupType === 'private'
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'bg-white dark:bg-[#151720] text-neutral-500 ring-1 ring-black/[0.04] dark:ring-white/[0.06]'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <div className="text-left">
                  <span>Özel Grup</span>
                  <span className="text-[10px] block opacity-75 font-normal">Sadece davetliler</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setGroupType('open')}
                className={`p-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold transition-all ${
                  groupType === 'open'
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'bg-white dark:bg-[#151720] text-neutral-500 ring-1 ring-black/[0.04] dark:ring-white/[0.06]'
                }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <div className="text-left">
                  <span>Bölgeye Açık</span>
                  <span className="text-[10px] block opacity-75 font-normal">Onaylı sürücüler</span>
                </div>
              </button>
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 px-1">
              Üye Ekle
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="@kullanici_adi"
                className="flex-1 p-3 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="px-4 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold text-xs"
              >
                Ekle
              </button>
            </div>

            {/* Added member pills */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {members.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-[11px] font-semibold text-neutral-800 dark:text-neutral-200"
                >
                  <span>{m}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(m)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 pb-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm"
          >
            Grubu Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};
