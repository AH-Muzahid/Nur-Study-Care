import { Redis } from '@upstash/redis'

let redis = null
let redisError = false

export function getRedis() {
    // If we already tried and failed, don't try again
    if (redisError) return null

    if (!redis && process.env.REDIS_URL && process.env.REDIS_TOKEN) {
        try {
            redis = new Redis({
                url: process.env.REDIS_URL,
                token: process.env.REDIS_TOKEN,
            })
        } catch (error) {
            console.warn('Redis connection failed, using in-memory cache:', error.message)
            redisError = true
            redis = null
        }
    }
    return redis
}

// In-memory fallback for development without Redis
class InMemoryCache {
    constructor() {
        this.cache = new Map()
    }

    async get(key) {
        const item = this.cache.get(key)
        if (!item) return null

        if (item.expiresAt && item.expiresAt < Date.now()) {
            this.cache.delete(key)
            return null
        }

        return item.value
    }

    async set(key, value) {
        this.cache.set(key, { value, expiresAt: null })
        return 'OK'
    }

    async setex(key, seconds, value) {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + seconds * 1000,
        })
        return 'OK'
    }

    async del(key) {
        return this.cache.delete(key) ? 1 : 0
    }

    async exists(key) {
        const item = this.cache.get(key)
        if (!item) return 0

        if (item.expiresAt && item.expiresAt < Date.now()) {
            this.cache.delete(key)
            return 0
        }

        return 1
    }

    async incr(key) {
        const current = await this.get(key)
        const newValue = (parseInt(current) || 0) + 1
        await this.set(key, newValue.toString())
        return newValue
    }

    async expire(key, seconds) {
        const item = this.cache.get(key)
        if (!item) return 0

        item.expiresAt = Date.now() + seconds * 1000
        return 1
    }
}

const inMemoryCache = new InMemoryCache()

export function getCacheClient() {
    const redisClient = getRedis()
    return redisClient || inMemoryCache
}

export default getCacheClient
