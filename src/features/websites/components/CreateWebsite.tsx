import CreateWebsiteDialog from '@/features/websites/components/CreateWebsiteDialog'
import { createServerClient } from '@/lib/supabase'
import { Collection } from '@/types'

export default async function CreateWebsite({
   collection,
}: {
   collection?: Collection
}) {
   const supabase = createServerClient()
   const auth = await supabase.auth.getSession()

   if (auth.error || !auth.data.session?.user) {
      return null
   }

   const collections = await supabase
      .from('collections')
      .select('*')
      .eq('user_id', auth.data.session.user.id)

   return (
      <CreateWebsiteDialog
         collections={collections.data ?? []}
         collection={collection}
      />
   )
}
