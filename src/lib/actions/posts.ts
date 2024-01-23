
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import getSupabaseServerActionClient from "@/lib/supabase/action-client";
import { deletePost, insertPost, updatePost } from "@/lib/mutations/posts";
 

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string 
  const content = formData.get('content') as string;
  const client = getSupabaseServerActionClient();
  const { data, error } = await client.auth.getUser();
 
  if (error) {
    throw error;
  }
 
  const { uuid } = await insertPost(client, {
    title,
    content,
    description,
    user_id: data.user.id
  });
 const path="/dashboard"
  revalidatePath(path, 'page');
 
  // redirect to the post page.
  // NB: it will return a 404 error since we haven't implemented the post page yet
  return redirect(path);
}


export async function deletePostAction(uid: string) {

  const client = getSupabaseServerActionClient();
  const path = `/dashboard`;

  await deletePost(client, uid);
  revalidatePath(path, 'page');
  return redirect(path);
}


export async function updatePostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | undefined;
  const content = formData.get('content') as string;
  const uid = formData.get('uid') as string;
 
  const client = getSupabaseServerActionClient();
 
  await updatePost(client, {
    title,
    content,
    description,
    uid,
  });
  const postPath = `/dashboard`;
  revalidatePath(postPath, 'page');
  return redirect(postPath);
}