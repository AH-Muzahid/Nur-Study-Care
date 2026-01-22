/**
 * CRUD API Testing Script
 * Tests Students, Teachers, Courses, Enrollments, Payments
 * Run with: node scripts/test-crud-api.js
 */

const BASE_URL = 'http://localhost:3000'

let authToken = ''
let adminUser = null

// Helper function
async function makeRequest(url, options = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        }

        // Add cookie if authToken exists
        if (authToken) {
            headers['Cookie'] = authToken
        }

        const response = await fetch(url, {
            ...options,
            headers,
        })

        const data = await response.json()

        // Extract and store auth cookie from response
        const setCookie = response.headers.get('set-cookie')
        if (setCookie && setCookie.includes('auth_token=')) {
            const match = setCookie.match(/auth_token=([^;]+)/)
            if (match) {
                authToken = `auth_token=${match[1]}`
            }
        }

        return { status: response.status, data, response }
    } catch (error) {
        return { error: error.message }
    }
}

// Login as admin
async function loginAsAdmin() {
    console.log('\n🔐 Logging in as Admin...')

    // First register an admin user
    const adminData = {
        name: 'Admin User',
        email: `admin.${Date.now()}@example.com`,
        password: 'Admin@123',
        phone: '01712345678',
        role: 'ADMIN',
    }

    const registerResult = await makeRequest(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(adminData),
    })

    console.log('Register response:', registerResult)

    if (registerResult.status !== 201) {
        console.log('❌ Admin registration failed:', registerResult.data)
        return false
    }

    // Login
    const loginResult = await makeRequest(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: adminData.email,
            password: adminData.password,
        }),
    })

    if (loginResult.status !== 200) {
        console.log('❌ Admin login failed:', loginResult.data)
        return false
    }

    adminUser = loginResult.data.user
    console.log('✅ Logged in as Admin:', adminUser.email)
    return true
}

// Test Students API
async function testStudentsAPI() {
    console.log('\n📚 Testing Students API...')

    // Create student user first
    const studentData = {
        name: 'Test Student',
        email: `student.${Date.now()}@example.com`,
        password: 'Student@123',
        phone: '01712345679',
        role: 'STUDENT',
    }

    const registerResult = await makeRequest(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(studentData),
    })

    if (registerResult.status !== 201) {
        console.log('❌ Student registration failed')
        return false
    }

    const studentUserId = registerResult.data.user.id
    console.log('✅ Student user created:', studentUserId)

    // Create student profile
    const profileData = {
        userId: studentUserId,
        fatherName: 'Father Name',
        motherName: 'Mother Name',
        dateOfBirth: '2000-01-01',
        address: {
            street: 'Test Street',
            city: 'Dhaka',
            district: 'Dhaka',
        },
        guardianPhone: '01812345678',
        emergencyContact: '01912345678',
        educationInfo: {
            institution: 'Test School',
            class: '10',
        },
    }

    const createResult = await makeRequest(`${BASE_URL}/api/students`, {
        method: 'POST',
        body: JSON.stringify(profileData),
    })

    console.log('Create Student Status:', createResult.status)
    if (createResult.status === 201) {
        console.log('✅ Student profile created')
        return createResult.data.data
    } else {
        console.log('❌ Failed:', createResult.data)
        return null
    }
}

// Test Courses API
async function testCoursesAPI() {
    console.log('\n📖 Testing Courses API...')

    const courseData = {
        title: 'HSC Physics',
        description: 'Complete HSC Physics course',
        subject: 'Physics',
        level: 'HSC',
        duration: 6,
        fees: {
            admissionFee: 1000,
            monthlyFee: 2000,
        },
        batches: [
            {
                batchName: 'Morning Batch',
                schedule: [
                    {
                        day: 'Saturday',
                        startTime: '08:00',
                        endTime: '10:00',
                    },
                ],
                maxStudents: 30,
            },
        ],
    }

    const createResult = await makeRequest(`${BASE_URL}/api/courses`, {
        method: 'POST',
        body: JSON.stringify(courseData),
    })

    console.log('Create Course Status:', createResult.status)
    if (createResult.status === 201) {
        console.log('✅ Course created')
        return createResult.data.data
    } else {
        console.log('❌ Failed:', createResult.data)
        return null
    }
}

// Test GET APIs
async function testListAPIs() {
    console.log('\n📋 Testing List APIs...')

    const apis = [
        { name: 'Students', url: '/api/students' },
        { name: 'Teachers', url: '/api/teachers' },
        { name: 'Courses', url: '/api/courses' },
        { name: 'Enrollments', url: '/api/enrollments' },
        { name: 'Payments', url: '/api/payments' },
    ]

    for (const api of apis) {
        const result = await makeRequest(`${BASE_URL}${api.url}`)
        if (result.status === 200) {
            console.log(`✅ ${api.name} list: ${result.data.data?.data?.length || 0} items`)
        } else {
            console.log(`❌ ${api.name} list failed:`, result.data?.error)
        }
    }
}

// Main test function
async function runTests() {
    console.log('🚀 Starting CRUD API Tests...')
    console.log('Base URL:', BASE_URL)
    console.log('='.repeat(60))

    // 1. Login as Admin
    const loginSuccess = await loginAsAdmin()
    if (!loginSuccess) {
        console.log('\n❌ Cannot proceed without admin login')
        return
    }

    // 2. Test Students API
    await testStudentsAPI()

    // 3. Test Courses API
    await testCoursesAPI()

    // 4. Test List APIs
    await testListAPIs()

    console.log('\n' + '='.repeat(60))
    console.log('✅ All CRUD API tests completed!')
}

// Check server
async function checkServer() {
    try {
        const response = await fetch(BASE_URL)
        return response.ok || response.status === 404
    } catch (error) {
        return false
    }
}

// Run
; (async () => {
    const serverRunning = await checkServer()

    if (!serverRunning) {
        console.error('❌ Development server is not running!')
        console.error('Please start: npm run dev')
        process.exit(1)
    }

    await runTests()
})()
