import CreateWebsiteDialog from '@/app/features/websites/components/CreateWebsiteDialog'
import { createServerClient } from '@/lib/supabase'

export default async function CreateWebsite() {
   const supabase = createServerClient()
   const auth = await supabase.auth.getUser()

   if (auth.error || !auth.data.user) {
      return null
   }

   const collections = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', auth.data.user.id)

   return <CreateWebsiteDialog collections={collections.data ?? []} />
}
