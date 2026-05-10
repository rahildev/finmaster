/**
 * Landing Page API Response Types
 * Backend-dən gələn data strukturları
 */

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  image_url_mobile: string | null;
  btn_text: string | null;
  btn_link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeacherInfo {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  photo_url_mobile: string | null;
  experience: string | null;
  achievements: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  name: string;
  name_en: string | null;
  heading: string | null;
  heading_en: string | null;
  description: string | null;
  description_en: string | null;
  duration: string | null;
  duration_en: string | null;
  price: string;
  image_url: string | null;
  image_url_mobile: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: number;
  title: string;
  title_en: string | null;
  description: string | null;
  description_en: string | null;
  video_url: string;
  video_type: 'video' | 'short';
  thumbnail_url: string | null;
  course_id: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  course?: {
    id: number;
    name: string;
  };
}

export interface Faq {
  id: number;
  question: string;
  question_en: string | null;
  answer: string;
  answer_en: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  type: string;
  label: string;
  value: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  [key: string]: string;
}

export interface LandingPageData {
  hero: HeroSection[];
  teacher: TeacherInfo[];
  courses: Course[];
  videos: Video[];
  faqs: Faq[];
  contacts: Contact[];
  settings: SiteSettings;
  section_visibility: {
    [key: string]: boolean;
  };
}
