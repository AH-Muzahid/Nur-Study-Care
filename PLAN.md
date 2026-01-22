# Nur Study Care - Coaching Center Management System

A full-stack web application for managing coaching centers with student enrollment, course management, payment processing, and administrative features.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **Tailwind CSS** + **shadcn/ui** (Component Library)
- **Zustand** (Client State Management)
- **TanStack Query** (Server State & Caching)
- **React Hook Form** + **Zod** (Form Validation)

### Backend
- **Next.js API Routes** (RESTful API)
- **MongoDB** + **Mongoose** (Database & ODM)
- **Custom JWT Auth** (Authentication)
- **OAuth 2.0** (Google & Facebook Social Login)
- **Redis** (Token Blacklist & Rate Limiting)

### DevOps & Tools
- **Vercel** (Deployment)
- **MongoDB Atlas** (Database Hosting)
- **Upstash Redis** (Redis Cloud)
- **Cloudinary** (Image Storage)
- **Pino** (Logging)

---

## ✨ Current Implementation Status (Phase 1)

### ✅ **COMPLETED - Backend Architecture (100%)**

#### 📦 Database Models
- ✅ User Model (with role enum, social auth, password hashing)
- ✅ Student Model (auto-generated ID, personal info, guardian details)
- ✅ Teacher Model (qualifications, salary, subjects)
- ✅ Course Model (batches, scheduling, capacity tracking)
- ✅ Enrollment Model (fee tracking, attendance, grades)
- ✅ Payment Model (transaction logging, multiple payment methods)
- ✅ Notice Model (target audience, publish dates, viewed tracking)

#### 🔧 Services & Repositories
- ✅ Auth Service (JWT generation, password hashing, social OAuth)
- ✅ Student Service (CRUD, auto ID generation)
- ✅ Teacher Service (CRUD operations)
- ✅ Course Service (batch management, enrollment)
- ✅ Enrollment Service (atomic transactions)
- ✅ Payment Service (mock gateway integration)
- ✅ Notice Service (filtering, text search)
- ✅ Analytics Service (aggregation pipelines)
- ✅ Complete Repository Layer (data access abstraction)

#### 🎨 **COMPLETED - Frontend UI (100%)**

#### 📱 Components
- ✅ Layout Components (Header, Sidebar, Footer, DashboardLayout)
- ✅ Auth Components (LoginForm, RegisterForm, SocialLoginButtons)
- ✅ Dashboard Pages (Admin, Teacher, Student dashboards)
- ✅ UI Library (shadcn/ui - 15 components integrated)
- ✅ Responsive Design (Mobile, Tablet, Desktop)

#### 🎣 Custom Hooks
- ✅ useAuth (login, register, logout, verify)
- ✅ useFetch (generic data fetching with loading/error states)
- ✅ usePagination (pagination logic)
- ✅ useRoleProtection (route protection)
- ✅ useFormSubmit (form submission handling)

#### 🛠️ Utilities & Helpers
- ✅ API Client (centralized fetch with error handling)
- ✅ Helper Functions (date formatting, currency, permissions)
- ✅ Validation Schemas (Zod schemas for all forms)
- ✅ Style Utilities (CSS class combinations)
- ✅ Constants (navigation, roles, statuses)

#### 📚 Documentation
- ✅ ARCHITECTURE.md (complete code documentation)
- ✅ README.md (project overview & setup guide)
- ✅ Inline code comments

### ⚠️ **IN PROGRESS - API Integration (0%)**

#### 🔴 Missing API Routes (Need Implementation)
- ❌ Auth Routes (/api/auth/login, /api/auth/register, /api/auth/logout)
- ❌ Student Routes (/api/students - CRUD operations)
- ❌ Teacher Routes (/api/teachers - CRUD operations)
- ❌ Course Routes (/api/courses - CRUD + enrollment)
- ❌ Payment Routes (/api/payments - process payments)
- ❌ Enrollment Routes (/api/enrollments - manage enrollments)
- ❌ Notice Routes (/api/notices - CRUD operations)
- ❌ Analytics Routes (/api/analytics/revenue, /api/analytics/overview)

**Note:** API route files exist but are empty placeholders. Backend services are ready but need API endpoint implementation.

