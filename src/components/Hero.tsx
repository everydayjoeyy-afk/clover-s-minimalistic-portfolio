import { Link } from 'react-router-dom'
import gestureEmoji from '../assets/gesturing-no.webm'
import { useTypewriter } from '../hooks/useTypewriter'

const GREETINGS = ['Yooo', 'Salut', 'Akwaaba', 'こんにちは', 'Hola']

export default function Hero() {
  const greeting = useTypewriter(GREETINGS, {
    typeSpeed: 260,
    deleteSpeed: 160,
    pauseMs: 10000,
  })

  return (
    <section className="flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-display font-semibold text-text leading-[1.2] tracking-[-2.4px] text-[clamp(40px,8vw,80px)]">
        <span className="sr-only">Hi — the name's Joel</span>
        <span aria-hidden="true" className="block">
          <span className="grid place-items-center">
            <span className="inline-flex items-center gap-3">
              <span className="inline-flex items-baseline">
                <span className="whitespace-pre">{greeting}</span>
                <span className="animate-caret ml-1 font-sans font-light">|</span>
              </span>
              <video
                src={gestureEmoji}
                autoPlay
                loop
                muted
                playsInline
                className="h-[1.2em] w-auto select-none"
              />
            </span>
          </span>
          <span className="block text-[1.28em]">the name's Joel</span>
        </span>
      </h1>

      <div className="w-full max-w-[742px] space-y-3 text-[16px] leading-[1.6] text-muted">
        <p>
          I'm a UI/UX designer and graphic designer who'll try anything that spikes my interest.
          Design, code, visuals, you name it.
        </p>
        <p>
          On this site you'll find my{' '}
          <Link to="/work" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#CE1126' }}>
            work
          </Link>{' '}
          and a bit{' '}
          <Link to="/about" className="font-medium transition-opacity hover:opacity-70" style={{ color: '#F5A623' }}>
            about me
          </Link>
          . My thoughts live in{' '}
          <Link to="/writing" className="font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--ghana-green)' }}>
            writing
          </Link>
          . Wanna talk?{' '}
          <a href="mailto:fofohjoel@gmail.com" className="font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--ghana-star)' }}>
            Contact me
          </a>
          .
        </p>
      </div>
    </section>
  )
}
