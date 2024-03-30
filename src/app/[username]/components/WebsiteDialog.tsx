import CreateWebsite from '@/app/[username]/components/CreateWebsite'
import { createServerClient } from '@/lib/supabase'

export default async function WebsiteDialog() {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      return null
   }

   const collections = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', auth.data.user.id)

   return <CreateWebsite collections={collections.data ?? []} />
}
