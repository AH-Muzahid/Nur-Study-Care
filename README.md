# Nur Study Care - Coaching Center Management System

A full-stack web application for managing coaching centers with student enrollment, course management, payment processing, and administrative features.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **Tailwind CSS** + **shadcn/ui** (Component Library)
- **next-themes** (Dark Mode Support)
- **TanStack Query** (Server State & Caching)
- **React Hook Form** + **Zod** (Form Validation)

### Backend & Authentication
- **Next.js API Routes** (RESTful API)
- **NextAuth v5** (Authentication & OAuth)
- **MongoDB** + **Mongoose** (Database & ODM)
- **MongoDB Adapter** (NextAuth session storage)
- **Redis/Upstash** (Optional - for caching)

### DevOps & Tools
- **Vercel** (Deployment Ready)
- **MongoDB Atlas** (Database - Connected)
- **Google OAuth** (Social Login - Configured)
- **Resend** (Email Provider - For password reset)

---

## ✨ Current Implementation Status

### ✅ **COMPLETED - Authentication System (100%)**

#### 🔐 NextAuth v5 Integration
- ✅ Credentials Provider (Email/Password login)
- ✅ Google OAuth Provider (Social login)
- ✅ Email Provider (Magic links for password reset)
- ✅ MongoDB Adapter (Session & user storage)
- ✅ JWT Strategy (7 days session)
- ✅ Role-based callbacks (ADMIN/TEACHER/STUDENT)
- ✅ Edge runtime compatible middleware
- ✅ Custom User model integration with OAuth

#### 🎨 Auth Components
- ✅ LoginForm (with forgot password link)
- ✅ RegisterForm (with validation)
- ✅ Forgot Password Page (email magic link)
- ✅ Social Login Buttons (Google)
- ✅ Auth Layouts (separate from main site)

#### 🛡️ Security & Middleware
- ✅ Route protection (middleware)
- ✅ Role-based access control
- ✅ Session management
- ✅ Auto-redirect for unauthorized access
- ✅ Password hashing (bcryptjs - 12 rounds)

### ✅ **COMPLETED - UI/UX Design (100%)**

#### 🎨 Layout System
- ✅ Modern Floating Navbar (dark theme for landing, glass effect on scroll for logged-in)
- ✅ Theme Toggle Button (Light/Dark mode with next-themes)
- ✅ Professional Footer (4-column layout with social links)
- ✅ Separate Layouts (Main site vs Dashboard)
- ✅ Route Groups ((main), (auth) for layout separation)
- ✅ Responsive Design (Mobile-first)

#### 📱 Navigation
- ✅ Public: Home, All Courses, Instructors, About Us, Contact
- ✅ Logged In: Dashboard (role-based), + all public pages
- ✅ Theme toggle on all pages
- ✅ User dropdown (Profile, Settings, Logout)
- ✅ Notifications bell icon

#### 🖼️ Dashboard Layouts
- ✅ Student Dashboard (with sidebar, stats, courses, schedule)
- ✅ Teacher Dashboard (classes, tasks, students, performance)
- ✅ Admin Dashboard (revenue charts, approvals, enrollments, activity feed)
- ✅ DashboardLayout component (shared sidebar/footer)

### ✅ **COMPLETED - Database Models (100%)**

#### 📦 Mongoose Models
- ✅ User Model (role-based, OAuth fields, email verification)
- ✅ Student Model (auto-generated ID, guardian details)
- ✅ Teacher Model (qualifications, salary, subjects)
- ✅ Course Model (batches, scheduling, capacity)
- ✅ Enrollment Model (fee tracking, attendance, grades)
- ✅ Payment Model (bKash/Nagad/Bank/Cash support)
- ✅ Notice Model (target audience, publish dates)

### ✅ **COMPLETED - API Routes (Partial)**

#### 🟢 Implemented Routes
- ✅ `/api/auth/[...nextauth]` - NextAuth handler
- ✅ `/api/auth/register` - User registration with Zod validation
- ✅ Analytics routes (overview, revenue) - ready
- ✅ All CRUD route files created (courses, students, teachers, etc.)

#### 🟡 Placeholder Routes (Need Full Implementation)
- ⚠️ `/api/students` - CRUD operations
- ⚠️ `/api/teachers` - CRUD operations
- ⚠️ `/api/courses` - CRUD + enrollment
- ⚠️ `/api/enrollments` - Manage enrollments
- ⚠️ `/api/payments` - Process payments
- ⚠️ `/api/notices` - CRUD operations

### ⚠️ **IN PROGRESS - Feature Implementation (40%)**

#### 🟡 Needs Implementation
- ❌ Connect dashboard components to real APIs
- ❌ Replace mock data with TanStack Query fetches
- ❌ Payment gateway integration (bKash/Nagad)
- ❌ File upload (Cloudinary for avatars/documents)
- ❌ Email notifications (Resend integration)
- ❌ Student courses page functional enrollment
- ❌ Profile management (view/edit)
- ❌ Schedule/Calendar views
- ❌ Real-time notifications
- ❌ Search & filters functionality