### ⚠️ **PENDING - Integration & Testing (0%)**

#### 🔴 To Be Completed
- ❌ Connect frontend to backend APIs
- ❌ Test MongoDB connection in production
- ❌ Test Redis connection & caching
- ❌ Implement real authentication flow
- ❌ Test social login (Google OAuth)
- ❌ Database seeding script
- ❌ Error handling & logging
- ❌ Form validation in all components
- ❌ Loading states in dashboards
- ❌ Real-time data fetching

### 🎯 **Phase 1 Progress Summary**

| Category | Status | Progress |
|----------|--------|----------|
| Database Models | ✅ Complete | 100% |
| Services & Logic | ✅ Complete | 100% |
| UI Components | ✅ Complete | 100% |
| Custom Hooks | ✅ Complete | 100% |
| Utilities | ✅ Complete | 100% |
| Documentation | ✅ Complete | 100% |
| **API Routes** | ❌ Not Started | **0%** |
| **Integration** | ❌ Not Started | **0%** |
| **Testing** | ❌ Not Started | **0%** |

**Overall Phase 1 Completion: ~65%**

### 🚀 **Next Immediate Steps**

1. **Implement Authentication API** (Priority 1)
   - POST /api/auth/register
   - POST /api/auth/login
   - POST /api/auth/logout
   - GET /api/auth/google & callback

2. **Test Database Connection** (Priority 1)
   - Verify MongoDB connection
   - Test model operations
   - Seed initial data

3. **Implement Core CRUD APIs** (Priority 2)
   - Students API
   - Courses API
   - Enrollments API

4. **Connect Frontend to Backend** (Priority 3)
   - Update forms to call real APIs
   - Add loading states
   - Handle errors properly

---

## 📁 Folder Structure

```
nur-study-care/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth pages (login, register)
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   ├── register/
│   │   │   │   └── page.js
│   │   │   └── layout.js
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── student/
│   │   │   │   ├── dashboard/page.js
│   │   │   │   ├── courses/page.js
│   │   │   │   ├── payments/page.js
│   │   │   │   └── schedule/page.js
│   │   │   ├── teacher/
│   │   │   │   ├── dashboard/page.js
│   │   │   │   ├── classes/page.js
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
│   │   ├── noticeStore.js
│   │   └── index.js
│   ├── constants/                    # Constants & enums
│   │   ├── roles.js
│   │   ├── permissions.js
│   │   └── config.js
│   ├── middleware.js                 # Next.js middleware
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   └── documents/
├── scripts/
│   └── seed.js                       # Database seeding
├── .env.local                        # Environment variables
├── .env.example                      # Environment template
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
├── package.json
└── README.md
```

---

## 🛠️ Step-by-Step Implementation Plan

### **Phase 1.1: Project Setup & Foundation (Week 1)**

#### Step 1: Initialize Next.js Project
```bash
# Create Next.js app with latest version
npx create-next-app@latest nur-study-care

# Options:
# ✅ TypeScript? No (using JavaScript)
# ✅ ESLint? Yes
# ✅ Tailwind CSS? Yes
# ✅ src/ directory? Yes
# ✅ App Router? Yes
# ✅ import alias (@/*)? Yes
```

#### Step 2: Install Dependencies
```bash
# Core dependencies
npm install mongoose jsonwebtoken bcryptjs
npm install googleapis
npm install zod react-hook-form @hookform/resolvers
npm install zustand
npm install @tanstack/react-query
npm install date-fns
npm install redis
npm install pino pino-pretty

# UI & Styling
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label form table dialog dropdown-menu avatar badge calendar select textarea toast

# Optional
npm install recharts                    # Charts for dashboard
npm install dompurify isomorphic-dompurify  # XSS protection
npm install react-dropzone                  # File uploads
```

#### Step 3: Configure Project Files
- Create `jsconfig.json` with path aliases
- Setup `next.config.js` with image domains, security headers
- Configure `tailwind.config.js` with custom colors
- Create `.env.example` template

#### Step 4: Setup Folder Structure
- Create all folders as per structure above
- Create placeholder files for organization

---

### **Phase 1.2: Database & Models (Week 1)**

