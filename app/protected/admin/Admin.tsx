import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Admin() {

  const supabase = createClient();
  const { data: {user} } = await supabase.auth.getUser();
  var infos = {};

  if(!user) redirect('/sign-in');
  else {
    const { data, error } = await supabase.from('Configured_Users').select().eq('email', user?.email).single();
    infos = data;
  }

  return (
    infos?.role === 'ADMIN' && (
        <div>Admin Panel</div>
    )
  )
}
