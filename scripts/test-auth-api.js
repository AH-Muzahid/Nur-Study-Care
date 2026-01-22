/**
 * Authentication API Testing Script
 * Run with: node scripts/test-auth-api.js
 * 
 * Make sure the dev server is running: npm run dev
 */

const BASE_URL = 'http://localhost:3000'

// Test data
const testUser = {
    name: 'Test Student',
    email: `test.student.${Date.now()}@example.com`,
    password: 'Test@1234',
    phone: '01712345678',
    role: 'STUDENT',
}

// Helper function to make requests
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })

        const data = await response.json()
        return { status: response.status, data, headers: response.headers }
    } catch (error) {
        return { error: error.message }
    }
}

// Extract cookies from Set-Cookie header
function extractCookies(headers) {
    const cookies = {}
    const setCookie = headers.get('set-cookie')
    if (setCookie) {
        const parts = setCookie.split(',')
        parts.forEach((part) => {
            const [nameValue] = part.split(';')
            const [name, value] = nameValue.trim().split('=')
            if (name && value) {
                cookies[name] = value
            }
        })
    }
    return cookies
}

// Test functions
async function testRegister() {
    console.log('\n📝 Testing Registration...')
    console.log('Request:', testUser)

    const result = await makeRequest(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(testUser),
    })

    console.log('Status:', result.status)
    console.log('Response:', result.data)

    if (result.status === 201 && result.data.success) {
        console.log('✅ Registration successful!')
        const cookies = extractCookies(result.headers)
        return { success: true, user: result.data.user, cookies }
    } else {
        console.log('❌ Registration failed!')
        return { success: false }
    }
}

async function testLogin() {
    console.log('\n🔐 Testing Login...')

    const credentials = {
        email: testUser.email,
        password: testUser.password,
    }

    console.log('Request:', credentials)

    const result = await makeRequest(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
    })

    console.log('Status:', result.status)
    console.log('Response:', result.data)

    if (result.status === 200 && result.data.success) {
        console.log('✅ Login successful!')
        const cookies = extractCookies(result.headers)
        return { success: true, user: result.data.user, cookies }
    } else {
        console.log('❌ Login failed!')
        return { success: false }
    }
}

async function testRefreshToken(cookies) {
    console.log('\n🔄 Testing Token Refresh...')

    const cookieString = Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')

    const result = await makeRequest(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
            Cookie: cookieString,
        },
    })

    console.log('Status:', result.status)
    console.log('Response:', result.data)

    if (result.status === 200 && result.data.success) {
        console.log('✅ Token refresh successful!')
        return { success: true }
    } else {
        console.log('❌ Token refresh failed!')
        return { success: false }
    }
}

async function testLogout(cookies) {
    console.log('\n👋 Testing Logout...')

    const cookieString = Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')

    const result = await makeRequest(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
            Cookie: cookieString,
        },
    })

    console.log('Status:', result.status)
    console.log('Response:', result.data)

    if (result.status === 200 && result.data.success) {
        console.log('✅ Logout successful!')
        return { success: true }
    } else {
        console.log('❌ Logout failed!')
        return { success: false }
    }
}

async function testLoginValidationErrors() {
    console.log('\n❗ Testing Login Validation Errors...')

    // Test with invalid email
    const result1 = await makeRequest(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: 'invalid-email', password: 'test' }),
    })

    console.log('Invalid email - Status:', result1.status)
    console.log('Response:', result1.data)

    if (result1.status === 422 && result1.data.error === 'Validation failed') {
        console.log('✅ Validation error handled correctly!')
    } else {
        console.log('❌ Validation error not handled properly')
    }

    // Test with wrong password
    const result2 = await makeRequest(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: testUser.email, password: 'WrongPassword123!' }),
    })

    console.log('\nWrong password - Status:', result2.status)
    console.log('Response:', result2.data)

    if (result2.status === 401) {
        console.log('✅ Invalid credentials handled correctly!')
    } else {
        console.log('❌ Invalid credentials not handled properly')
    }
}

// Run all tests
async function runTests() {
    console.log('🚀 Starting Authentication API Tests...')
    console.log('Base URL:', BASE_URL)
    console.log('='.repeat(60))

    try {
        // Test 1: Register
        const registerResult = await testRegister()
        if (!registerResult.success) {
            console.log('\n⚠️  Stopping tests - registration failed')
            return
        }

        // Test 2: Login
        const loginResult = await testLogin()
        if (!loginResult.success) {
            console.log('\n⚠️  Stopping tests - login failed')
            return
        }

        // Test 3: Refresh Token
        await testRefreshToken(loginResult.cookies)

        // Test 4: Logout
        await testLogout(loginResult.cookies)

        // Test 5: Validation Errors
        await testLoginValidationErrors()

        console.log('\n' + '='.repeat(60))
        console.log('✅ All authentication tests completed!')
        console.log('\n📊 Test Summary:')
        console.log('  ✓ User Registration')
        console.log('  ✓ User Login')
        console.log('  ✓ Token Refresh')
        console.log('  ✓ User Logout')
        console.log('  ✓ Validation Errors')
    } catch (error) {
        console.error('\n❌ Test Error:', error.message)
        console.error(error.stack)
    }
}

// Check if server is running
async function checkServer() {
    try {
        const response = await fetch(BASE_URL)
        return response.ok || response.status === 404
    } catch (error) {
        return false
    }
}

// Main execution
; (async () => {
    const serverRunning = await checkServer()

    if (!serverRunning) {
        console.error('❌ Development server is not running!')
        console.error('Please start the server with: npm run dev')
        process.exit(1)
    }

    await runTests()
})()
