# FinMaster Academy — Təhvil Sənədi

---

## 1. Sayt Haqqında Ümumi Məlumat

| | |
|---|---|
| **Domain** | finmasteracademy.az |
| **Hosting (VPS)** | Namecheap.com |
| **Frontend** | Next.js (React) |
| **Backend** | Laravel (PHP) |
| **Verilənlər Bazası** | PostgreSQL |
| **CDN / DNS** | Cloudflare |
| **Kod Deposu** | GitHub |

Sayt iki hissədən ibarətdir:
- **Frontend** — istifadəçilər görür (finmasteracademy.az)
- **Backend (Admin Panel)** — siz idarə edirsiniz (finmasteracademy.az/admin)

---

## 2. VPS (Server) Girişi

**Server IP:** `159.198.79.83`

SSH ilə girişi kompüterin terminalından edirsiniz:
```bash
ssh SIZIN_USER@159.198.79.83
```

### Yeni VPS istifadəçisi yaratmaq (köhnə userı silmədən)
```bash
sudo adduser YENI_USER
sudo usermod -aG sudo YENI_USER
```
Bundan sonra yeni user ilə giriş edə bilərsiniz:
```bash
ssh YENI_USER@159.198.79.83
```

### Mövcud user şifrəsini dəyişmək
```bash
sudo passwd aliagayevrr
```
Yeni şifrəni iki dəfə daxil edin.

### Köhnə useri silmək (təhvildən sonra)
```bash
sudo deluser --remove-home aliagayevrr
```

---

## 3. Verilənlər Bazası

| | |
|---|---|
| **Növ** | PostgreSQL |
| **Host** | 127.0.0.1 |
| **Port** | 5432 |
| **Verilənlər bazası adı** | finmaster |
| **İstifadəçi adı** | finmaster_user |
| **Şifrə** | yTeJb4U934BO4VdVci |

### DB-yə giriş (VPS-dən)
```bash
psql -U finmaster_user -h 127.0.0.1 -p 5432 finmaster
```

### Cədvəllər və məzmunları

| Cədvəl | Nə saxlayır |
|---|---|
| `users` | Admin panel istifadəçiləri (username, şifrə, rol) |
| `hero_sections` | Ana səhifə banner mətn və şəkli |
| `courses` | Kurslar (ad, qiymət, müddət, şəkil) |
| `teacher_info` | Müəllim haqqında məlumat |
| `contacts` | Əlaqə məlumatları (telefon, sosial media) |
| `faqs` | Tez-tez verilən suallar |
| `videos` | YouTube video linklər |
| `site_settings` | Ümumi sayt ayarları |
| `section_settings` | Hansı bölmələrin görünüb-görünməməsi |

### DB-nin ehtiyat nüsxəsini almaq
```bash
pg_dump -U finmaster_user -h 127.0.0.1 -p 5432 --no-owner finmaster > ~/yedek_$(date +%Y%m%d).sql
```

### Ehtiyat nüsxəni bərpa etmək
```bash
sudo -u postgres psql -d finmaster -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO finmaster_user;"
psql -U finmaster_user -h 127.0.0.1 -p 5432 finmaster < ~/yedek_TARIX.sql
```

---

## 4. Admin Panel

**URL:** `https://finmasteracademy.az/admin`

| | |
|---|---|
| **Super Admin istifadəçi adı** | superadmin |
| **Şifrə** | _(öz şifrənizi yazın)_ |

### Admin panel şifrəsini dəyişmək (VPS-dən)
```bash
cd /var/www/finmaster/backend && php artisan tinker --execute="App\Models\User::where('username','superadmin')->update(['password' => bcrypt('YENİ_ŞİFRƏ')]);"
```

### Yeni admin istifadəçisi yaratmaq (VPS-dən)
```bash
cd /var/www/finmaster/backend && php artisan tinker --execute="App\Models\User::create(['name'=>'Ad Soyad','username'=>'yeni_user','password'=>bcrypt('şifrə'),'role'=>'admin']);"
```

### Admin Panel Bölmələri

