export const authConfig = {
    pages: {
        signIn: '/login',
        error: '/login',
        newUser: '/register',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const userRole = auth?.user?.role
            const pathname = nextUrl.pathname

            // Protected routes
            const isAdminRoute = pathname.startsWith('/admin')
            const isTeacherRoute = pathname.startsWith('/teacher')
            const isStudentRoute = pathname.startsWith('/student')

            // Redirect to login if not authenticated
            if (!isLoggedIn && (isAdminRoute || isTeacherRoute || isStudentRoute)) {
                return false // Will redirect to login page
            }

            // Role-based access control
            if (isLoggedIn) {
                if (isAdminRoute && userRole !== 'ADMIN') {
                    return Response.redirect(new URL('/unauthorized', nextUrl))
                }
                if (isTeacherRoute && userRole !== 'TEACHER') {
                    return Response.redirect(new URL('/unauthorized', nextUrl))
                }
                if (isStudentRoute && userRole !== 'STUDENT') {
                    return Response.redirect(new URL('/unauthorized', nextUrl))
                }
            }

            return true
        },
    },
    providers: [], // Providers will be added in auth.js
}
