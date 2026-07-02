create table public.sayhi_messages (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  message     text not null,
  created_at  timestamp with time zone default now()
);

alter table public.sayhi_messages enable row level security;

create policy "Anyone can read messages"
  on public.sayhi_messages for select using (true);

create policy "Anyone can insert messages"
  on public.sayhi_messages for insert with check (true);
