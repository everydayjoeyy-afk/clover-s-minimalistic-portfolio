import Hero from '../components/Hero'
import SocialIcons from '../components/SocialIcons'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6">
      <Hero />
      <SocialIcons />
    </main>
  )
}
