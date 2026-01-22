# Code Architecture Documentation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components (Header, Sidebar, Footer)
│   ├── shared/           # Shared/reusable components
│   └── ui/               # shadcn/ui components
├── constants/            # Application constants
│   ├── index.js          # General constants
│   ├── navigation.js     # Navigation items by role
│   ├── permissions.js    # Permission definitions
│   └── roles.js          # Role definitions
├── hooks/                # Custom React hooks
│   ├── useAuth.js        # Authentication operations
│   ├── useData.js        # Data fetching utilities
│   └── useRoleProtection.js  # Route protection
├── lib/                  # Utility libraries
│   ├── api-client.js     # API client wrapper
│   ├── helpers.js        # Helper functions
│   ├── schemas.js        # Zod validation schemas
│   └── styles.js         # CSS utility classes
├── models/               # Mongoose models
├── repositories/         # Data access layer
├── services/            # Business logic layer
└── store/               # Zustand state management
```

## 🎣 Custom Hooks

### useAuth()
Authentication operations hook.

```javascript
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
    const { user, isAuthenticated, login, register, logout, verify } = useAuth()
    
    // Login
    await login({ email, password })
    
    // Register
    await register({ name, email, phone, password })
    
    // Logout
    await logout()
}
```

### useFetch()
Generic data fetching hook with loading and error states.

```javascript
import { useFetch } from '@/hooks/useData'
import { courseAPI } from '@/lib/api-client'

function CoursesPage() {
    const { data, loading, error, refetch } = useFetch(
        () => courseAPI.getAll({ page: 1 }),
        {
            immediate: true,
            onSuccess: (data) => console.log('Loaded:', data),
            onError: (error) => console.error('Failed:', error)
        }
    )
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    
    return <div>{/* Render data */}</div>
}
```

### useRoleProtection()
Protect routes based on user roles.

```javascript
import { useRoleProtection } from '@/hooks/useRoleProtection'

function AdminPage() {
    // Only ADMIN can access
    useRoleProtection(['ADMIN'])
    
    return <div>Admin Dashboard</div>
}
```

### usePagination()
Manage paginated data.

```javascript
import { usePagination } from '@/hooks/useData'

function StudentsPage() {
    const {
        page,
        pageSize,
        total,
        totalPages,
        setTotal,
        nextPage,
        prevPage,
        changePageSize
    } = usePagination(1, 10)
    
    return (
        <div>
            <button onClick={prevPage}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={nextPage}>Next</button>
        </div>
    )
}
```

## 🔧 Utility Functions

### Helper Functions (lib/helpers.js)

```javascript
import {
    getInitials,
    getDashboardPath,
    formatCurrency,
    formatDate,
    formatTime,
    truncateText,
    getRelativeTime,
    hasPermission,
    isValidBDPhone,
} from '@/lib/helpers'

// Get user initials
const initials = getInitials('John Doe') // "JD"

// Get dashboard path by role
const path = getDashboardPath('ADMIN') // "/admin/dashboard"

// Format currency
const price = formatCurrency(2500) // "৳2,500"

// Format date
const date = formatDate(new Date()) // "Jan 15, 2024"

// Check permission
const canEdit = hasPermission('TEACHER', 'STUDENT') // true (teacher > student)

// Validate BD phone
const valid = isValidBDPhone('01712345678') // true
```

## 🌐 API Client (lib/api-client.js)

Centralized API client with pre-configured endpoints.

```javascript
import { authAPI, studentAPI, courseAPI, paymentAPI } from '@/lib/api-client'

// Authentication
await authAPI.login({ email, password })
await authAPI.register(userData)
await authAPI.logout()

// Students
const students = await studentAPI.getAll({ page: 1, limit: 10 })
const student = await studentAPI.getById(id)
const profile = await studentAPI.getMe()
await studentAPI.update(id, data)

// Courses
const courses = await courseAPI.getAll()
const course = await courseAPI.getById(id)
await courseAPI.create(courseData)
await courseAPI.enroll(courseId, studentData)

// Payments
const payments = await paymentAPI.getAll()
await paymentAPI.create(paymentData)
const history = await paymentAPI.getHistory()
```

## ✅ Validation Schemas (lib/schemas.js)

Reusable Zod validation schemas.

```javascript
import {
    loginSchema,
    registerSchema,
    courseSchema,
    paymentSchema,
    noticeSchema,
    validators,
} from '@/lib/schemas'

// Use in React Hook Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
})

