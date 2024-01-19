
import type { SupabaseClient } from "@supabase/supabase-js";
import Subscription from "@/lib/subscriptions/subscription";
import { Database } from "../../../database.types";
import Stripe from "stripe";
 
type Client = SupabaseClient<Database>;
type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row'];
 
export async function addSubscription(
  client: Client,
  subscription: Stripe.Subscription,
  userId: string
) {
  const data = subscriptionMapper(subscription);
 
  return getSubscriptionsTable(client)
    .insert({
      ...data,
      id: subscription.id,
      user_id: userId,
    })
    .select('id')
    .throwOnError()
    .single();
}
 
export async function deleteSubscription(
  client: Client,
  subscriptionId: string
) {
  return getSubscriptionsTable(client)
    .delete()
    .match({ id: subscriptionId })
    .throwOnError();
}
 
export async function updateSubscriptionById(
  client: Client,
  subscription: Stripe.Subscription
) {
  return getSubscriptionsTable(client)
    .update(subscriptionMapper(subscription))
    .match({
      id: subscription.id,
    })
    .throwOnError();
}
 
export async function setCustomerSubscriptionData(
  client: Client,
  props: {
    customerId: string;
    userId: string;
    subscriptionId: string;
  }
) {
  const { customerId, userId, subscriptionId } = props;
 
  return client
    .from('customers_subscriptions')
    .upsert(
      {
        customer_id: customerId,
        user_id: userId,
        subscription_id: subscriptionId,
      },
      {
        onConflict: 'customer_id',
      }
    )
    .match({ customer_id: customerId })
    .throwOnError();
}
 
function subscriptionMapper(
  subscription: Stripe.Subscription
): SubscriptionRow {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;
  const priceId = price.id;
  const interval = price?.recurring?.interval ?? null;
  const intervalCount = price?.recurring?.interval_count ?? null;
 
  const row: Partial<SubscriptionRow> = {
    price_id: priceId,
    currency: subscription.currency,
    status: subscription.status ?? 'incomplete',
    interval,
    interval_count: intervalCount,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    created_at: subscription.created ? toISO(subscription.created) : undefined,
    period_starts_at: subscription.current_period_start
      ? toISO(subscription.current_period_start)
      : undefined,
    period_ends_at: subscription.current_period_end
      ? toISO(subscription.current_period_end)
      : undefined,
  };
 
  if (subscription.trial_start) {
    row.trial_starts_at = toISO(subscription.trial_start);
  }
 
  if (subscription.trial_end) {
    row.trial_ends_at = toISO(subscription.trial_end);
  }
 
  return row as SubscriptionRow;
}
 
function toISO(timestamp: number) {
  return new Date(timestamp * 1000).toISOString();
}
 
function getSubscriptionsTable(client: Client) {
  return client.from('subscriptions');
}