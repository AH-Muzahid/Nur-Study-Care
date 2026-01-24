# Featured Courses Feature - Implementation Summary

## Overview
Admin can now mark up to 3 courses as "featured" from the admin panel, and these featured courses will automatically appear on the homepage.

## Changes Made

### 1. Database Model Update
**File**: `src/models/Course.js`
- ✅ Added `featured` field (Boolean, default: false)
- Allows marking courses as featured for homepage display

### 2. Repository Layer
**File**: `src/repositories/courseRepository.js`
- ✅ `countFeatured()` - Count how many courses are currently featured
- ✅ `findFeatured()` - Get all featured active courses (max 3)

### 3. Service Layer
**File**: `src/services/courseService.js`
- ✅ `toggleFeatured(id)` - Toggle featured status with validation
  - Prevents more than 3 courses from being featured
  - Shows error if trying to feature a 4th course
- ✅ `getFeaturedCourses()` - Retrieve featured courses for display

### 4. API Endpoint
**File**: `src/app/api/courses/[id]/featured/route.js` (NEW)
- ✅ PATCH endpoint to toggle featured status
- ✅ Admin-only access (requires authentication)
- ✅ Error handling for max limit

### 5. Admin Interface
**File**: `src/app/admin/courses/page.jsx`
- ✅ Added "Featured" column in courses table
- ✅ Star icon button to toggle featured status
  - Yellow filled star = Featured
  - Gray empty star = Not featured
- ✅ Click to toggle featured on/off
- ✅ Toast notifications for success/error

### 6. Homepage Integration
**File**: `src/services/siteContentService.js`
- ✅ Modified `getSiteContent()` to fetch real featured courses
- ✅ Falls back to default mock data if no featured courses exist
- ✅ Uses database featured courses when available

## How It Works

### For Admin:
1. Go to **Admin > Courses**
2. See the "Featured" column with star icons
3. Click the star icon to mark/unmark as featured
4. Maximum 3 courses can be featured at once
5. If trying to feature a 4th course, you'll get an error message

### For Users:
1. Homepage automatically shows featured courses
2. Always shows up to 3 real courses from database
3. Falls back to mock data if no courses are featured
4. Featured courses must be ACTIVE status to appear

## Visual Indicators
- ⭐ **Yellow filled star** = Course is featured
- ☆ **Gray empty star** = Course is not featured

## Business Rules
- ✅ Maximum 3 courses can be featured
- ✅ Only ACTIVE courses appear on homepage
- ✅ Admin-only functionality
- ✅ Click star to toggle on/off
- ✅ Error message if limit exceeded

## Testing Steps
1. **Login as Admin**
2. **Go to Courses page** (`/admin/courses`)
3. **Click star icons** on 3 different courses
4. **Try clicking a 4th** - should show error
5. **Visit homepage** - should see those 3 featured courses
6. **Unmark one** - homepage updates automatically

## বাংলায় ব্যবহার নির্দেশিকা

### এডমিন এর জন্য:
1. **Admin > Courses** এ যান
2. যে course টি featured করতে চান, তার পাশে star আইকনে ক্লিক করুন
3. সর্বোচ্চ ৩টি course featured করতে পারবেন
4. ৪র্থ course featured করতে গেলে error দেখাবে
5. আবার star এ ক্লিক করলে unfeatured হবে

### কি পরিবর্তন হবে:
- Homepage এ featured courses section এ আপনার select করা ৩টি real course দেখাবে
- সব সময় database থেকে সর্বশেষ data আসবে
- Mock data আর দেখাবে না (যদি featured courses থাকে)