// Individual validators
const emailSchema = validators.email
const passwordSchema = validators.password
const phoneSchema = validators.phone
```

## 🎨 Style Utilities (lib/styles.js)

Pre-defined CSS class combinations.

```javascript
import { styles, getStatusClass, getRoleColor } from '@/lib/styles'

// Use predefined styles
<button className={styles.button.primary}>Click Me</button>
<div className={styles.card.base}>Card Content</div>
<input className={styles.input.base} />

// Dynamic status badge
<span className={getStatusClass('ACTIVE')}>Active</span>

// Role badge color
<span className={getRoleColor('ADMIN')}>Admin</span>
```

## 📋 Constants

### Navigation (constants/navigation.js)

```javascript
import { getNavItems, STUDENT_NAV_ITEMS, TEACHER_NAV_ITEMS } from '@/constants/navigation'

// Get navigation items by role
const navItems = getNavItems(user.role)

// Render navigation
navItems.map(item => (
    <Link href={item.href} key={item.href}>
        <item.icon />
        {item.title}
    </Link>
))
```

### App Constants (constants/index.js)

```javascript
import {
    APP_NAME,
    ROLES,
    ENROLLMENT_STATUS,
    PAYMENT_METHODS,
    COURSE_LEVELS,
    ERROR_MESSAGES,
} from '@/constants'

// Use throughout app
<h1>{APP_NAME}</h1>

// Check status
if (enrollment.status === ENROLLMENT_STATUS.ACTIVE) { }

// Payment methods dropdown
PAYMENT_METHODS.map(method => <option value={method}>{method}</option>)
```

## 🏗️ Component Structure

### Layout Components

```javascript
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

// Use in page
export default function StudentDashboard() {
    return (
        <DashboardLayout>
            <h1>Dashboard Content</h1>
        </DashboardLayout>
    )
}
```

### Auth Components

```javascript
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons'

// Use in auth pages
<LoginForm />
<SocialLoginButtons />
```

## 🔐 Authentication Flow

1. **Login/Register**: Use `useAuth()` hook
2. **Store User**: Zustand store automatically updated
3. **Redirect**: Based on role using `getDashboardPath()`
4. **Route Protection**: `useRoleProtection()` in protected pages
5. **Logout**: Clear auth and redirect to login

## 📊 State Management

### Zustand Auth Store

```javascript
import { useAuthStore } from '@/store/authStore'

function Component() {
    const { user, isAuthenticated, setUser, logout } = useAuthStore()
    
    return (
        <div>
            {isAuthenticated && <p>Welcome, {user.name}!</p>}
        </div>
    )
}
```

## 🎯 Best Practices

1. **Always use hooks** instead of direct API calls
2. **Import from centralized locations**: `@/lib/api-client`, `@/lib/helpers`
3. **Use constants** instead of hardcoded strings
4. **Use validation schemas** for all forms
5. **Protect routes** with `useRoleProtection()`
6. **Handle errors** with try-catch and toast notifications
7. **Keep components small** and focused
8. **Extract reusable logic** into custom hooks

## 🚀 Quick Start Examples

### Create a New Page with Data Fetching

```javascript
'use client'

import { useFetch } from '@/hooks/useData'
import { useRoleProtection } from '@/hooks/useRoleProtection'
import { studentAPI } from '@/lib/api-client'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function StudentsPage() {
    useRoleProtection(['ADMIN', 'TEACHER'])
    
    const { data: students, loading, refetch } = useFetch(
        () => studentAPI.getAll({ page: 1 })
    )
    
    if (loading) return <DashboardLayout>Loading...</DashboardLayout>
    
    return (
        <DashboardLayout>
            <h1>Students</h1>
            {students?.map(student => (
                <div key={student._id}>{student.name}</div>
            ))}
        </DashboardLayout>
    )
}
```

### Create a Form Component

```javascript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { courseSchema } from '@/lib/schemas'
import { useFormSubmit } from '@/hooks/useData'
import { courseAPI } from '@/lib/api-client'

export function CreateCourseForm({ onSuccess }) {
    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: { title: '', description: '', fee: 0 }
    })
    
    const { submit, loading } = useFormSubmit(
        courseAPI.create,
        {
            successMessage: 'Course created!',
            onSuccess
        }
    )
    
    return (
        <form onSubmit={form.handleSubmit(submit)}>
            {/* Form fields */}
        </form>
    )
}
```

---

✨ **This architecture ensures clean, maintainable, and scalable code!**
