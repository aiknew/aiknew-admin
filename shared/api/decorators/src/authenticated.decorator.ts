import { SetMetadata } from '@nestjs/common'

// Only need to be logged in to access, and don't need to have specific permissions
export const IS_AUTHENTICATED_KEY = 'is_authenticated';
export const Authenticated = () => SetMetadata(IS_AUTHENTICATED_KEY, true)
