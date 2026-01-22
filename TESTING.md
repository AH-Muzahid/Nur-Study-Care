# Nur Study Care - Testing Guide

## 🚀 Development Server
```bash
npm run dev
```
Server runs at http://localhost:3000

## 📋 Test Checklist

### 1. Authentication Tests
- [ ] Register new user (Student/Teacher/Admin)
- [ ] Login with email/password
- [ ] Google OAuth login
- [ ] Facebook OAuth login
- [ ] Token refresh on page reload
- [ ] Logout functionality
- [ ] Session persistence

### 2. Role-Based Access Tests

**Admin:**
- [ ] Access `/admin/dashboard` - should see analytics
- [ ] Cannot access `/student/dashboard` - redirects to unauthorized
- [ ] Cannot access `/teacher/dashboard` - redirects to unauthorized
- [ ] Can create students/teachers/courses
- [ ] Can view all enrollments
- [ ] Can process payments

**Student:**
- [ ] Access `/student/dashboard` - sees enrolled courses
- [ ] Cannot access `/admin/dashboard` - redirects to unauthorized
- [ ] Can view own profile
- [ ] Can view own enrollments
- [ ] Can view own payments
- [ ] Can view notices

**Teacher:**
- [ ] Access `/teacher/dashboard` - sees assigned courses
- [ ] Cannot access `/admin/dashboard` - redirects to unauthorized
- [ ] Can view assigned courses
- [ ] Can view students in their courses
- [ ] Can create notices
- [ ] Can mark attendance/grades (when implemented)

### 3. API Endpoint Tests

**Students API:**
```bash
# List students (Admin/Teacher only)
GET /api/students?page=1&limit=10

# Get current student profile
GET /api/students/me

# Get specific student
GET /api/students/{id}

# Update student
PUT /api/students/{id}

# Delete student (soft delete)
DELETE /api/students/{id}
```

**Courses API:**
```bash
# List courses
GET /api/courses?page=1&limit=10

# Get course details
GET /api/courses/{id}

# Create course (Admin only)
POST /api/courses

# Update course (Admin only)
PUT /api/courses/{id}
```

**Enrollments API:**
```bash
# List enrollments
GET /api/enrollments?page=1&limit=10

# Create enrollment (Admin only)
POST /api/enrollments

# Get enrollment details
GET /api/enrollments/{id}

# Cancel enrollment (Admin only)
DELETE /api/enrollments/{id}?reason=Reason
```

**Payments API:**
```bash
# List payments
GET /api/payments?page=1&limit=10

# Process payment (Admin only)
POST /api/payments

# Get payment receipt
GET /api/payments/{id}
```

**Notices API:**
```bash
# List active notices
GET /api/notices?activeOnly=true

# Get notice details (auto marks as read)
GET /api/notices/{id}

# Create notice (Admin/Teacher)
POST /api/notices

# Update notice (Admin/Teacher)
PUT /api/notices/{id}
```

**Analytics API (Admin only):**
```bash
# Overview statistics
GET /api/analytics/overview

# Revenue analytics
GET /api/analytics/revenue?months=6
```

### 4. Database Operations Tests
- [ ] MongoDB connection established
- [ ] Auto-generated IDs work (STU-2026-0001, etc.)
- [ ] Mongoose validation working
- [ ] Indexes created properly
- [ ] Aggregation pipelines working

### 5. Security Tests
- [ ] JWT tokens generated correctly
- [ ] Token expiration working (15min for access token)
- [ ] Refresh token working (7 days)
- [ ] Token blacklisting on logout
- [ ] Password hashing (bcrypt)
- [ ] Rate limiting on login attempts
- [ ] Account lockout after 5 failed attempts
- [ ] RBAC preventing unauthorized access

### 6. Payment Gateway Tests
- [ ] Mock gateway processes payments
- [ ] 90% success rate simulation
- [ ] Transaction IDs generated
- [ ] Gateway responses stored
- [ ] Enrollment amounts updated
- [ ] Payment history recorded

### 7. UI/UX Tests
- [ ] Dashboard loads without errors
- [ ] Stats cards display correct data
- [ ] Forms have validation
- [ ] Toast notifications appear
- [ ] Loading states shown
- [ ] Responsive on mobile
- [ ] Navigation works correctly

## 🐛 Known Issues
1. **Middleware Edge Runtime Warning:** Resolved - authentication moved to API routes and layouts
2. **Missing OAuth Credentials:** Add Google/Facebook credentials to `.env.local` for social login
3. **Redis Connection:** Optional - falls back to in-memory cache

## 🔧 Quick Fixes

### MongoDB Not Connected
```bash
# Check MongoDB is running locally
mongod --version

# Or update .env.local with MongoDB Atlas URL
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nur-study-care
```

### Missing Environment Variables
Copy `.env.example` to `.env.local` and fill in:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
JWT_REFRESH_SECRET=another_secure_random_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### Generate Secure Secrets
```bash
# In Node.js REPL or terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📊 Sample Test Data

### Create Admin User
```javascript
// Via MongoDB or registration
{
  name: "Admin User",
  email: "admin@nurstudy.com",
  password: "Admin@123",
  role: "ADMIN",
  phone: "01712345678"
}
```

### Create Test Student
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "Student@123",
  role: "STUDENT",
  phone: "01812345678"
}
```

### Create Test Course
```javascript
{
  title: "SSC Mathematics Batch 2026",
  subject: "Mathematics",
  level: "SSC",
  duration: 6,
  fee: 5000,
  batches: [{
    batchName: "Morning Batch",
    capacity: 30,
    startDate: "2026-02-01",
    endDate: "2026-07-31",
    schedule: [
      { day: "SUNDAY", startTime: "09:00", endTime: "11:00" },
      { day: "TUESDAY", startTime: "09:00", endTime: "11:00" }
    ]
  }]
}
```

## 🎯 Next Steps
1. Test all authentication flows
2. Create test data via API
3. Test dashboard analytics
4. Test payment processing
5. Check error handling
6. Verify RBAC working correctly
7. Test on different browsers
8. Mobile responsive testing

## 📞 Support
- Check console for errors
- Review browser network tab
- Check MongoDB logs
- Review server terminal output
