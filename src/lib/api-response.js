import { NextResponse } from 'next/server'
import { logger } from './logger'

/**
 * Success response helper
 */
export function successResponse(data, message = 'Success', statusCode = 200) {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status: statusCode }
    )
}

/**
 * Error response helper
 */
export function errorResponse(message, statusCode = 500, errors = null) {
    const response = {
        success: false,
        message,
    }

    if (errors) {
        response.errors = errors
    }

    logger.error({ message, statusCode, errors })

    return NextResponse.json(response, { status: statusCode })
}

/**
 * Validation error response
 */
export function validationError(errors) {
    return errorResponse('Validation failed', 400, errors)
}

/**
 * Unauthorized error response
 */
export function unauthorizedError(message = 'Unauthorized access') {
    return errorResponse(message, 401)
}

/**
 * Forbidden error response
 */
export function forbiddenError(message = 'Access forbidden') {
    return errorResponse(message, 403)
}

/**
 * Not found error response
 */
export function notFoundError(message = 'Resource not found') {
    return errorResponse(message, 404)
}

/**
 * Conflict error response
 */
export function conflictError(message = 'Resource already exists') {
    return errorResponse(message, 409)
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error) {
    logger.error(error)

    if (error.message === 'Authentication required') {
        return unauthorizedError(error.message)
    }

    if (error.message === 'Token has expired' || error.message === 'Invalid token') {
        return unauthorizedError(error.message)
    }

    if (error.message.includes('not found')) {
        return notFoundError(error.message)
    }

    if (error.message.includes('already exists')) {
        return conflictError(error.message)
    }

    if (error.name === 'ValidationError') {
        return validationError(error.errors)
    }

    return errorResponse(error.message || 'Internal server error', 500)
}
