create type subscription_status as ENUM (
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete',
  'incomplete_expired',
  'paused'
);
 
create table subscriptions (
  id text not null primary key,
  price_id text not null,
  status subscription_status not null,
  cancel_at_period_end bool not null,
  currency text,
  interval text,
  interval_count int,
  created_at timestamptz not null,
  period_starts_at timestamptz not null,
  period_ends_at timestamptz not null,
  trial_starts_at timestamptz,
  trial_ends_at timestamptz,
  user_id uuid not null references public.users (id) on delete cascade
);


alter table subscriptions enable row level security;
 
create policy "Users can only read their own subscriptions" on
subscriptions
  for select
    using (auth.uid () = user_id);


    create table customers_subscriptions (
  id bigint generated always as identity primary key,
  customer_id text unique not null,
  user_id uuid not null references public.users (id) on delete cascade,
  subscription_id text unique references public.subscriptions (id) on delete
  set null
);

alter table customers_subscriptions enable row level security;
 
create policy "Users can only read their own customers subscriptions" on
customers_subscriptions
  for select
    using (auth.uid () = user_id);




  CREATE POLICY "Allow uploads" ON storage.objects FOR
  INSERT WITH CHECK (
    bucket_id = 'documents' AND auth.role() = 'anon'
  );

  CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR
  INSERT WITH CHECK (
    bucket_id = 'documents' AND auth.role() = 'authenticated'
  );