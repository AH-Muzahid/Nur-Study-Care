import { PaymentMethod } from '@/constants/roles'

/**
 * Mock payment gateway for development/testing
 * Simulates bKash, Nagad, Rocket payment processing
 * 90% success rate, 10% failure rate
 */
export class MockPaymentGateway {
    constructor() {
        this.successRate = 0.9 // 90% success rate
    }

    /**
     * Process a payment through mock gateway
     * @param {Object} paymentData - Payment details
     * @param {number} paymentData.amount - Payment amount
     * @param {string} paymentData.method - Payment method (BKASH, NAGAD, ROCKET)
     * @param {string} paymentData.accountNumber - Customer account number
     * @returns {Promise<Object>} Payment result
     */
    async processPayment(paymentData) {
        const { amount, method, accountNumber } = paymentData

        // Simulate network delay (500ms - 2s)
        await this.simulateDelay(500, 2000)

        // Randomly determine success/failure based on success rate
        const isSuccess = Math.random() < this.successRate

        if (isSuccess) {
            return this.generateSuccessResponse(amount, method, accountNumber)
        } else {
            return this.generateFailureResponse(amount, method, accountNumber)
        }
    }

    /**
     * Generate successful payment response
     */
    generateSuccessResponse(amount, method, accountNumber) {
        const transactionId = this.generateTransactionId(method)

        return {
            success: true,
            transactionId,
            amount,
            method,
            accountNumber,
            timestamp: new Date().toISOString(),
            gatewayReference: `${method}_${Date.now()}`,
            message: 'Payment completed successfully',
            metadata: {
                gateway: 'mock',
                processingTime: Math.floor(Math.random() * 2000) + 500,
            }
        }
    }

    /**
     * Generate failed payment response
     */
    generateFailureResponse(amount, method, accountNumber) {
        const errorCodes = [
            'INSUFFICIENT_BALANCE',
            'INVALID_PIN',
            'ACCOUNT_LOCKED',
            'TRANSACTION_LIMIT_EXCEEDED',
            'NETWORK_ERROR',
            'TIMEOUT',
        ]

        const errorMessages = {
            'INSUFFICIENT_BALANCE': 'Insufficient balance in account',
            'INVALID_PIN': 'Invalid PIN provided',
            'ACCOUNT_LOCKED': 'Account is locked. Please contact support',
            'TRANSACTION_LIMIT_EXCEEDED': 'Transaction limit exceeded',
            'NETWORK_ERROR': 'Network error. Please try again',
            'TIMEOUT': 'Transaction timeout. Please try again',
        }

        const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)]

        return {
            success: false,
            errorCode,
            errorMessage: errorMessages[errorCode],
            amount,
            method,
            accountNumber,
            timestamp: new Date().toISOString(),
            metadata: {
                gateway: 'mock',
                attemptedAt: new Date().toISOString(),
            }
        }
    }

    /**
     * Generate mock transaction ID
     */
    generateTransactionId(method) {
        const prefix = {
            [PaymentMethod.BKASH]: 'BKS',
            [PaymentMethod.NAGAD]: 'NGD',
            [PaymentMethod.ROCKET]: 'RKT',
        }

        const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')
        return `${prefix[method] || 'TXN'}${Date.now()}${randomDigits.slice(-6)}`
    }

    /**
     * Simulate network delay
     */
    simulateDelay(min, max) {
        const delay = Math.floor(Math.random() * (max - min) + min)
        return new Promise(resolve => setTimeout(resolve, delay))
    }

    /**
     * Verify a transaction (for checking payment status)
     * @param {string} transactionId - Transaction ID to verify
     * @returns {Promise<Object>} Verification result
     */
    async verifyTransaction(transactionId) {
        await this.simulateDelay(200, 500)

        // In a real implementation, this would query the gateway
        // For mock, we'll return success if transaction ID matches pattern
        const isValid = /^(BKS|NGD|RKT|TXN)\d+/.test(transactionId)

        return {
            valid: isValid,
            transactionId,
            status: isValid ? 'COMPLETED' : 'NOT_FOUND',
            timestamp: new Date().toISOString(),
        }
    }

    /**
     * Get payment methods configuration
     */
    getAvailableMethods() {
        return [
            {
                method: PaymentMethod.BKASH,
                name: 'bKash',
                icon: '💳',
                minAmount: 10,
                maxAmount: 25000,
                fee: 0, // No fee in development
            },
            {
                method: PaymentMethod.NAGAD,
                name: 'Nagad',
                icon: '💰',
                minAmount: 10,
                maxAmount: 25000,
                fee: 0,
            },
            {
                method: PaymentMethod.ROCKET,
                name: 'Rocket',
                icon: '🚀',
                minAmount: 10,
                maxAmount: 25000,
                fee: 0,
            },
        ]
    }
}
