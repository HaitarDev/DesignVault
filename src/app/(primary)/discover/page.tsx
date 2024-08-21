import { getUser } from "@/utils/supabase/server";

export default async function DiscoverPage() {
  const user = await getUser();

  return <div className="container py-2">asdasd</div>;
}
