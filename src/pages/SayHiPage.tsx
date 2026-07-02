import { useEffect, useRef, useState } from 'react'

type Message = { from: 'joel' | 'user'; text: string }

const INITIAL: Message[] = [
  { from: 'joel', text: "Hey 👋 What's on your mind? Drop your name so I know who left a message." },
]

const STORAGE_KEY = 'sayhi-state'

function loadState(): { messages: Message[]; sent: boolean } {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { messages: INITIAL, sent: false }
}

export default function SayHiPage() {
  const initial                 = loadState()
  const [name, setName]         = useState('')
  const [message, setMessage]   = useState('')
  const [messages, setMessages] = useState<Message[]>(initial.messages)
  const [sent, setSent]         = useState(initial.sent)
  const bottomRef               = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!name.trim() || !message.trim() || sent) return
    const next: Message[] = [
      ...messages,
      { from: 'user', text: `${name.trim()}: ${message.trim()}` },
    ]
    setMessages(next)
    setSent(true)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: next, sent: true }))
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-16">
      <div className="flex w-full max-w-[500px] flex-col gap-4">

        {/* Chat thread */}
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: 'msg-in 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
                animationDelay: `${i * 40}ms`,
              }}
            >
              <p
                className={`max-w-[80%] rounded-[18px] px-4 py-2.5 text-[14px] leading-[1.55] ${
                  msg.from === 'user'
                    ? 'rounded-br-[4px] bg-gradient-to-b from-cta-from to-cta-to text-cta-text'
                    : 'rounded-bl-[4px] border border-line bg-surface-raised text-text'
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
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
                disabled={!name.trim() || !message.trim()}
                className="rounded-[14px] bg-gradient-to-b from-cta-from to-cta-to px-5 py-3 text-[14px] font-semibold text-cta-text transition-transform active:scale-95 disabled:opacity-30"
              >
                Send
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