### 📚 **Code Documentation**
- ✅ README.md with current status
- ✅ Inline comments in all services
- ✅ JSDoc for utility functions
- ⚠️ API documentation (need OpenAPI/Swagger)
- ⚠️ Testing guide

---

## 🎯 **Overall Progress Summary**

| Category | Status | Progress |
|----------|--------|----------|
| **Authentication System** | ✅ Complete | **100%** |
| **Database Models** | ✅ Complete | **100%** |
| **UI/UX Design** | ✅ Complete | **100%** |
| **Layout System** | ✅ Complete | **100%** |
| **Theme Support** | ✅ Complete | **100%** |
| Services & Repositories | ✅ Complete | 100% |
| shadcn/ui Components | ✅ Complete | 100% |
| **API Routes** | ⚠️ Partial | **30%** |
| **Dashboard Integration** | ⚠️ Mock Data | **40%** |
| **Payment Gateway** | ❌ Not Started | **0%** |
| **File Upload** | ❌ Not Started | **0%** |
| **Email Notifications** | ⚠️ Configured | **30%** |
| **Testing** | ❌ Not Started | **0%** |

**Overall Project Completion: ~75%**

---

## 🚀 **Next Immediate Steps**

### **Phase 2A - Testing & Validation (Current Priority)**

1. ✅ ~~Setup NextAuth v5 with MongoDB~~
2. ✅ ~~Configure Google OAuth~~
3. ✅ ~~Setup email provider (Resend)~~
4. **Test Authentication Flows** (Next)
   - ❌ Register → Email verification → Login
   - ❌ Login with credentials → Dashboard redirect
   - ❌ Forgot password → Email magic link → Reset
   - ❌ Google OAuth → Auto-create student account
   - ❌ Logout → Session cleared
   - ❌ Middleware role protection

5. **Google OAuth Console Setup**
   - ❌ Add redirect URI: `http://localhost:3000/api/auth/callback/google`
   - ❌ Add production URI: `https://yourdomain.com/api/auth/callback/google`

### **Phase 2B - Feature Completion**

6. **Connect Dashboards to Real APIs**
   - ❌ Replace mock data with TanStack Query
   - ❌ Implement loading skeletons
   - ❌ Add error boundaries
   - ❌ Optimistic updates

7. **Payment Management UI**
   - ❌ Payment form with method selection
   - ❌ Payment history table
   - ❌ Transaction status badges
   - ❌ bKash/Nagad gateway integration

8. **Profile Management**
   - ❌ View profile page
   - ❌ Edit profile form
   - ❌ Avatar upload (Cloudinary)
   - ❌ Change password

9. **Schedule/Calendar Views**
   - ❌ Weekly calendar component
   - ❌ Class schedule display
   - ❌ Time slots & room numbers

10. **Public Pages Content (Completed!)**
    - ✅ **Home Page** (Premium Redesign + MagicUI)
    - ✅ **About Us page**
    - ✅ **Instructors listing** (Spotlight Layout)
    - ✅ **Course catalog**
    - ✅ **Contact form**

### **Phase 2C - Production Readiness**

11. **API Implementation**
    - ❌ Complete all CRUD endpoints
    - ❌ Add pagination & filters
    - ❌ Implement search functionality
    - ❌ Add rate limiting

12. **Testing & QA**
    - ❌ Unit tests (Jest)
    - ❌ Integration tests
    - ❌ E2E tests (Playwright)
    - ❌ API testing (Postman/Thunder Client)

13. **Performance Optimization**
    - ❌ Image optimization
    - ❌ Code splitting
    - ❌ Database indexing
    - ❌ Redis caching layer

14. **Deployment**
    - ❌ Vercel deployment
    - ❌ MongoDB Atlas production config
    - ❌ Environment variables setup
    - ❌ Domain configuration

---

## 📁 Project Structure

