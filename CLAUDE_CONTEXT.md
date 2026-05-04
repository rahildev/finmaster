# FINMASTER ACADEMY — TAM LAYİHƏ KONTEKSTI

## 🎯 LAYİHƏ QISA MƏLUMATI
**Layihə**: Mühasibatlıq təhsil platforması — finmasteracademy.az
**Stack**: Laravel (backend API) + Next.js 16.2.4 (frontend) + PostgreSQL 16 + Nginx
**Dillər**: Azərbaycan (əsas) + İngilis dili (tam dəstək)

---

## 🖥️ SERVER (VPS) — HAZIR OLAN HİSSƏ

### VPS Əsas Məlumatlar
- **IP**: 159.198.79.83 (Namecheap, Ubuntu 24.04 LTS)
- **SSH**: `ssh aliagayevrr@159.198.79.83` (key ilə, şifrəsiz)
- **Sudo user**: aliagayevrr

### Qurulmuş Proqramlar
- UFW Firewall (22, 80, 443 açıq)
- Fail2Ban (SSH brute force qoruması)
- Nginx 1.24
- PHP 8.3 + PHP-FPM
- Composer 2.9.7
- Node.js 20 + npm
- PM2 (Next.js proses meneceri)
- PostgreSQL 16
- Certbot (SSL üçün)

### Layihə Yolları
```bash
Kod: /var/www/finmaster/
GitHub: https://github.com/rahildev/finmaster.git
Backend: /var/www/finmaster/backend/
Frontend: /var/www/finmaster/frontend/
```

### PostgreSQL Credentials
```
Database: finmaster
User: finmaster_user
Password: yTeJb4U9
```

### Laravel .env (VPS)
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=http://159.198.79.83
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=finmaster
DB_USERNAME=finmaster_user
DB_PASSWORD=yTeJb4U9
```

### Frontend .env.local (VPS)
```env
NEXT_PUBLIC_API_URL=http://159.198.79.83
```

### PM2 & Nginx
- PM2: `finmaster-frontend` adı ilə işləyir (port 3000)
- Nginx konfiqurasiya: `/etc/nginx/sites-available/finmaster`
  - `/api` → PHP-FPM → Laravel (port 8000)
  - `/` → localhost:3000 → Next.js
  - `/storage` → Laravel storage (şəkillər üçün)

### Cari Status
✅ API işləyir: `curl http://159.198.79.83/api/landing` → JSON qaytarır
❌ Frontend açılır amma data gəlmir (boş) — **database və section_settings yoxlanmalıdır**
⏳ Domain: finmasteracademy.az (Cloudflare DNS, hələ yayılmayıb)
📝 Nameservers: hunts.ns.cloudflare.com, stephane.ns.cloudflare.com

---

## 💻 LOKAL DEVELOPMENT

```bash
Mac: ~/Desktop/finmaster-academy/
Backend: php artisan serve (port 8000)
Frontend: npm run dev (port 3000)
Local DB: PostgreSQL, database: finmaster, user: rahilaliagayev
```

---

## 🌐 DİL SİSTEMİ (Azərbaycan + İngilis)

### Frontend (React Context)
**Fayl**: `frontend/contexts/LanguageContext.tsx`
- localStorage ilə dil saxlanılır
- Smooth transition animasiyası (300ms fade)
- `t` obyekti ilə static tərcümələr
- `language` state ilə dinamik content

**Translation faylları**:
- `frontend/locales/az.ts`
- `frontend/locales/en.ts`

### Dil Dəstəyi Olan Sections
Hər section həm AZ həm EN data saxlayır:

#### 1. Hero Section
```
title / title_en
subtitle / subtitle_en
btn_text / btn_text_en
```

#### 2. Teacher Info
```
name (eyni)
title / title_en
bio / bio_en
experience / experience_en
achievements / achievements_en
photo_url (eyni)
```

#### 3. Courses
```
name / name_en
description / description_en
price (eyni)
image_url (eyni)
duration_weeks (eyni)
is_free (eyni)
```

#### 4. Videos
```
title / title_en
description / description_en
video_url (eyni)
video_type (short/full)
```

