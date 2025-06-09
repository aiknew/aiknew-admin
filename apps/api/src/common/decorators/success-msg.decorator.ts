import { Reflector } from '@nestjs/core'

/**
 * Set default response message for specific endpoint
 * @param {string} message default success message
 */
export const SuccessMsg = Reflector.createDecorator<string>()