```
nur-study-care/
├── src/
│   ├── app/                           # Next.js 15 App Router
│   │   ├── (main)/                    # ✅ Public pages with Header/Footer
│   │   │   ├── layout.jsx             # Header + Footer wrapper
│   │   │   └── page.js                # Homepage
│   │   ├── (auth)/                    # ✅ Auth pages (no header/footer)
│   │   │   ├── login/page.jsx
│   │   │   ├── register/page.jsx
│   │   │   └── layout.jsx
│   │   ├── student/                   # ✅ Student dashboard
│   │   │   ├── dashboard/page.jsx
│   │   │   ├── courses/page.jsx
│   │   │   └── layout.jsx             # DashboardLayout wrapper
│   │   ├── teacher/                   # ✅ Teacher dashboard
│   │   │   ├── dashboard/page.jsx
│   │   │   └── layout.jsx
│   │   ├── admin/                     # ✅ Admin dashboard
│   │   │   ├── dashboard/page.jsx
│   │   │   └── layout.jsx
│   │   ├── api/                       # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.js  # ✅ NextAuth handler
│   │   │   │   └── register/route.js       # ✅ Registration endpoint
│   │   │   ├── students/route.js      # ⚠️ Placeholder
│   │   │   ├── teachers/route.js      # ⚠️ Placeholder
│   │   │   ├── courses/route.js       # ⚠️ Placeholder
│   │   │   ├── enrollments/route.js   # ⚠️ Placeholder
│   │   │   ├── payments/route.js      # ⚠️ Placeholder
│   │   │   ├── notices/route.js       # ⚠️ Placeholder
│   │   │   └── analytics/             # ⚠️ Placeholder
│   │   │       ├── overview/route.js
│   │   │       └── revenue/route.js
│   │   ├── unauthorized/page.jsx      # ✅ Wrong role redirect page
│   │   ├── layout.js                  # ✅ Root layout (Providers only)
│   │   ├── providers.jsx              # ✅ ThemeProvider + SessionProvider
│   │   └── globals.css
│   │
│   ├── components/                    # React Components
│   │   ├── auth/                      # ✅ Auth components
│   │   │   ├── LoginForm.jsx          # NextAuth credentials
│   │   │   ├── RegisterForm.jsx       # With validation
│   │   │   └── SocialLoginButtons.jsx # Google OAuth
│   │   ├── layout/                    # ✅ Layout components
│   │   │   ├── Header.jsx             # Dark navbar + theme toggle
│   │   │   ├── Footer.jsx             # 4-column modern footer
│   │   │   ├── DashboardLayout.jsx    # Sidebar + content
│   │   │   └── Sidebar.jsx
│   │   ├── dashboard/                 # ✅ Dashboard widgets
│   │   │   ├── StatCard.jsx
│   │   │   ├── ChartCard.jsx
│   │   │   └── ActivityFeed.jsx
│   │   ├── student/                   # ✅ Student components
│   │   ├── teacher/                   # ✅ Teacher components
│   │   ├── course/                    # ✅ Course components
│   │   ├── notice/                    # ✅ Notice components
│   │   ├── payment/                   # ⚠️ Need implementation
│   │   └── ui/                        # ✅ shadcn/ui components (15+)
│   │
│   ├── lib/                           # Utilities & Services
│   │   ├── auth.js                    # ✅ NextAuth v5 config
│   │   ├── mongoose.js                # ✅ MongoDB connection
│   │   ├── redis.js                   # ⚠️ Optional caching
│   │   ├── utils.js                   # ✅ Helpers
│   │   ├── validations.js             # ✅ Zod schemas
│   │   └── payments/
│   │       └── mock-gateway.js        # ⚠️ Mock payment
│   │
│   ├── auth.config.js                 # ✅ NextAuth edge runtime config
│   ├── middleware.js                  # ✅ Route protection (edge runtime)
│   │
│   ├── models/                        # ✅ Mongoose Models (100%)
│   │   ├── User.js                    # Role-based, OAuth fields
│   │   ├── Student.js                 # Auto ID, guardian info
│   │   ├── Teacher.js                 # Qualifications, salary
│   │   ├── Course.js                  # Batches, scheduling
│   │   ├── Enrollment.js              # Fee tracking, attendance
│   │   ├── Payment.js                 # Multi-method support
│   │   └── Notice.js                  # Target audience
│   │
│   ├── repositories/                  # ✅ Data Access Layer (100%)
│   │   ├── studentRepository.js
│   │   ├── teacherRepository.js
│   │   ├── courseRepository.js
│   │   ├── enrollmentRepository.js
│   │   ├── paymentRepository.js
│   │   └── noticeRepository.js
│   │
│   ├── services/                      # ✅ Business Logic (100%)
│   │   ├── studentService.js          # CRUD + auto ID
│   │   ├── teacherService.js          # CRUD operations
│   │   ├── courseService.js           # Batch management
│   │   ├── enrollmentService.js       # Atomic transactions
│   │   ├── paymentService.js          # Mock gateway
│   │   ├── noticeService.js           # Filtering
│   │   └── analyticsService.js        # Aggregations
│   │
│   ├── store/                         # ⚠️ Zustand (optional, not primary)
│   │   └── authStore.js               # Replaced by NextAuth sessions
│   │
│   ├── hooks/                         # Custom React Hooks
│   │   └── useAuth.js                 # ⚠️ Deprecated (use useSession)
│   │
│   └── constants/                     # ✅ App constants
│       ├── config.js                  # App settings
│       ├── roles.js                   # ADMIN/TEACHER/STUDENT
│       └── permissions.js             # Role permissions
│
├── public/                            # Static assets
│   ├── images/
│   └── fonts/
│
├── .env.local                         # ✅ Environment variables
├── next.config.mjs                    # ✅ Next.js config
├── tailwind.config.js                 # ✅ Tailwind + shadcn
├── components.json                    # ✅ shadcn/ui config
├── package.json                       # Dependencies
├── README.md                          # This file
└── TESTING.md                         # ⚠️ Testing docs
```

### 🗑️ **Deleted Files (Cleaned Up)**

The following files were removed during NextAuth migration:

