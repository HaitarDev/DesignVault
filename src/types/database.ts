import { Database } from "./supabase";

export type Users = Database["public"]["Tables"]["users"]["Row"];
export type Collections = Database["public"]["Tables"]["collections"]["Row"];
export type Designs = Database["public"]["Tables"]["designs"]["Row"];
export type Liked_designs =
  Database["public"]["Tables"]["liked_designs"]["Row"];
