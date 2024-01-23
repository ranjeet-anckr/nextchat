
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';
 
type Client = SupabaseClient<Database>;
 
export async function updateUserTokens(
  client: Client,
  userId: string,
  tokens: number
) {
  return client
    .from('users_thresholds')
    .update({ tokens })
    .eq('user_id', userId)
    .throwOnError();
}