```
❌ src/lib/auth/jwt-verify.js              # Custom JWT verification
❌ src/lib/auth/secure-jwt-service.js      # JWT generation/refresh
❌ src/lib/auth/social-auth-service.js     # OAuth custom logic
❌ src/services/authService.js             # Custom auth service
❌ src/app/api/auth/login/route.js         # Replaced by NextAuth
❌ src/app/api/auth/logout/route.js        # Replaced by NextAuth
❌ src/app/api/auth/refresh/route.js       # Replaced by NextAuth
❌ src/app/api/auth/google/                # Replaced by NextAuth OAuth
❌ src/app/api/auth/facebook/              # Removed (not using yet)
```

**Total Lines Removed:** ~2000+ lines of custom JWT code

│   │   │   │   └── students/page.js
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/page.js
│   │   │   │   ├── students/page.js
│   │   │   │   ├── teachers/page.js
│   │   │   │   ├── courses/page.js
│   │   │   │   ├── payments/page.js
│   │   │   │   └── notices/page.js
│   │   │   └── layout.js
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/route.js
│   │   │   │   ├── register/route.js
│   │   │   │   ├── refresh/route.js
│   │   │   │   ├── logout/route.js
│   │   │   │   ├── google/
│   │   │   │   │   ├── route.js
│   │   │   │   │   └── callback/route.js
│   │   │   │   └── facebook/
│   │   │   │       ├── route.js
│   │   │   │       └── callback/route.js
│   │   │   ├── students/
│   │   │   │   ├── route.js
│   │   │   │   └── [id]/route.js
│   │   │   ├── teachers/
│   │   │   │   ├── route.js
│   │   │   │   └── [id]/route.js
│   │   │   ├── courses/
│   │   │   │   ├── route.js
│   │   │   │   ├── [id]/route.js
│   │   │   │   └── [id]/enroll/route.js
│   │   │   ├── enrollments/
│   │   │   │   ├── route.js
│   │   │   │   └── [id]/route.js
│   │   │   ├── payments/
│   │   │   │   ├── route.js
│   │   │   │   ├── create/route.js
│   │   │   │   └── history/route.js
│   │   │   ├── notices/
│   │   │   │   ├── route.js
│   │   │   │   └── [id]/route.js
│   │   │   ├── schedule/route.js
│   │   │   └── analytics/
│   │   │       ├── revenue/route.js
│   │   │       └── enrollment/route.js
│   │   ├── providers.js              # React Query Provider
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── error.js
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── SocialLoginButtons.jsx
│   │   ├── student/
│   │   │   ├── StudentList.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   └── StudentForm.jsx
│   │   ├── teacher/
│   │   ├── course/
│   │   │   ├── CourseList.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseForm.jsx
│   │   │   └── BatchSchedule.jsx
│   │   ├── payment/
│   │   │   ├── PaymentForm.jsx
│   │   │   └── PaymentHistory.jsx
│   │   ├── schedule/
│   │   │   ├── WeeklyCalendar.jsx
│   │   │   └── ClassCard.jsx
│   │   ├── notice/
│   │   │   ├── NoticeList.jsx
│   │   │   └── NoticeCard.jsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   └── EnrollmentChart.jsx
│   │   └── shared/
│   ├── lib/
│   │   ├── mongoose.js               # MongoDB connection
│   │   ├── redis.js                  # Redis connection
│   │   ├── cloudinary.js             # Cloudinary setup
│   │   ├── logger.js                 # Pino logger
│   │   ├── utils.js                  # Utility functions
│   │   ├── validations.js            # Zod schemas
│   │   └── auth/
│   │       ├── secure-jwt-service.js # JWT logic
│   │       ├── social-auth-service.js # OAuth logic
│   │       └── password-service.js   # Password utilities
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Payment.js
│   │   └── Notice.js
│   ├── services/                     # Business logic layer
│   │   ├── authService.js
│   │   ├── studentService.js
│   │   ├── teacherService.js
│   │   ├── courseService.js
│   │   ├── enrollmentService.js
│   │   ├── paymentService.js
│   │   ├── noticeService.js
│   │   ├── scheduleService.js
│   │   └── analyticsService.js
│   ├── repositories/                 # Data access layer
│   │   ├── studentRepository.js
│   │   ├── teacherRepository.js
│   │   ├── courseRepository.js
│   │   ├── enrollmentRepository.js
│   │   ├── paymentRepository.js
│   │   └── noticeRepository.js
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCourses.js
│   │   ├── useEnrollments.js
│   │   ├── usePayments.js
│   │   └── useNotices.js
│   ├── store/                        # Zustand stores
│   │   ├── authStore.js
---

## 🔧 Architecture & Key Features


#### Edge Runtime Compatible Pattern

The project uses NextAuth v5's recommended pattern for edge runtime compatibility:

**File: `src/auth.config.js`** (Lightweight config for middleware)
```javascript
export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/student') || 
                            nextUrl.pathname.startsWith('/teacher') || 
                            nextUrl.pathname.startsWith('/admin')
      
      // Role-based access control
      if (isOnDashboard) {
        if (!isLoggedIn) return false // Redirect to login
        
        const userRole = auth.user.role
        const path = nextUrl.pathname
        
        // Check role permissions
        if (path.startsWith('/admin') && userRole !== 'ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl))
        }
        // ... more checks
      }
      
      return true
    },
  },
  providers: [], // Populated in auth.js
}
```