#### 5. FAQ
```
question / question_en
answer / answer_en
```

#### 6. Contact
```
type (eyni: email, phone, whatsapp, address)
label / label_en
value (eyni)
```

### Backend Models (Laravel)
Hər model `fillable`-də `_en` fieldləri var:
- `backend/app/Models/HeroSection.php`
- `backend/app/Models/TeacherInfo.php`
- `backend/app/Models/Course.php`
- `backend/app/Models/Video.php`
- `backend/app/Models/Faq.php`
- `backend/app/Models/Contact.php`

### Admin Panel
Bütün admin formlarda həm AZ həm EN input var:
- `frontend/app/admin/hero/page.tsx`
- `frontend/app/admin/teacher/page.tsx`
- `frontend/app/admin/courses/page.tsx`
- `frontend/app/admin/videos/page.tsx`
- `frontend/app/admin/faqs/page.tsx`
- `frontend/app/admin/contacts/page.tsx`

---

## 🗂️ DATABASE STRUCTURE

### section_settings (MÜHİM!)
API-nin işləməsi üçün vacibdir. Yoxdursa API boş array qaytarır.

```sql
CREATE TABLE section_settings (
    id SERIAL PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL UNIQUE,
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Məlumat:
INSERT INTO section_settings (section_name, is_visible, sort_order) VALUES
('hero', true, 1),
('teacher', true, 2),
('courses', true, 3),
('videos', true, 4),
('faq', true, 5),
('contact', true, 6);
```

### Test Data (VPS-də yoxdur, əlavə edilməlidir)

#### Hero Section
```sql
INSERT INTO hero_section (title, title_en, subtitle, subtitle_en, btn_text, btn_text_en, created_at, updated_at) VALUES
('Maliyyə və Mühasibatlıq üzrə Peşəkar Təhsil', 'Professional Education in Finance and Accounting', 'Dünya standartlarına uyğun kurslar', 'Courses meeting international standards', 'Kurslara bax', 'View Courses', NOW(), NOW());
```

#### Teacher Info
```sql
INSERT INTO teacher_info (name, title, title_en, bio, bio_en, experience, experience_en, achievements, achievements_en, photo_url, created_at, updated_at) VALUES
('Aytən Quliyeva', 'Baş Müəllim, MBA', 'Lead Instructor, MBA', '15 illik təcrübəyə malik maliyyə eksperti', 'Finance expert with 15 years of experience', 'Beynəlxalq şirkətlərdə audit və maliyyə meneceri', 'Audit and finance manager in international companies', 'ACCA, CPA sertifikatları', 'ACCA, CPA certifications', 'teacher/default.webp', NOW(), NOW());
```

#### Courses (3 nümunə)
```sql
INSERT INTO courses (name, name_en, description, description_en, price, duration_weeks, image_url, is_free, sort_order, is_active, created_at, updated_at) VALUES
('Əsas Mühasibatlıq', 'Basic Accounting', 'Mühasibatlığın əsasları haqqında tam təlim', 'Complete training on accounting fundamentals', 0, 8, 'courses/accounting.jpg', true, 1, true, NOW(), NOW()),
('Maliyyə Analizi', 'Financial Analysis', 'Maliyyə hesabatlarının təhlili və interpretasiyası', 'Analysis and interpretation of financial reports', 299, 12, 'courses/finance.jpg', false, 2, true, NOW(), NOW()),
('1C Proqramı', '1C Software', '1C proqramında praktik iş bacarıqları', 'Practical skills in 1C software', 199, 6, 'courses/1c.jpg', false, 3, true, NOW(), NOW());
```

#### FAQs (3 nümunə)
```sql
INSERT INTO faqs (question, question_en, answer, answer_en, sort_order, is_active, created_at, updated_at) VALUES
('Kursların müddəti nə qədərdir?', 'How long are the courses?', 'Kurslar 6-12 həftə arası davam edir.', 'Courses last between 6-12 weeks.', 1, true, NOW(), NOW()),
('Sertifikat veriləcəkmi?', 'Will a certificate be provided?', 'Bəli, kurs bitirdikdən sonra sertifikat verilir.', 'Yes, a certificate is provided after course completion.', 2, true, NOW(), NOW()),
('Online dərslərdir?', 'Are the classes online?', 'Bəli, bütün dərslər online keçirilir.', 'Yes, all classes are conducted online.', 3, true, NOW(), NOW());
```