| Bölmə | Nə edə bilərsiniz |
|---|---|
| **Hero** | Ana səhifə başlıq mətnini və arxa fon şəklini dəyişmək |
| **Müəllim** | Müəllim adı, titulu, bioqrafiyası, şəklini dəyişmək |
| **Kurslar** | Kurs əlavə etmək, silmək, qiymət/müddət dəyişmək |
| **Videolar** | YouTube video linkləri əlavə/silmək |
| **Əlaqə** | Telefon, WhatsApp, Instagram, LinkedIn linkləri |
| **FAQ** | Sual-cavab əlavə/silmək |
| **Bölmə Ayarları** | Hansı bölmələrin saytda görünəcəyini açıb-bağlamaq |
| **İstifadəçilər** | Admin hesablarını idarə etmək |
| **Cache Təmizlə** | Cloudflare keşini sıfırlamaq (dəyişiklik görünmürsə) |

---

## 5. Şəkillər Harada Saxlanır

Yüklənən bütün şəkillər VPS-də bu qovluqdadır:

```
/var/www/finmaster/backend/storage/app/public/
├── hero/        ← Banner şəkilləri
├── courses/     ← Kurs şəkilləri
├── teacher/     ← Müəllim şəkli
└── videos/      ← Video thumbnail-lar
```

Saytdakı URL formatı: `https://finmasteracademy.az/storage/courses/SHEKILIN_ADI.jpg`

> **Qeyd:** Şəkilləri admin paneldən yükləyirsiniz, manual kopyalamağa ehtiyac yoxdur.

---

## 6. GitHub (Kod Deposu)

Saytın kodu GitHub-da saxlanır. Kod dəyişikliyi olduqda VPS-ə tətbiq etmək üçün:

### VPS-də kodu yeniləmək
```bash
cd /var/www/finmaster
git pull origin main

# Frontend-i yenidən build etmək
cd frontend && npm run build

# Backend keşini təmizləmək
cd ../backend && php artisan config:cache && php artisan route:cache
```

### Kodu yeni GitHub hesabına köçürmək
Köhnə kompüterdə:
```bash
cd /path/to/finmaster-academy
git remote set-url origin https://github.com/YENİ_GITHUB_USER/YENİ_REPO.git
git push -u origin main
```

VPS-də yeni repo ilə əlaqələndirmək:
```bash
cd /var/www/finmaster
git remote set-url origin https://github.com/YENİ_GITHUB_USER/YENİ_REPO.git
git pull origin main
```

---

## 7. Cloudflare

**Giriş:** cloudflare.com
**Cari email:** aliagayev95@gmail.com

### Email-i dəyişmək / hesabı köçürmək
1. cloudflare.com-a daxil olun
2. Sağ üst küncdə profil ikonuna klikləyin
3. **My Profile → Authentication** — email-i dəyişin
4. Və ya **Manage Account → Members** — yeni email əlavə edib köhnəni silin

### Cache-i əl ilə təmizləmək (saytda dəyişiklik görünmürsə)
Admin paneldə **"Cache Təmizlə"** düyməsinə basın.

Və ya Cloudflare dashboard-dan:
`Websites → finmasteracademy.az → Caching → Purge Everything`

---

## 8. Gündəlik İstifadə — Ən Çox Lazım Olan Əməliyyatlar

### Yeni kurs əlavə etmək
Admin Panel → Kurslar → **Yeni Kurs** → Ad, qiymət, müddət, şəkil daxil edin → Saxla

### Saytda dəyişiklik görünmürsə
Admin Panel → **Cache Təmizlə** düyməsinə basın, 1-2 dəqiqə gözləyin

### Sosial media linklərini dəyişmək
Admin Panel → Əlaqə → müvafiq linki dəyişin → Saxla

### Müəllim şəklini/mətnini dəyişmək
Admin Panel → Müəllim → dəyişin → Saxla

---

## 9. Texniki Problemlər

### Sayt açılmırsa
```bash
# VPS-ə gir və servisləri yoxla
ssh USER@159.198.79.83
sudo systemctl status nginx
sudo systemctl status php8.2-fpm
sudo systemctl restart nginx
```

### Backend işləmirsə
```bash
cd /var/www/finmaster/backend
php artisan config:clear
php artisan cache:clear
sudo systemctl restart php8.2-fpm
```

---

*Bu sənəd FinMaster Academy saytının idarəedilməsi üçün hazırlanmışdır.*