**File: `src/lib/auth.js`** (Full config with Node.js operations)
```javascript
import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Spread lightweight config
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  secret: process.env.JWT_SECRET,
  
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Dynamic imports to avoid edge runtime issues
        const { default: User } = await import('@/models/User')
        const { default: bcrypt } = await import('bcryptjs')
        const { default: connectDB } = await import('@/lib/mongoose')
        
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        // ... validation
        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // Create OAuth users in MongoDB
      if (account?.provider === 'google') {
        const { default: User } = await import('@/models/User')
        const { default: connectDB } = await import('@/lib/mongoose')
        
        await connectDB()
        const existingUser = await User.findOne({ email: user.email })
        
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
            phone: '01700000000', // Default phone
            role: 'STUDENT',
            isActive: true,
            isEmailVerified: true,
          })
        }
      }
      return true
    },
    
    async jwt({ token, user }) {
      // Add custom fields to JWT
      if (user) {
        token.id = user.id
        token.role = user.role
        token.avatar = user.avatar
      }
      return token
    },
    
    async session({ session, token }) {
      // Add custom fields to session
      session.user.id = token.id
      session.user.role = token.role
      session.user.avatar = token.avatar
      return session
    },
  },
})
```

**File: `src/middleware.js`** (Edge runtime)
```javascript
import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*', '/admin/:path*'],
}
```

### **Layout Architecture**

#### Route Groups for Separation

```
app/
├── layout.js                # Root: ThemeProvider + SessionProvider
├── (main)/                  # Public pages
│   ├── layout.jsx          # Header + Footer
│   └── page.js             # Homepage
├── (auth)/                  # Auth pages
│   ├── layout.jsx          # Minimal layout
│   ├── login/page.jsx
│   └── register/page.jsx
├── student/                 # Dashboard
│   ├── layout.jsx          # DashboardLayout only
│   └── dashboard/page.jsx
├── teacher/                 # Dashboard
│   └── layout.jsx          # DashboardLayout only
└── admin/                   # Dashboard
    └── layout.jsx          # DashboardLayout only
```

#### Why This Pattern?

- **Separation of Concerns**: Public pages get Header/Footer, dashboards get Sidebar
- **Performance**: Each layout loads only needed components
- **Maintainability**: Easy to update navigation independently

### **Theme Support**

#### next-themes Integration

// app/layout.js
import { ThemeProvider } from 'next-themes'

<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </body>
</html>
```
// components/layout/Header.jsx
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const Header = () => {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
```

#### Features

- ✅ System preference detection
- ✅ Persistent theme (localStorage)
- ✅ No flash of unstyled content
- ✅ Dark navbar for landing page
- ✅ Glass morphism effects

---

## 🛠️ Setup & Installation

### **Prerequisites**

- Node.js 18+ (LTS)
- MongoDB 6.0+ (Atlas or local)
- npm/yarn/pnpm

### **1. Clone Repository**

```bash
git clone <repository-url>
cd nur-study-care
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Setup**

Create `.env.local` file:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your-user:your-password@cluster0.xxxxx.mongodb.net/nur_study_care

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key  # Generate with: openssl rand -base64 32
JWT_SECRET=your-jwt-secret              # For password hashing

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (Resend SMTP)
EMAIL_SERVER_HOST=smtp.resend.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=resend
EMAIL_SERVER_PASSWORD=re_xxxxxxxxxxxx  # Your Resend API key
EMAIL_FROM=onboarding@resend.dev
```

### **4. Google OAuth Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret** to `.env.local`

### **5. Resend Email Setup**