#### Contacts (4 nümunə)
```sql
INSERT INTO contacts (type, label, label_en, value, sort_order, created_at, updated_at) VALUES
('email', 'E-poçt', 'Email', 'info@finmasteracademy.az', 1, NOW(), NOW()),
('phone', 'Telefon', 'Phone', '+994 50 123 45 67', 2, NOW(), NOW()),
('whatsapp', 'WhatsApp', 'WhatsApp', '+994 50 123 45 67', 3, NOW(), NOW()),
('address', 'Ünvan', 'Address', 'Bakı, Azərbaycan', 4, NOW(), NOW());
```

---

## 🎨 UX FEATURES (Son əlavələr)

### 1. Navbar Auto-Hide
**Fayl**: `frontend/components/Navbar.tsx`
- Scroll down → navbar yavaş gizlənir (500ms)
- Scroll up → navbar görsənir
- Top 100px-də həmişə görünür

### 2. Language Transition
**Fayl**: `frontend/contexts/LanguageContext.tsx`
- Dil dəyişəndə smooth fade (300ms)
- localStorage-də saxlanılır
- Ekran çox ağarmır (opacity: 0.7)

### 3. Page Refresh Auto-Scroll
**Fayl**: `frontend/components/Providers.tsx`
- Page refresh olanda həmişə top-dan başlayır
- `ScrollToTop` component

### 4. Admin Auto-Scroll to Edit Form
**Bütün admin səhifələrdə**:
- Ən aşağıdan "Redaktə et" click edəndə
- Form açılır və avtomatik ora scroll olur
- `useRef` + `scrollIntoView` istifadə olunur

### 5. Language Switcher with Flags
**Navbar-da**:
- AZ dildəsə → 🇺🇸 EN göstərir (basanda EN-ə keçir)
- EN dildəsə → 🇦🇿 AZ göstərir (basanda AZ-a keçir)

---

## 🐛 BİLİNƏN PROBLEMLƏR

### 1. ❌ Teacher Photo Upload Bug (Lokal + VPS)
**Problem**: Admin paneldə müəllim şəkli upload olur, amma database `photo_url` NULL qalır.
- Şəkil `storage/app/public/teacher/` folderində saxlanılır
- Amma database UPDATE olmur
- **Müvəqqəti həll**: Manuel database update
```bash
cd backend
php artisan tinker
DB::table('teacher_info')->where('id', 1)->update(['photo_url' => 'teacher/FILENAME.webp']);
```
**Səbəb**: TeacherController update method-da FormData problemi ola bilər.

### 2. ⚠️ VPS Database Boş
**Problem**: VPS-də cədvəllər var, amma məlumat yoxdur.
**Həll**: Yuxarıdakı test datanı insert et + section_settings yarat.

### 3. ⚠️ Browser Cache
Bəzi hallarda dil dəyişəndə köhnə data görünür.
**Həll**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

---

## 📋 API ENDPOINTS

### Public API
```
GET  /api/landing          → Bütün landing page datası
GET  /api/courses          → Kurslar
GET  /api/videos           → Videolar
GET  /api/teacher          → Müəllim məlumatı
GET  /api/faqs             → FAQ-lar
GET  /api/contacts         → Əlaqə məlumatları
```

### Admin API (Auth lazımdır - hələ qurulmayıb)
```
# Hero
GET    /api/admin/hero
POST   /api/admin/hero
PUT    /api/admin/hero/{id}

# Teacher
GET    /api/admin/teacher
POST   /api/admin/teacher
PUT    /api/admin/teacher/{id}
DELETE /api/admin/teacher/{id}

# Courses
GET    /api/admin/courses
POST   /api/admin/courses
PUT    /api/admin/courses/{id}
DELETE /api/admin/courses/{id}

# Videos
GET    /api/admin/videos
POST   /api/admin/videos
PUT    /api/admin/videos/{id}
DELETE /api/admin/videos/{id}

# FAQs
GET    /api/admin/faqs
POST   /api/admin/faqs
PUT    /api/admin/faqs/{id}
DELETE /api/admin/faqs/{id}

# Contacts
GET    /api/admin/contacts
POST   /api/admin/contacts
PUT    /api/admin/contacts/{id}
DELETE /api/admin/contacts/{id}

# Sections
GET    /api/admin/sections
PUT    /api/admin/sections/{id}/toggle
```

