# FINMASTER ACADEMY — Layihə Konteksti

## Layihə haqqında
Finmaster Academy — mühasibatlıq və maliyyə tədrisi üzrə təhsil platforması.
Hal-hazırda birinci mərhələdir: Landing Page + Admin Panel.

## Texnologiyalar
- **Backend:** PHP Laravel (backend/ qovluğunda)
- **Frontend:** React Next.js with TypeScript + Tailwind CSS (frontend/ qovluğunda)  
- **Database:** PostgreSQL
  - DB adı: finmaster
  - User: rahilaliagayev
  - Password: (boş, şifrəsiz)
  - Host: 127.0.0.1, Port: 5432
- **Server:** LEMP stack (deploy mərhələsində)

## Hazır olan işlər
- Laravel proyekti yaradılıb (`backend/`)
- Next.js proyekti yaradılıb (`frontend/`)
- PostgreSQL database yaradılıb
- Migration faylları yazılıb və migrate olunub

## Database Cədvəlləri (artıq mövcuddur)

### site_settings
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| key | string unique | Açar (site_name, logo_url, etc.) |
| value | text nullable | Dəyər |
| type | string default('text') | text, image, json |
| timestamps | | |

### hero_sections
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| title | string | Başlıq |
| subtitle | text nullable | Alt başlıq |
| image_url | string nullable | Arxa fon şəkli |
| btn_text | string nullable | Düymə mətni |
| btn_link | string nullable | Düymə linki |
| sort_order | integer default(0) | Sıralama |
| is_active | boolean default(true) | Aktiv/deaktiv |
| timestamps | | |

### teacher_info
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| name | string | Müəllimin adı |
| title | string nullable | Vəzifəsi/titulu |
| bio | text nullable | Haqqında mətn |
| photo_url | string nullable | Şəkil |
| experience | text nullable | Təcrübə |
| achievements | text nullable | Nailiyyətlər |
| timestamps | | |

### courses
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| name | string | Kurs adı |
| description | text nullable | Təsvir |
| duration | string nullable | Müddət |
| price | decimal(10,2) default(0) | Qiymət |
| image_url | string nullable | Şəkil |
| sort_order | integer default(0) | Sıralama |
| is_active | boolean default(true) | Aktiv/deaktiv |
| timestamps | | |

### videos
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| title | string | Video başlığı |
| description | text nullable | Təsvir |
| video_url | string | YouTube/embed link |
| thumbnail_url | string nullable | Ön şəkil |
| course_id | FK nullable | Kursa bağlı (courses.id) |
| sort_order | integer default(0) | Sıralama |
| is_active | boolean default(true) | Aktiv/deaktiv |
| timestamps | | |

### contacts
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| type | string | phone, email, instagram, whatsapp, etc. |
| label | string | Göstəriləcək ad |
| value | string | Əlaqə dəyəri |
| icon | string nullable | İkon adı |
| sort_order | integer default(0) | Sıralama |
| timestamps | | |

### faqs
| Sütun | Tip | Açıqlama |
|-------|-----|----------|
| id | bigint PK | |
| question | string | Sual |
| answer | text | Cavab |
| sort_order | integer default(0) | Sıralama |
| is_active | boolean default(true) | Aktiv/deaktiv |
| timestamps | | |

## Brend Məlumatları

### Rənglər (logodan çıxarılıb)
- **Əsas tünd yaşıl:** #0A4D2C (başlıqlar, əsas elementlər)
- **Orta yaşıl:** #6AB04E (accent, vurğulama)
- **Açıq yaşıl:** #72B845 (dekorativ, hover effektlər)
- **Ağ:** #FFFFFF (arxa fon)
- **Tünd boz:** #1D1D1F (Apple üslubunda mətn rəngi)
- **Açıq boz:** #F5F5F7 (Apple üslubunda section arxa fonları)

### Logo faylları
- Logo (tam): `backend/storage/app/public/brand/finmaster-logo.png`
- İkon: `backend/storage/app/public/brand/finmaster-icon.png`
- Favicon üçün icon istifadə olunacaq

### Şrift
- Inter və ya SF Pro Display (Apple üslubuna uyğun)
- Next.js-də next/font ilə yüklənəcək

## Dizayn Tələbləri — Apple Stili

