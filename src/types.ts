export type ScreenId =
  | 'login'               // 1. Telefon numarası girişi
  | 'sms'                 // 2. SMS doğrulama
  | 'create_account'      // 3. Hesabını oluştur
  | 'vehicle_info'        // 4. Araç bilgileri
  | 'complete_app'        // 5. Başvurunu tamamla
  | 'under_review'        // 6. Başvuru inceleniyor
  | 'home'                // 7. Ana Sayfa (Net kazanç & km)
  | 'add_income'          // 8. Kazanç ekle alt sayfası
  | 'add_expense'         // 9. Gider ekle alt sayfası
  | 'map'                 // 10. Harita (Güvenlik & Yol)
  | 'hazard_detail'       // 11. Harita uyarı ayrıntısı
  | 'chat'                // 12. Sohbet (Özel / Grup / Bölge & 1-1 Chat)
  | 'create_group'        // 13. Grup oluştur
  | 'emergency_sos'       // 14. Acil Destek (Kırmızı SOS)
  | 'active_sos'          // 15. Aktif Acil Destek & Yardım Kabul
  | 'profile_settings'    // 16. Profil ve ayarlar
  | 'admin_panel';        // 17. Yönetici Paneli (Masaüstü)

export type VehicleCategory = 'TAG' | 'Motosiklet' | 'Premium';

export type PaymentMethod = 'Nakit' | 'Hesap';

export type ExpenseCategory =
  | 'Yakıt'
  | 'Yemek'
  | 'Otopark'
  | 'Araç Yıkama'
  | 'Bakım/Onarım'
  | 'Üyelik/Abonelik'
  | 'Komisyon'
  | 'Sigorta'
  | 'Muayene'
  | 'Ceza'
  | 'Diğer';

export type HazardCategory =
  | 'kaza'
  | 'trafik_yogunlugu'
  | 'yavaslama'
  | 'yol_calismasi'
  | 'yol_engeli'
  | 'yol_guvenligi'
  | 'calisma_yogunlugu'
  | 'kisisel_guvenlik';

export interface HazardPoint {
  id: string;
  category: HazardCategory;
  title: string;
  locationName: string;
  coordinates: { x: number; y: number }; // relative map percent
  distance: string;
  verifiedCount: number;
  timeAgo: string;
  reportedAt?: string;
  reporterName?: string;
  reporterBadge?: string;
  description?: string;
  isHelpRequest?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  senderName?: string;
  senderAvatar?: string;
  text?: string;
  type: 'text' | 'image' | 'location' | 'audio';
  imageUrl?: string;
  locationInfo?: { title: string; subtitle: string; lat: number; lng: number };
  audioDuration?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatThread {
  id: string;
  type: 'direct' | 'group' | 'regional';
  title: string;
  username?: string;
  subtitle: string;
  lastMessage?: string;
  avatar: string;
  unreadCount?: number;
  lastMessageTime: string;
  isOnline?: boolean;
  memberCount?: number;
  badge?: string;
}

export interface DriverApplication {
  id: string;
  fullName: string;
  username: string;
  tcNumberMasked: string;
  tcNumber?: string;
  phoneNumber?: string;
  birthDate: string;
  city: string;
  district: string;
  plate: string;
  vehicleModel?: string;
  vehicleCategory: VehicleCategory;
  tagProfilePhotoUploaded: boolean;
  rideHistoryPhotoUploaded: boolean;
  tagRating?: string;
  avatar?: string;
  referenceCode?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface SosIncident {
  id: string;
  driverUsername: string;
  driverName: string;
  vehiclePlate: string;
  vehicleCategory: VehicleCategory;
  locationName: string;
  initialRadiusKm: number;
  currentRadiusKm: number;
  respondersCount: number;
  elapsedSeconds: number;
  status: 'active' | 'resolved' | 'cancelled';
  responders: {
    id: string;
    username: string;
    name: string;
    driverName?: string;
    plate?: string;
    vehicleModel?: string;
    distance: string;
    eta: string;
    phoneMasked: string;
  }[];
}