1. Go to [Resend](https://resend.com/)
2. Sign up and verify your account
3. Get your **API Key** from dashboard
4. Add to `.env.local` as `EMAIL_SERVER_PASSWORD`

### **6. Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### **7. Test Authentication**

1. Register a new account at `/register`
2. Login at `/login`
3. Test Google OAuth
4. Test forgot password at `/forgot-password`

---

## 📋 Known Issues & Workarounds

### **1. Nodemailer Peer Dependency Warning**

**Issue:**
```
npm WARN nextauth@5.0.0-beta.30 requires a peer of nodemailer@^6.8.0 but v7.0.12 is installed
```

**Workaround:** 
- Non-breaking warning, ignore for now
- Resend SMTP works with nodemailer v7
- Will be fixed in NextAuth stable release

### **2. Google OAuth Redirect URI**

**Issue:** `Error: redirect_uri_mismatch`

**Fix:**
1. Go to Google Cloud Console
2. Add exact redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Wait 5 minutes for propagation

### **3. Mock Data in Dashboards**

**Status:** All dashboards use hardcoded mock data

**Next Step:** Connect to real API endpoints with TanStack Query

### **4. Email Verification Not Implemented**

**Status:** Users can login without email verification

**Next Step:** Implement email verification flow with NextAuth EmailProvider

---

## 🧪 Testing Guide

### **Manual Testing Checklist**

#### Authentication
   - Auto-generated teacherId
   - Qualifications array
   - Salary & bank details

4. **Course Model**
   - Auto-generated courseId
   - Embedded batches array
   - Schedule, capacity, fees
   - Text search indexes

5. **Enrollment Model**
   - Auto-generated enrollmentId
   - References to Student & Course
   - Fee tracking (total, paid, due)
   - Attendance & grades arrays

6. **Payment Model**
   - Auto-generated paymentId
   - References to Student & Enrollment
   - Payment method enum
   - Gateway response storage

7. **Notice Model**
   - Auto-generated noticeId
   - Target audience array
   - Publish/expiry dates
   - Viewed by tracking

---

### **Phase 1.3: Authentication System (Week 2)**

#### Step 7: Custom JWT Authentication
- Create `lib/auth/secure-jwt-service.js`
  - Password hashing (bcrypt 12 rounds)
  - Access token generation (15min expiry)
  - Refresh token generation (7 days expiry)
  - Token verification
  - Token blacklisting (Redis)
  - Rate limiting logic
  - Account lockout logic

#### Step 8: Auth API Routes
- `api/auth/register/route.js` - User registration
- `api/auth/login/route.js` - User login with rate limiting
- `api/auth/refresh/route.js` - Refresh access token
- `api/auth/logout/route.js` - Logout with token blacklist

#### Step 9: Social Login Integration
- Create `lib/auth/social-auth-service.js`
  - Google OAuth setup
  - Facebook OAuth setup
  - Find-or-create user logic


- [ ] Register new account → Redirect to login
- [ ] Login with credentials → Dashboard redirect (role-based)
- [ ] Logout → Session cleared
- [ ] Google OAuth → Auto-create student account
- [ ] Forgot password → Receive email with magic link
- [ ] Theme toggle → Persist across sessions

#### Role-Based Access

- [ ] STUDENT tries `/admin/dashboard` → Redirect to `/unauthorized`
- [ ] TEACHER tries `/student/dashboard` → Redirect to `/unauthorized`
- [ ] Unauthenticated user tries dashboard → Redirect to `/login`
- [ ] Middleware protects routes correctly

#### UI/UX

- [ ] Dark mode works on all pages
- [ ] Mobile responsive (navbar, dashboards, forms)
- [ ] Toast notifications display correctly
- [ ] Loading states show during auth
- [ ] Form validation displays errors

#### Dashboard Pages

- [ ] Student dashboard loads with mock data
- [ ] Teacher dashboard loads with mock data
- [ ] Admin dashboard loads with mock data
- [ ] Student courses page shows course cards
- [ ] All components render without errors

---

## 📦 Dependencies

### **Production**

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0-beta.30",
    "@auth/mongodb-adapter": "^3.7.4",
    "mongoose": "^8.0.0",
    "mongodb": "^6.0.0",
    "bcryptjs": "^2.4.3",
    "next-themes": "^0.4.4",
    "zod": "^3.22.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.0",
    "@tanstack/react-query": "^5.20.0",
    "sonner": "^1.4.0",
    "lucide-react": "^0.300.0",
    "@radix-ui/react-avatar": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "nodemailer": "^7.0.12",
    "resend": "^4.0.0"
  }
}
```

### **Development**

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub repository
   - Vercel auto-detects Next.js

3. **Environment Variables**
   - Add all `.env.local` variables in Vercel dashboard
   - Update `NEXTAUTH_URL` to production domain
   - Add production Google OAuth redirect URI

4. **MongoDB Atlas**
   - Whitelist Vercel IP: `0.0.0.0/0` (all IPs)
   - Or add specific Vercel regions

5. **Deploy**
   - Vercel auto-deploys on every push to main branch
   - Preview deployments for PRs

---

## 🤝 Contributing

### **Code Style**

- Use functional React components
- Follow Next.js App Router conventions
- Use Tailwind CSS utility classes
- Keep components small and focused
- Add JSDoc comments for complex functions

### **Commit Messages**

```
feat: Add student enrollment feature
fix: Fix authentication redirect loop
docs: Update README with setup instructions
refactor: Simplify payment service logic
style: Format code with Prettier
test: Add unit tests for authService
```

### **Branch Strategy**

- `main` - Production-ready code
- `develop` - Development branch
- `feature/feature-name` - Feature branches
- `fix/bug-description` - Bug fixes

---

## 📝 License

This project is for educational purposes.

---

## 👥 Team

**Project Lead:** Nur Study Care Development Team

---

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@nurstudycare.com (if applicable)

---

**Last Updated:** January 2025
**Current Version:** 0.6.0 (60% Complete)
**Next Milestone:** API Integration & Testing (Phase 2A)

#### Step 20: Payment UI Components
- `components/payment/PaymentForm.jsx` - Payment method selection
- `components/payment/PaymentHistory.jsx` - Transaction history table
- `app/(dashboard)/student/payments/page.js` - Student payments
- `app/(dashboard)/admin/payments/page.js` - Admin payment management

---

### **Phase 1.8: Schedule & Timetable (Week 4)**

#### Step 21: Schedule Service
- `services/scheduleService.js`
  - Generate weekly timetable from batches
  - Get student schedule
  - Get teacher schedule
  - Detect conflicts

#### Step 22: Schedule API Routes
- `api/schedule/route.js` - GET (fetch schedules)
- Query params: studentId, teacherId, date

#### Step 23: Schedule UI Components
- `components/schedule/WeeklyCalendar.jsx` - Calendar view
- `components/schedule/ClassCard.jsx` - Individual class card
- `app/(dashboard)/student/schedule/page.js` - Student schedule
- `app/(dashboard)/teacher/schedule/page.js` - Teacher schedule

---

### **Phase 1.9: Notice Board (Week 5)**

#### Step 24: Notice Service
- `services/noticeService.js`
  - Create notice with auto ID
  - Filter by target audience
  - Mark as viewed
  - Text search

#### Step 25: Notice API Routes
- `api/notices/route.js` - GET (list with filters), POST (create)
- `api/notices/[id]/route.js` - GET, PUT, DELETE
- Add text search endpoint

#### Step 26: Notice UI Components
- `components/notice/NoticeList.jsx` - Card grid with filters
- `components/notice/NoticeCard.jsx` - Individual notice
- `app/(dashboard)/admin/notices/page.js` - Admin notice management
- `app/(dashboard)/student/dashboard/page.js` - Show recent notices

---

### **Phase 1.10: Admin Dashboard & Analytics (Week 5)**

#### Step 27: Analytics Service
- `services/analyticsService.js`
  - MongoDB aggregation pipelines
  - Revenue reports (by month, method)
  - Enrollment statistics
  - Student performance analytics
  - Teacher statistics

#### Step 28: Analytics API Routes
- `api/analytics/revenue/route.js` - GET (revenue data)
- `api/analytics/enrollment/route.js` - GET (enrollment stats)
- Add date range filters

#### Step 29: Dashboard UI Components
- `components/dashboard/StatCard.jsx` - Metric card
- `components/dashboard/RevenueChart.jsx` - Line/bar chart
- `components/dashboard/EnrollmentChart.jsx` - Pie/doughnut chart
- `app/(dashboard)/admin/dashboard/page.js` - Admin dashboard
- `app/(dashboard)/teacher/dashboard/page.js` - Teacher dashboard

---

### **Phase 1.11: State Management & Data Fetching (Week 6)**

#### Step 30: Zustand Stores
- `store/authStore.js` - Auth state (user, isAuthenticated)
- `store/noticeStore.js` - Notices state
- `store/index.js` - Combined exports

#### Step 31: TanStack Query Setup
- `app/providers.js` - QueryClientProvider
- Configure default options (staleTime, cacheTime)

#### Step 32: Custom Hooks
- `hooks/useAuth.js` - Auth operations
- `hooks/useCourses.js` - Course queries & mutations
- `hooks/useEnrollments.js` - Enrollment operations
- `hooks/usePayments.js` - Payment operations
- `hooks/useNotices.js` - Notice operations
- Add optimistic updates for mutations

---

### **Phase 1.12: Security & Optimizations (Week 6)**

#### Step 33: Security Hardening
- Input validation with Zod (`lib/validations.js`)
- XSS protection with DOMPurify
- Rate limiting with Redis
- CSRF token generation
- API error handling wrapper (`lib/api-handler.js`)
- Error boundaries (`app/error.js`)
- Logging setup (`lib/logger.js`)

#### Step 34: Performance Optimizations
- MongoDB compound indexes
- API response caching (Cache-Control headers)
- Dynamic imports for heavy components
- Next.js Image optimization
- Code splitting with React.lazy

#### Step 35: File Upload Setup
- Cloudinary integration (`lib/cloudinary.js`)
- Upload API route (`api/upload/route.js`)
- Image upload component

---

### **Phase 1.13: Testing & Deployment (Week 7)**

#### Step 36: Environment Configuration
- Create `.env.example` with all variables
- Setup MongoDB Atlas cluster (M0 free tier)
- Setup Upstash Redis account
- Setup Cloudinary account
- Get Google OAuth credentials
- Get Facebook OAuth credentials

#### Step 37: Database Seeding
- Create seed script (`scripts/seed.js`)
- Add demo admin user
- Add sample courses
- Add sample students

#### Step 38: Deployment
- Connect GitHub repository to Vercel
- Configure environment variables in Vercel
- Add custom domain
- Test production build
- Monitor with Vercel Analytics

---

## 🔧 Environment Variables

Create `.env.local` file in root:

```env
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coaching_center?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# OAuth - Facebook
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/auth/facebook/callback

