import { z } from 'zod';

export const heroSchema = z.object({
  title: z.string().min(2, 'Başlıq minimum 2 simvol olmalıdır'),
  title_en: z.string().default(''),
  subtitle: z.string().default(''),
  subtitle_en: z.string().default(''),
  btn_text: z.string().default(''),
  btn_text_en: z.string().default(''),
  btn_link: z.string().default(''),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
});
export type HeroFormData = z.infer<typeof heroSchema>;

export const courseSchema = z.object({
  name: z.string().min(2, 'Kurs adı minimum 2 simvol olmalıdır'),
  name_en: z.string().default(''),
  heading: z.string().default(''),
  heading_en: z.string().default(''),
  description: z.string().default(''),
  description_en: z.string().default(''),
  duration: z.string().default(''),
  duration_en: z.string().default(''),
  price: z
    .string()
    .default('')
    .refine(
      (v) => v === '' || /^\d+(\.\d{1,2})?$/.test(v),
      'Düzgün qiymət daxil edin, məsələn: 150 və ya 99.99'
    ),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
});
export type CourseFormData = z.infer<typeof courseSchema>;

export const videoSchema = z.object({
  title: z.string().min(2, 'Video başlığı minimum 2 simvol olmalıdır'),
  title_en: z.string().default(''),
  description: z.string().default(''),
  description_en: z.string().default(''),
  video_url: z.string().min(1, 'Video URL tələb olunur'),
  video_type: z.enum(['video', 'short']).default('video'),
  course_id: z.string().default(''),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
});
export type VideoFormData = z.infer<typeof videoSchema>;

export const faqSchema = z.object({
  question: z.string().min(3, 'Sual minimum 3 simvol olmalıdır'),
  question_en: z.string().default(''),
  answer: z.string().min(5, 'Cavab minimum 5 simvol olmalıdır'),
  answer_en: z.string().default(''),
  sort_order: z.number().default(0),
});
export type FaqFormData = z.infer<typeof faqSchema>;

export const contactSchema = z.object({
  type: z.enum(['phone', 'whatsapp', 'email', 'address', 'instagram', 'youtube', 'tiktok', 'facebook', 'linkedin']),
  label: z.string().min(2, 'Etiket minimum 2 simvol olmalıdır'),
  label_en: z.string().default(''),
  value: z.string().min(1, 'Dəyər tələb olunur'),
  icon: z.string().default(''),
  sort_order: z.number().default(0),
});
export type ContactFormData = z.infer<typeof contactSchema>;

export const teacherSchema = z.object({
  name: z.string().min(2, 'Ad minimum 2 simvol olmalıdır'),
  title: z.string().default(''),
  title_en: z.string().default(''),
  bio: z.string().default(''),
  bio_en: z.string().default(''),
  experience: z.string().default(''),
  experience_en: z.string().default(''),
  achievements: z.string().default(''),
  achievements_en: z.string().default(''),
});
export type TeacherFormData = z.infer<typeof teacherSchema>;

export const userCreateSchema = z.object({
  name: z.string().min(2, 'Ad minimum 2 simvol olmalıdır'),
  username: z
    .string()
    .min(3, 'İstifadəçi adı minimum 3 simvol olmalıdır')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Yalnız hərf, rəqəm, _ və - istifadə edin'),
  email: z.string().email('Düzgün email daxil edin'),
  password: z.string().min(6, 'Şifrə minimum 6 simvol olmalıdır'),
  permissions: z.array(z.string()).default([]),
});
export type UserCreateFormData = z.infer<typeof userCreateSchema>;

export const userUpdateSchema = z.object({
  name: z.string().min(2, 'Ad minimum 2 simvol olmalıdır'),
  username: z
    .string()
    .min(3, 'İstifadəçi adı minimum 3 simvol olmalıdır')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Yalnız hərf, rəqəm, _ və - istifadə edin'),
  email: z.string().email('Düzgün email daxil edin'),
  password: z
    .string()
    .optional()
    .refine((v) => !v || v.length >= 6, 'Şifrə minimum 6 simvol olmalıdır'),
  permissions: z.array(z.string()).default([]),
});
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
