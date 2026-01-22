'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

/**
 * Generic data fetching hook
 * @param {Function} fetchFn - API function to fetch data
 * @param {Object} options - Configuration options
 * @returns {Object} State and refetch function
 */
export function useFetch(fetchFn, options = {}) {
    const { immediate = true, onSuccess, onError } = options
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(immediate)
    const [error, setError] = useState(null)

    const execute = useCallback(
        async (...args) => {
            setLoading(true)
            setError(null)
            try {
                const result = await fetchFn(...args)
                setData(result)
                if (onSuccess) onSuccess(result)
                return result
            } catch (err) {
                setError(err)
                if (onError) onError(err)
                else toast.error(err.message || 'Failed to fetch data')
                throw err
            } finally {
                setLoading(false)
            }
        },
        [fetchFn, onSuccess, onError]
    )

    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [immediate, execute])

    return {
        data,
        loading,
        error,
        refetch: execute,
    }
}

/**
 * Hook for paginated data
 */
export function usePagination(initialPage = 1, initialPageSize = 10) {
    const [page, setPage] = useState(initialPage)
    const [pageSize, setPageSize] = useState(initialPageSize)
    const [total, setTotal] = useState(0)

    const totalPages = Math.ceil(total / pageSize)

    const goToPage = useCallback((newPage) => {
        setPage(Math.max(1, Math.min(newPage, totalPages)))
    }, [totalPages])

    const nextPage = useCallback(() => {
        if (page < totalPages) setPage(page + 1)
    }, [page, totalPages])

    const prevPage = useCallback(() => {
        if (page > 1) setPage(page - 1)
    }, [page])

    const changePageSize = useCallback((newSize) => {
        setPageSize(newSize)
        setPage(1) // Reset to first page when changing page size
    }, [])

    return {
        page,
        pageSize,
        total,
        totalPages,
        setTotal,
        setPage: goToPage,
        nextPage,
        prevPage,
        changePageSize,
    }
}

/**
 * Hook for managing form state and submission
 */
export function useFormSubmit(submitFn, options = {}) {
    const { onSuccess, onError, successMessage = 'Success!' } = options
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const submit = useCallback(
        async (data) => {
            setLoading(true)
            setError(null)
            try {
                const result = await submitFn(data)
                toast.success(successMessage)
                if (onSuccess) onSuccess(result)
                return result
            } catch (err) {
                setError(err)
                toast.error(err.message || 'Submission failed')
                if (onError) onError(err)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [submitFn, successMessage, onSuccess, onError]
    )

    return {
        submit,
        loading,
        error,
    }
}
