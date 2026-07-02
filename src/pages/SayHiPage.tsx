import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

type DBMessage = {
  id: string
  name: string
  message: string
  created_at: string
}

const SENT_KEY = 'sayhi-sent-id'

export default function SayHiPage() {
  const [dbMessages, setDbMessages]   = useState<DBMessage[]>([])
  const [name, setName]               = useState('')
  const [message, setMessage]         = useState('')
  const [sent, setSent]               = useState(false)
  const [sending, setSending]         = useState(false)
  const [myId, setMyId]               = useState<string | null>(null)
  const bottomRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedId = localStorage.getItem(SENT_KEY)
    if (storedId) setMyId(storedId)

    supabase
      .from('sayhi_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setDbMessages(data)
          if (storedId && data.some(m => m.id === storedId)) setSent(true)
        }
      })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dbMessages])

  const handleSend = async () => {
    if (!name.trim() || !message.trim() || sent || sending) return
    setSending(true)

    const { data, error } = await supabase
      .from('sayhi_messages')
      .insert({ name: name.trim(), message: message.trim() })
      .select()
      .single()

    if (!error && data) {
      setDbMessages(prev => [...prev, data])
      setMyId(data.id)
      setSent(true)
      localStorage.setItem(SENT_KEY, data.id)
    }

    setSending(false)
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-16">
      <div className="flex w-full max-w-[500px] flex-col gap-4">

        {/* Joel's greeting */}
        <div
          className="flex justify-start"
          style={{ animation: 'msg-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <p className="max-w-[80%] rounded-[18px] rounded-bl-[4px] border border-line bg-surface-raised px-4 py-2.5 text-[14px] leading-[1.55] text-text">
            Hey 👋 What's on your mind? Drop your name so I know who left a message.
          </p>
        </div>

        {/* Messages from everyone */}
        {dbMessages.map((msg, i) => {
          const isMe = msg.id === myId
          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}
              style={{
                animation: 'msg-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
                animationDelay: `${i * 40}ms`,
              }}
            >
              <span className="px-2 text-[11px] font-medium text-muted">{msg.name}</span>
              <p
                className={`max-w-[80%] rounded-[18px] px-4 py-2.5 text-[14px] leading-[1.55] ${
                  isMe
                    ? 'rounded-br-[4px] bg-gradient-to-b from-cta-from to-cta-to text-cta-text'
                    : 'rounded-bl-[4px] border border-line bg-surface-raised text-text'
                }`}
              >
                {msg.message}
              </p>
            </div>
          )
        })}

        <div ref={bottomRef} />

        {/* Input */}
        {!sent && (
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-[14px] border border-line bg-surface-raised px-4 py-3 text-[14px] text-text placeholder:text-muted outline-none transition-colors focus:border-text/40"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="What's on your mind?"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 rounded-[14px] border border-line bg-surface-raised px-4 py-3 text-[14px] text-text placeholder:text-muted outline-none transition-colors focus:border-text/40"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!name.trim() || !message.trim() || sending}
                className="rounded-[14px] bg-gradient-to-b from-cta-from to-cta-to px-5 py-3 text-[14px] font-semibold text-cta-text transition-transform active:scale-95 disabled:opacity-30"
              >
                {sending ? '...' : 'Send'}
              </button>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </main>
  )
}
