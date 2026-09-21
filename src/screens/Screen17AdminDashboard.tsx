import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  UserX,
  Users,
  Check,
  X,
  Clock,
  Car,
  Radio,
  ArrowLeft,
} from 'lucide-react';
import { DriverApplication, HazardPoint } from '../types';
import { SAMPLE_APPLICATIONS, INITIAL_HAZARDS, INITIAL_SOS_INCIDENT } from '../data/mockData';
import { BrandLogo } from '../components/BrandLogo';

interface Screen17AdminDashboardProps {
  onBackToApp: () => void;
}

export const Screen17AdminDashboard: React.FC<Screen17AdminDashboardProps> = ({
  onBackToApp,
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'sos' | 'complaints'>('applications');
  const [applications, setApplications] = useState<DriverApplication[]>(SAMPLE_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<DriverApplication>(SAMPLE_APPLICATIONS[0]);
  const [bannerMessage, setBannerMessage] = useState('');

  const [complaints, setComplaints] = useState([
    {
      id: 'cmp-1',
      reporter: '@murat_tag34',
      reportedUser: '@ahmet_gece_surucu',
      reason: 'Bölgesel odada tehditkâr üslup ve asılsız kaza bildirimi',
      reportedMessage: '“Bu bölgede yolcu alırsan aracını çizerim.”',
      time: '22 dk önce',
      status: 'pending',
    },
    {
      id: 'cmp-2',
      reporter: '@baris_surucu',
      reportedUser: '@korsan_kullanici',
      reason: 'Sürücü Ağı dışı komisyon teklifi',
      reportedMessage: '“Bana haricen mesaj at yüzde 10 ucuza gelirim.”',
      time: '1 saat önce',
      status: 'pending',
    },
  ]);

  const handleApprove = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'approved' } : a))
    );
    if (selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: 'approved' });
    }
    setBannerMessage(`Sürücü onaylandı: ${selectedApp.fullName}. SMS gönderildi.`);
    setTimeout(() => setBannerMessage(''), 3500);
  };

  const handleReject = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'rejected' } : a))
    );
    if (selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: 'rejected' });
    }
    setBannerMessage(`Başvuru reddedildi: ${selectedApp.fullName}.`);
    setTimeout(() => setBannerMessage(''), 3500);
  };

  const handleFreezeUser = (username: string) => {
    setComplaints((prev) => prev.filter((c) => c.reportedUser !== username));
    setBannerMessage(`${username} kullanıcısı 7 gün askıya alındı.`);
    setTimeout(() => setBannerMessage(''), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <header className="w-full bg-white dark:bg-[#151720] border-b border-black/[0.05] dark:border-white/[0.06] px-6 py-3 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            Yönetici Konsolu
          </span>
        </div>

        <button
          onClick={onBackToApp}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold transition hover:opacity-90 active:scale-95 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Uygulamaya Dön</span>
        </button>
      </header>

      {/* Banner */}
      {bannerMessage && (
        <div className="bg-emerald-500 text-white text-xs font-bold py-2 px-6 text-center animate-fade-in flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>{bannerMessage}</span>
        </div>
      )}

      {/* Admin Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'applications'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Sürücü Başvuruları ({applications.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('sos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'sos'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Aktif Acil Çağrılar (1)
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'complaints'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Şikayet & Raporlar ({complaints.length})
          </button>
        </div>

        {/* Tab 1: Sürücü Başvuruları */}
        {activeTab === 'applications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Başvuru Listesi
              </span>
              <div className="space-y-2">
                {applications.map((app) => {
                  const isSelected = selectedApp.id === app.id;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                          : 'bg-white dark:bg-[#151720] text-neutral-900 dark:text-white ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={app.avatar}
                          alt={app.fullName}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold leading-tight">{app.fullName}</h4>
                          <p
                            className={`text-[10px] mt-0.5 ${
                              isSelected ? 'opacity-80' : 'text-neutral-400'
                            }`}
                          >
                            {app.plate} • {app.vehicleModel}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : app.status === 'rejected'
                            ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                            : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {app.status === 'approved'
                          ? 'Onaylı'
                          : app.status === 'rejected'
                          ? 'Reddedildi'
                          : 'Bekliyor'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Application Details */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-neutral-950 dark:text-white">
                    {selectedApp.fullName}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {selectedApp.city}, {selectedApp.district} • {selectedApp.phoneNumber}
                  </p>
                </div>

                <span className="text-xs font-bold text-neutral-400 font-mono">
                  TC: {selectedApp.tcNumber}
                </span>
              </div>

              {/* Vehicle & Plate Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Plaka</span>
                  <p className="text-xs font-black text-neutral-900 dark:text-white mt-0.5">
                    {selectedApp.plate}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Araç</span>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">
                    {selectedApp.vehicleModel}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">TAG Skoru</span>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ★ {selectedApp.tagRating || '4.92'}
                  </p>
                </div>
              </div>

              {/* Uploaded Documents Preview */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Doğrulama Belgeleri
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                        TAG Profil Ekranı
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Yüklendi ve Eşleşti
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                        Yolculuk Geçmişi
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Yüklendi (28 Sefer)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  disabled={selectedApp.status === 'approved'}
                  className={`flex-1 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                    selectedApp.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{selectedApp.status === 'approved' ? 'Onaylandı' : 'Sürücüyü Onayla'}</span>
                </button>

                <button
                  onClick={() => handleReject(selectedApp.id)}
                  disabled={selectedApp.status === 'rejected'}
                  className="py-3.5 px-6 rounded-2xl bg-neutral-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-neutral-800 dark:hover:bg-rose-950/40 text-neutral-600 dark:text-neutral-400 font-bold text-xs transition"
                >
                  Reddet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SOS */}
        {activeTab === 'sos' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-rose-600 text-xs font-bold">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>CANLI İNTİKAL TAKİBİ</span>
            </div>
            <h3 className="text-base font-extrabold text-neutral-950 dark:text-white">
              {INITIAL_SOS_INCIDENT.driverName} • {INITIAL_SOS_INCIDENT.locationName}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              3 sürücü intikal halinde. En yakın araç 4 dakika mesafede.
            </p>
          </div>
        )}

        {/* Tab 3: Şikayetler */}
        {activeTab === 'complaints' && (
          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    {c.reportedUser} hakkında şikayet
                  </span>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">{c.reason}</p>
                  <p className="text-[11px] text-neutral-400 italic mt-0.5">{c.reportedMessage}</p>
                </div>

                <button
                  onClick={() => handleFreezeUser(c.reportedUser)}
                  className="px-4 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold text-xs hover:opacity-90"
                >
                  Hesabı Askıya Al
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
