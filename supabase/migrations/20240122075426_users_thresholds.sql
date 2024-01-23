create table users_thresholds (
  user_id uuid not null references users(id) on delete cascade,
  tokens bigint not null default 0,
  primary key (user_id)
);

alter table users_thresholds enable row level security;
 
create policy "Users can only read their own thresholds" on
users_thresholds
  for select
    using (auth.uid () = user_id);

    create function public.handle_user_thresholds()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users_thresholds (user_id, tokens) 
  values (new.id, 5000);
 
  return new;
end;
$$;
 
create trigger on_public_user_created
  after insert on public.users
  for each row execute procedure public.handle_user_thresholds();