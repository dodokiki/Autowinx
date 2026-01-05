# Auto Winx - Professional Car Tinting Service Website

เว็บไซต์มืออาชีพสำหรับบริการติดฟิล์มรถยนต์ เคลือบแก้ว และ PPF  
Professional website for car window tinting, ceramic coating, and PPF installation services.

## Features / คุณสมบัติ

### ✅ Multi-page Structure / โครงสร้างหลายหน้า
- **Home (index.html)** - หน้าหลักพร้อม Hero section, Services preview, Statistics, Testimonials
- **Services (services.html)** - รายละเอียดบริการทั้งหมด พร้อมแพ็คเกจราคา
- **About (about.html)** - ข้อมูลเกี่ยวกับบริษัท ค่านิยม และทำไมต้องเลือกเรา
- **Gallery (gallery.html)** - ผลงานที่ผ่านมา แบ่งตามประเภทบริการ
- **Contact (contact.html)** - ฟอร์มติดต่อ แผนที่ และข้อมูลการติดต่อ

### ✅ SEO Optimized / ปรับปรุง SEO
- Complete meta tags (title, description, keywords, Open Graph, Twitter Cards)
- Structured Data (JSON-LD) for better search engine understanding
- Sitemap.xml for search engine indexing
- Robots.txt for crawler management
- Canonical URLs to prevent duplicate content
- Semantic HTML5 structure
- Alt tags for all images

### ✅ Professional & International Design / ดีไซน์มืออาชีพและสากล
- Bilingual support (Thai/English) throughout the website
- Modern, clean, and professional design
- Responsive design for all devices (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional color scheme (dark theme with gold accents)

### ✅ Performance Optimized / ปรับปรุงประสิทธิภาพ
- External CSS and JavaScript files for better caching
- Optimized font loading with preconnect
- Lazy loading for images
- Compressed assets
- Browser caching configuration (.htaccess)

## File Structure / โครงสร้างไฟล์

```
autowinx/
├── index.html          # หน้าหลัก / Home page
├── services.html       # หน้าบริการ / Services page
├── about.html          # หน้าเกี่ยวกับเรา / About page
├── gallery.html        # หน้าผลงาน / Gallery page
├── contact.html        # หน้าติดต่อ / Contact page
├── css/
│   └── style.css       # Stylesheet หลัก / Main stylesheet
├── js/
│   └── main.js         # JavaScript หลัก / Main JavaScript
├── sitemap.xml         # Sitemap for SEO
├── robots.txt          # Robots file for crawlers
├── .htaccess           # Apache configuration
└── README.md           # Documentation
```

## SEO Features / คุณสมบัติ SEO

1. **Meta Tags**: Complete meta tags on every page
2. **Structured Data**: JSON-LD schema for business information
3. **Sitemap**: XML sitemap for search engines
4. **Robots.txt**: Proper crawler instructions
5. **Canonical URLs**: Prevent duplicate content issues
6. **Alt Tags**: All images have descriptive alt text
7. **Semantic HTML**: Proper use of HTML5 semantic elements
8. **Mobile-Friendly**: Responsive design for mobile-first indexing

## Browser Support / รองรับเบราว์เซอร์

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Setup Instructions / วิธีติดตั้ง

1. Upload all files to your web server
2. Ensure `.htaccess` is enabled (for Apache servers)
3. Update contact information in all HTML files:
   - Phone number
   - LINE ID
   - Address
   - Google Maps embed URL
4. Update domain name in:
   - `sitemap.xml`
   - `robots.txt`
   - All meta tags (og:url, canonical, etc.)
5. Add your actual images to replace placeholder images
6. Configure SSL certificate and uncomment HTTPS redirect in `.htaccess`

## Customization / การปรับแต่ง

### Colors / สี
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #1a1a2e;
  --secondary-color: #16213e;
  --accent-color: #0f3460;
  --gold: #ffd700;
  /* ... */
}
```

### Content / เนื้อหา
- Edit HTML files directly to update content
- All pages support bilingual content (Thai/English)
- Update images by replacing URLs in `<img>` tags

### Language / ภาษา
- Language switcher is functional
- Add more translations in `js/main.js` translations object
- Use `data-translate` attribute for dynamic translation

## Notes / หมายเหตุ

- Replace placeholder images with actual photos
- Update contact information throughout the site
- Configure Google Maps embed with actual location coordinates
- Set up form submission handler (currently shows alert)
- Add favicon and apple-touch-icon files
- Configure SSL and update URLs to HTTPS

## License / สิทธิ์การใช้งาน

© 2025 Auto Winx. All Rights Reserved.