#### Step 5: MongoDB Connection Setup
- Create `lib/mongoose.js` with singleton pattern
- Handle connection pooling
- Add development/production environment handling

#### Step 6: Create Mongoose Models
Priority order:
1. **User Model** (base for all users)
   - Role enum (STUDENT, TEACHER, ADMIN)
   - Social auth fields (googleId, facebookId)
   - Password hashing middleware
   - Validation & indexes

2. **Student Model**
   - Reference to User
   - Auto-generated studentId
   - Personal & guardian info
   - Education details

3. **Teacher Model**
   - Reference to User
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

- Create OAuth routes:
  - `api/auth/google/route.js` - Redirect to Google
  - `api/auth/google/callback/route.js` - Handle callback
  - `api/auth/facebook/route.js` - Redirect to Facebook
  - `api/auth/facebook/callback/route.js` - Handle callback

#### Step 10: Authentication Middleware
- Create `middleware.js`
  - JWT verification
  - Role-based access control
  - CSRF protection
  - Route protection patterns

#### Step 11: Auth UI Components
- `components/auth/LoginForm.jsx` - Email/password login
- `components/auth/RegisterForm.jsx` - Registration form
- `components/auth/SocialLoginButtons.jsx` - Google/Facebook buttons
- `app/(auth)/login/page.js` - Login page
- `app/(auth)/register/page.js` - Register page

---

### **Phase 1.4: Core Services & Repositories (Week 2)**

#### Step 12: Repository Layer (Data Access)
- `repositories/studentRepository.js` - CRUD operations
- `repositories/courseRepository.js` - CRUD operations
- `repositories/enrollmentRepository.js` - CRUD operations
- `repositories/paymentRepository.js` - CRUD operations
- `repositories/noticeRepository.js` - CRUD operations

#### Step 13: Service Layer (Business Logic)
- `services/studentService.js`
  - Create student with auto ID
  - Update student profile
  - Get student with enrollments

- `services/courseService.js`
  - Create course with batches
  - Update batch capacity
  - Check batch availability

- `services/enrollmentService.js`
  - Enroll student (with transactions)
  - Update enrollment status
  - Track attendance & grades

- `services/paymentService.js`
  - Process payment (mock gateway)
  - Update enrollment paid amount
  - Generate payment history

---

### **Phase 1.5: Student Management (Week 3)**

#### Step 14: Student API Routes
- `api/students/route.js` - GET (list), POST (create)
- `api/students/[id]/route.js` - GET, PUT, DELETE
- Add role-based access control (Admin only for create/delete)

#### Step 15: Student UI Components
- `components/student/StudentList.jsx` - Table with pagination
- `components/student/StudentCard.jsx` - Profile card
- `components/student/StudentForm.jsx` - Create/edit form
- `app/(dashboard)/student/dashboard/page.js` - Student dashboard
- `app/(dashboard)/admin/students/page.js` - Admin student management

---

### **Phase 1.6: Course & Batch Management (Week 3)**

#### Step 16: Course API Routes
- `api/courses/route.js` - GET (list), POST (create)
- `api/courses/[id]/route.js` - GET, PUT, DELETE
- `api/courses/[id]/enroll/route.js` - POST (enroll student)
- Add capacity validation

#### Step 17: Course UI Components
- `components/course/CourseList.jsx` - Grid view with filters
- `components/course/CourseCard.jsx` - Course details card
- `components/course/CourseForm.jsx` - Create/edit form
- `components/course/BatchSchedule.jsx` - Schedule builder
- `app/(dashboard)/admin/courses/page.js` - Admin course management
- `app/(dashboard)/student/courses/page.js` - Student course browsing

---

### **Phase 1.7: Enrollment & Payment (Week 4)**

#### Step 18: Enrollment API Routes
- `api/enrollments/route.js` - GET (list), POST (create)
- `api/enrollments/[id]/route.js` - GET, PUT
- Implement Mongoose transactions for atomic operations

#### Step 19: Payment API Routes
- `api/payments/route.js` - GET (history)
- `api/payments/create/route.js` - POST (process payment)
- `api/payments/history/route.js` - GET (student payment history)
- Integrate mock payment gateway

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
