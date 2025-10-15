import { redirect } from "react-router";
import { supabase } from "./supabase";

export async function requireAuth(request: Request) {
  const cookie = request.headers.get("Cookie");
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw redirect("/login");
  }
  
  return session.user;
}

export async function createServerClient(request: Request) {
  return supabase;
}

export function signOut() {
  return supabase.auth.signOut();
}

export function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signUpWithEmail(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}