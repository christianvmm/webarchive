import UpdateWebsiteDialog from '@/features/websites/components/UpdateWebsiteDialog'
import { createServerClient } from '@/lib/supabase'

export default async function UpdateWebsite() {
   const supabase = createServerClient()
   const auth = await supabase.auth.getSession()

   if (auth.error || !auth.data.session?.user) {
      return null
   }

   const collections = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', auth.data.session.user.id)

   return <UpdateWebsiteDialog collections={collections.data ?? []} />
}