# Redis (Upstash)
REDIS_URL=redis://default:password@host:port
REDIS_TOKEN=your-redis-token

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Optional - for password reset)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com

# Payment Gateway (for future)
BKASH_APP_KEY=your-bkash-app-key
BKASH_APP_SECRET=your-bkash-app-secret
BKASH_USERNAME=your-bkash-username
BKASH_PASSWORD=your-bkash-password
BKASH_BASE_URL=https://checkout.sandbox.bka.sh

NAGAD_MERCHANT_ID=your-nagad-merchant-id
NAGAD_PUBLIC_KEY=your-nagad-public-key
NAGAD_PRIVATE_KEY=your-nagad-private-key
NAGAD_BASE_URL=http://sandbox.mynagad.com:10080
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd nur-study-care

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Seed the database (optional)
npm run seed

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Default Admin Credentials (after seeding)
```
Email: admin@nurstudycare.com
Password: Admin@123
```

---

## 📝 Development Workflow

### Create New Feature
```bash
# 1. Create model (if needed)
touch src/models/YourModel.js

# 2. Create repository
touch src/repositories/yourRepository.js

# 3. Create service
touch src/services/yourService.js

# 4. Create API route
touch src/app/api/your-route/route.js

# 5. Create UI components
touch src/components/your-feature/YourComponent.jsx

# 6. Create page
touch src/app/(dashboard)/your-page/page.js

# 7. Add to navigation/menu
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

---

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register          - Register new user
POST /api/auth/login             - Login with email/password
POST /api/auth/refresh           - Refresh access token
POST /api/auth/logout            - Logout and blacklist token
GET  /api/auth/google            - Initiate Google OAuth
GET  /api/auth/google/callback   - Google OAuth callback
GET  /api/auth/facebook          - Initiate Facebook OAuth
GET  /api/auth/facebook/callback - Facebook OAuth callback
```

