import { createBrowserClient as create } from '@supabase/ssr'
import { Database } from './types'

export function createBrowserClient() {
   return create<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
}
