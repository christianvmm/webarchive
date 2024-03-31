import UpdateWebsiteDialog from '@/features/websites/components/UpdateWebsiteDialog'
import { createServerClient } from '@/lib/supabase'

export default async function UpdateWebsite() {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      return null
   }

   const collections = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', auth.data.user.id)

   return <UpdateWebsiteDialog collections={collections.data ?? []} />
}
