# Project Move | MoveOS

A modern, high-performance fullstack website for the Project Move custom Android ROM project, built with Next.js 14, TypeScript, and PostgreSQL.

## 🌟 Features

### Public Features
- **Homepage** - Premium hero with dynamic broadcast alerts
- **Features Page** - High-impact MoveOS feature showcase
- **Dynamic Stats** - Live Active Users and Device Count with count-up animations
- **Download Center** - Optimized device and ROM selection
- **Screenshots Gallery** - Premium glassmorphism lightbox
- **Team Page** - Developer profiles with role badges

### Admin Dashboard
- **Device Management** - CRUD operations for devices
- **ROM Management** - Version control and changelog
- **Team Management** - Member profiles and roles
- **Analytics Dashboard** - Download statistics and insights
- **Native Mobile Experience** - Bottom Dock & blurred overlays
- **Real Activity Logs** - Live system monitoring from database
- **Revalidation Engine** - Instant data sync between Admin & Public
- **FAQ Management** - Dynamic content management
- **Contact Forms** - View and manage submissions
- **Screenshots** - Gallery content management
- **Social Links** - Dynamic social media links
- **System Settings** - Site configuration

📖 **[Full Feature Documentation](FEATURES_EN.md)** | **[Dokumentasi Fitur](FEATURES_ID.md)** | **[الميزات الكاملة](FEATURES_AR.md)**

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router with Server Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icons
- **Radix UI** - Headless UI components

### Backend
- **Next.js API Routes** - RESTful API
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Relational database
- **Session Auth** - Secure authentication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sleep-bugy/ProjectMove-website.git
cd ProjectMove-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/projectmove"
```

4. **Set up the database:**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
ProjectMove/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   └── ...           # Public pages
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and configs
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── schema.sql            # SQL schema with sample data
```

## 📊 Database Setup

1. Create PostgreSQL database (Neon/Supabase recommended)
2. Run the schema (includes analytics setup with indexes):
   ```bash
   psql -U your_user -d your_database -f schema.sql
   ```
3. Generate Prisma Client:

## 🗄️ Database Schema

### Core Tables
- **Device** - Supported devices
- **Rom** - ROM versions and clusters
- **Download** - Download tracking
- **TeamMember** - Team profiles
- **Faq** - Frequently asked questions
- **ContactForm** - User submissions
- **Screenshot** - Gallery images
- **SocialLink** - Community links
- **SiteConfig** - Site settings

## 📡 API Endpoints

### Public APIs
- `GET /api/faq` - Get all FAQs
- `GET /api/screenshots` - Get gallery screenshots
- `GET /api/social` - Get active social links
- `GET /api/downloads` - Get ROM downloads
- `POST /api/contact` - Submit contact form

### Admin APIs
All admin APIs require authentication:
- `/api/admin/devices` - Device CRUD
- `/api/admin/roms` - ROM management
- `/api/admin/team` - Team management
- `/api/admin/faq` - FAQ management
- `/api/admin/contact` - View submissions
- `/api/admin/screenshots` - Gallery management
- `/api/admin/social` - Social links management

## 🎨 Design System

- **Theme:** "Deep Noir & Violet" Premium aesthetic
- **Visuals:** High-clarity glassmorphism & backdrop-blur
- **Animations:** Organic Starfield & Mesh backgrounds
- **Mobile First:** Native app-style Bottom Dock navigation

## 🔒 Admin Access

Access the admin dashboard at `/admin`:
- Device & ROM management
- Content management (FAQ, Gallery, Social)
- Team member profiles
- Contact form submissions
- System settings

## 📱 Community

Join our community channels:
- **Telegram Updates:** [https://t.me/xMoveOS](https://t.me/xMoveOS)
- **Group Discussion:** [https://t.me/MoveOSDiscussion](https://t.me/MoveOSDiscussion)
- **Cloud Storage:** [https://t.me/MoveOSCloud](https://t.me/MoveOSCloud)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables
```env
DATABASE_URL="your-postgresql-url"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Credits

**Website Development:**
- **Mohammad Adi** - [@sleep-bugy](https://github.com/sleep-bugy)
  - Full-stack development
  - UI/UX design implementation
  - Database architecture
  - Admin dashboard

**MoveOS Project:**
- Project Move Team

## 💖 Support

If you find this project helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs via GitHub Issues
- 💡 Suggesting features
- 🤝 Contributing to the code

## 📊 Stats

- **30+** Pages and components
- **8** Admin management interfaces
- **15+** API endpoints
- **9** Database models
- **~10,000+** Lines of code

---

Made with ❤️ by [Mohammad Adi](https://github.com/sleep-bugy) | Project Move Team
