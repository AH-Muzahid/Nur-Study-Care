import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserRole, AuthProvider } from '@/constants/roles'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^01[3-9]\d{8}$/, 'Please provide a valid Bangladeshi phone number'],
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.STUDENT,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        avatar: {
            type: String,
        },
        // Social auth fields
        authProvider: {
            type: String,
            enum: Object.values(AuthProvider),
            default: AuthProvider.LOCAL,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        facebookId: {
            type: String,
            sparse: true,
        },
        githubId: {
            type: String,
            sparse: true,
            unique: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        // Security fields
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
        lastFailedLogin: {
            type: Date,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        lockedUntil: {
            type: Date,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

// Indexes
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ role: 1, isActive: 1 })
UserSchema.index({ googleId: 1 }, { sparse: true, unique: true })
UserSchema.index({ facebookId: 1 }, { sparse: true, unique: true })

// Pre-save middleware: Hash password
UserSchema.pre('save', async function () {
    // Only hash password if it's modified and not from social auth
    if (!this.isModified('password') || !this.password) return

    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

// Instance method: Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false
    return await bcrypt.compare(candidatePassword, this.password)
}

// Instance method: Check if account is locked
UserSchema.methods.isAccountLocked = function () {
    if (!this.isLocked) return false
    if (this.lockedUntil && this.lockedUntil < new Date()) {
        // Unlock account if lock duration has passed
        this.isLocked = false
        this.lockedUntil = null
        this.failedLoginAttempts = 0
        return false
    }
    return this.isLocked
}

// Prevent model recompilation in Next.js development
const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
