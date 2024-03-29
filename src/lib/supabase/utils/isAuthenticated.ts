import { UserResponse } from '@supabase/supabase-js'

export function isAuthenticated(auth: UserResponse) {
   return !auth.error && auth.data
}