---

## 🚀 NÖVBƏTI ADDIMLAR

### VPS-də Görüləsi İşlər (PRAİORİTET)

#### 1. Database-i Fix Et
```bash
ssh aliagayevrr@159.198.79.83
cd /var/www/finmaster/backend

# Yoxla
php artisan tinker --execute="echo 'Courses: ' . DB::table('courses')->count();"

# Əgər boşdursa, datanı insert et (yuxarıdakı SQL-ləri)
php artisan tinker

# Tinker içində:
DB::table('section_settings')->insert([
    ['section_name' => 'hero', 'is_visible' => true, 'sort_order' => 1],
    ['section_name' => 'teacher', 'is_visible' => true, 'sort_order' => 2],
    // ... və s.
]);
```

#### 2. Log-ları Yoxla
```bash
# Laravel log
tail -50 /var/www/finmaster/backend/storage/logs/laravel.log

# Nginx error log
sudo tail -50 /var/log/nginx/error.log

# PM2 log
pm2 logs finmaster-frontend --lines 50
```

#### 3. PM2 Status
```bash
pm2 list
pm2 restart finmaster-frontend
```

#### 4. Test Et
```bash
# API test
curl http://159.198.79.83/api/landing

# Frontend test
curl http://159.198.79.83

# Browser-də aç
http://159.198.79.83
```

### Domain SSL Qurulması (DNS yayıldıqdan sonra)

```bash
# DNS yoxla
dig finmasteracademy.az

# SSL qur
sudo certbot --nginx -d finmasteracademy.az -d www.finmasteracademy.az

# Nginx config update
sudo nano /etc/nginx/sites-available/finmaster
# server_name-i dəyişdir: server_name finmasteracademy.az www.finmasteracademy.az;

# Reload
sudo nginx -t
sudo systemctl reload nginx

# Laravel .env update
nano /var/www/finmaster/backend/.env
# APP_URL=https://finmasteracademy.az

# Frontend .env.local update
nano /var/www/finmaster/frontend/.env.local
# NEXT_PUBLIC_API_URL=https://finmasteracademy.az

# Restart
cd /var/www/finmaster/backend && php artisan config:cache
pm2 restart finmaster-frontend
```

### Admin Auth Sistemi (Hələ yoxdur)
- Laravel Sanctum və ya JWT
- Super admin login/register
- Middleware qoruması
- Frontend-də token management

---

## 📝 QEYDLƏR

### Git
- GitHub: https://github.com/rahildev/finmaster.git
- ⚠️ `finmaster_backup.sql` faylı silindi (həssas data)

### Code Quality
- TypeScript strict mode
- Type casting: `(data as any).field_en` EN fieldlər üçün
- Framer Motion animasiyaları
- Tailwind utility-first CSS

### Performance
- Next.js image optimization (unoptimized in dev)
- PostgreSQL indexes on foreign keys
- Laravel eager loading for relationships

---

## 🔐 ƏMNİYYƏT

### VPS Firewall
```bash
sudo ufw status
# 22/tcp (SSH), 80/tcp (HTTP), 443/tcp (HTTPS) açıq
```

### Fail2Ban
```bash
sudo fail2ban-client status sshd
```

### Database
- PostgreSQL password authentication
- Localhost-only connection
- Production-da APP_DEBUG=false

---

## 📞 DƏSTƏK

Hər hansı problem olarsa:
1. Log-ları yoxla (Laravel, Nginx, PM2)
2. Database bağlantısını test et
3. API response-u yoxla (curl)
4. Browser console-u yoxla (frontend errors)

**Uğurlar! 🚀**