Landing page Apple.com saytının dizayn dilinə uyğun olmalıdır:

1. **Minimalist və təmiz** — çox boşluq, az element
2. **Böyük tipografiya** — başlıqlarda 48-72px, alt başlıqlarda 24-32px
3. **Full-width seksiyalar** — hər bölmə ekranın bütün enini tutur
4. **Alternativ arxa fonlar** — ağ/açıq boz növbələşir
5. **Smooth scroll animasiyalar** — elementlər aşağı scroll edəndə fade-in/slide-up olur (framer-motion istifadə et)
6. **Sticky navbar** — scroll edəndə üstdə qalır, blur backdrop
7. **Hover effektləri** — kartlarda yüngül lift/shadow
8. **Responsive** — mobile-first yanaşma
9. **Rəng sxemi** — əsasən ağ/boz, yaşıl yalnız accent kimi (düymələr, linkler)

## Landing Page Seksiyaları (sırayla)

1. **Navbar** — Logo (solda) + Menyu linkləri (ortada) + Əlaqə düyməsi (sağda)
2. **Hero** — Böyük başlıq + alt mətn + CTA düyməsi + arxa fon şəkli/gradient
3. **Müəllim haqqında** — Foto + ad + bio + təcrübə (Apple "Meet the team" stili)
4. **Kurslar** — Kart grid (hər kursun adı, təsviri, müddəti, qiyməti)
5. **Videolar** — YouTube embed grid/carousel
6. **FAQ** — Accordion stilli sual-cavab (Apple support stili)
7. **Əlaqə** — Telefon, email, sosial media linklər
8. **Footer** — Logo + sürətli linklər + copyright

## Arxitektura

### Backend API Endpoint-ları
```
GET  /api/landing          → Bütün landing page datası (public)
GET  /api/admin/settings   → Site ayarları (admin)
PUT  /api/admin/settings   → Ayarları yenilə
GET  /api/admin/hero       → Hero seksiyalar siyahısı
POST /api/admin/hero       → Yeni hero əlavə et
PUT  /api/admin/hero/{id}  → Hero redaktə et
DELETE /api/admin/hero/{id} → Hero sil
(eyni CRUD pattern: courses, videos, contacts, faqs, teacher)
```

### CORS
Laravel CORS konfiqurasiyası Next.js-in localhost:3000-dan sorğu göndərməsinə icazə verməlidir.

### Şəkil yükləmə
Admin paneldən yüklənən şəkillər `storage/app/public/uploads/` qovluğunda saxlanacaq.
`php artisan storage:link` ilə public symlink yaradılmalıdır.

## İndi Ediləcək İşlər (Prioritet sırası)

### Addım 1: Laravel Backend API
1. Bütün Model-ləri yarat (SiteSetting, HeroSection, TeacherInfo, Course, Video, Contact, Faq)
2. LandingPageController — public endpoint, bütün datanı qaytarır
3. Admin CRUD Controller-ləri — hər cədvəl üçün
4. API Route-lar (routes/api.php)
5. CORS konfiqurasiyası
6. Seeder — test datası ilə doldurmaq (müəllim, nümunə kurslar, videolar, FAQ-lar)
7. Şəkil yükləmə funksionallığı
8. Storage symlink

### Addım 2: Next.js Frontend — Landing Page
1. Layout (navbar + footer)
2. Hero seksiyası
3. Müəllim haqqında seksiyası
4. Kurslar seksiyası
5. Videolar seksiyası
6. FAQ seksiyası (accordion)
7. Əlaqə seksiyası
8. Scroll animasiyalar (framer-motion)
9. Responsive dizayn
10. API inteqrasiyası — Laravel-dən data çəkmək
11. SEO meta taglar

### Addım 3: Admin Panel (sonra)
1. Admin login
2. Dashboard
3. Hər seksiya üçün CRUD interfeysi
4. Şəkil yükləmə
5. Drag-and-drop sıralama

## Qeydlər
- Frontend developer Java backend developer-dir, PHP/Laravel ilə çox tanış deyil
- Kod təmiz və şərhli olmalıdır
- Hər addımı ayrıca commit etmək məsləhətdir
- Apple dizayn stilinə ciddi əməl olunmalıdır