### Student Endpoints
```
GET    /api/students             - List all students (Admin)
POST   /api/students             - Create student (Admin)
GET    /api/students/[id]        - Get student by ID
PUT    /api/students/[id]        - Update student (Admin)
DELETE /api/students/[id]        - Delete student (Admin)
```

### Course Endpoints
```
GET    /api/courses              - List all courses
POST   /api/courses              - Create course (Admin)
GET    /api/courses/[id]         - Get course by ID
PUT    /api/courses/[id]         - Update course (Admin)
DELETE /api/courses/[id]         - Delete course (Admin)
POST   /api/courses/[id]/enroll  - Enroll student
```

### Payment Endpoints
```
GET    /api/payments             - Get payment history
POST   /api/payments/create      - Process payment
GET    /api/payments/history     - Student payment history
```

### Notice Endpoints
```
GET    /api/notices              - List notices
POST   /api/notices              - Create notice (Admin)
GET    /api/notices/[id]         - Get notice by ID
PUT    /api/notices/[id]         - Update notice (Admin)
DELETE /api/notices/[id]         - Delete notice (Admin)
```

### Analytics Endpoints
```
GET    /api/analytics/revenue    - Revenue reports
GET    /api/analytics/enrollment - Enrollment statistics
```

---

## 🧪 Testing

```bash
# Run tests (to be setup)
npm run test

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 🚢 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables in Vercel
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

---

## 🤝 Ownership Transfer Process

### Step 1: Database Transfer
```bash
# Export MongoDB data
mongodump --uri="your_connection_string" --out=./backup

# Import to client's MongoDB
mongorestore --uri="client_connection_string" ./backup
```

### Step 2: Update Environment Variables
```bash
# Update .env.local with client's:
# - MongoDB URI
# - OAuth credentials
# - Redis URL
# - Cloudinary credentials
```

### Step 3: Transfer Vercel Project
1. Vercel Dashboard → Settings → Transfer Project
2. Enter client's email
3. Client accepts transfer

### Step 4: Transfer GitHub Repository
1. GitHub Repository → Settings → Transfer ownership
2. Enter client's username
3. Client accepts transfer

---

## 📞 Support & Maintenance

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB URI is correct
# Ensure IP is whitelisted in MongoDB Atlas
# Check network connectivity
```

**JWT Token Expired**
```bash
# Use refresh token endpoint to get new access token
# POST /api/auth/refresh
```

**Rate Limit Exceeded**
```bash
# Wait 15 minutes or contact admin
# Check Redis connection
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local` to git**
2. **Use strong JWT secrets** (min 32 characters)
3. **Enable 2FA for production accounts**
4. **Regular security audits**
5. **Keep dependencies updated**
6. **Monitor logs for suspicious activity**
7. **Backup database regularly**
8. **Use HTTPS in production**

---

## 📈 Roadmap (Phase 2)

- [ ] Advanced attendance system with biometric integration
- [ ] Assignment & exam management
- [ ] Live class integration (Zoom/Google Meet)
- [ ] Study materials library
- [ ] Chat system (student-teacher)
- [ ] SMS/Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics & reporting
- [ ] Certificate generation
- [ ] Parent portal
- [ ] Online exam proctoring
- [ ] AI-powered doubt solving

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

---

## 👨‍💻 Developer

Built with ❤️ for Nur Study Care

**Contact:** [Your Contact Information]

---

**Version:** 1.0.0  
**Last Updated:** January 22, 2026
