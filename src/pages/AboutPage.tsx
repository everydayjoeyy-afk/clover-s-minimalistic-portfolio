import { useState } from 'react'
import meImg from '../assets/me.jpg'
import me2Img from '../assets/me2.jpg'
import me3Img from '../assets/me3.jpg'
import duolingoImg from '../assets/duolingo.jpg'

const IMAGES = [meImg, me2Img, me3Img]

type SectionItem = { heading: string; detail: string; url?: string }
type Section = { label: string; items: SectionItem[] }

const SECTIONS: Section[] = [
  {
    label: 'Skills',
    items: [
      { heading: 'Branding',           detail: 'Logo Design / Brand Guidelines / Rebranding Services' },
      { heading: 'UI/UX Design',       detail: 'Wireframing / Prototyping / User Research / Interaction Design' },
      { heading: 'Graphic Design',     detail: 'Print Design / Layout Design' },
      { heading: 'Prompt Engineering', detail: 'Using AI tools to design, build, and problem-solve faster' },
      { heading: 'Tools',              detail: 'Figma / Photoshop / CorelDraw' },
    ],
  },
  {
    label: 'Experience',
    items: [
      { heading: 'National Service Personnel',      detail: 'AmaliTech — Nov 2025 – Present' },
      { heading: 'AWS Cloud Practitioner Trainee',  detail: 'AmaliTech — Apr 2025 – Aug 2025' },
      { heading: 'Volunteer IT Training Assistant', detail: 'University of Cape Coast — Feb 2025' },
      { heading: 'IT & Graphic Design Instructor',  detail: 'Unique Data Computer Systems — Jan 2021 – Jun 2025' },
      { heading: 'Freelance Graphic Designer',      detail: 'Self-employed — Jan 2022 – Present' },
    ],
  },
  {
    label: 'Certifications',
    items: [
      { heading: 'AWS Certified Cloud Practitioner',  detail: 'Amazon Web Services — Sep 2025', url: 'https://www.credly.com/badges/1cebc9ce-48e0-413f-bea0-e9343c66d952/public_url' },
      { heading: 'Foundations of UX Design',          detail: 'Google — Apr 2026',              url: 'https://www.coursera.org/account/accomplishments/verify/XRZN6FS0WHNK' },
      { heading: 'AWS re/Start Graduate',             detail: 'Amazon Web Services — Jul 2025', url: 'https://www.credly.com/badges/ccb8318a-ad47-4d6f-8b00-1705aa9d0ac7/linked_in_profile' },
      { heading: 'UX Designer Career Path',           detail: 'Codecademy — Feb 2026',          url: 'https://www.codecademy.com/profiles/digital3035742800/certificates/c2a72f8e81dd4fada36a71a7f8968ac1' },
      { heading: 'Introduction to UI and UX Design',  detail: 'Codecademy — Feb 2026',          url: 'https://www.codecademy.com/profiles/digital3035742800/certificates/4ccef8d532484ea2aeec3b3b3dbb4f9c' },
      { heading: 'Conducting UX Research',            detail: 'IBM — Nov 2025' },
      { heading: 'Introduction to UX Design',         detail: 'IBM — Oct 2025',                 url: 'https://skills.yourlearning.ibm.com/certificate/share/2d883bcf4bewogICJvYmplY3RJZCIgOiAiTURMLTM2NSIsCiAgImxlYXJuZXJDTlVNIiA6ICI1NzI0MTUxUkVHIiwKICAib2JqZWN0VHlwZSIgOiAiQUNUSVZJVFkiCn0209115b6c8-10' },
    ],
  },
  {
    label: 'Others',
    items: [
      { heading: 'Languages', detail: 'English (Fluent) / Japanese (Learning)' },
      { heading: 'Interests', detail: 'Anime / Football / Cinema / Financial Literacy' },
    ],
  },
]

function JapaneseLink() {
  const [hovered, setHovered] = useState(false)

  return (
    <span className="relative inline-block">
      <a
        href="https://www.duolingo.com/profile/kingClover4?via=share_profile_link"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold transition-opacity hover:opacity-80"
        style={{ color: '#58CC02' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Japanese
      </a>

      {/* Hover popup image */}
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 overflow-hidden rounded-[12px] border border-line shadow-lg transition-all duration-200 ${
          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
        style={{ width: 120 }}
        aria-hidden="true"
      >
        <img src={duolingoImg} alt="Duolingo" className="h-auto w-full object-cover" />
      </span>
    </span>
  )
}

export default function AboutPage() {
  const [index, setIndex] = useState(0)
  const [shining, setShining] = useState(false)

  const handleMouseEnter = () => {
    if (shining) return
    setShining(true)
    setTimeout(() => setIndex(i => (i + 1) % IMAGES.length), 600)
    setTimeout(() => setShining(false), 1200)
  }

  return (
    <main className="flex flex-1 flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-[742px] space-y-12">

        {/* About Me */}
        <div>
          <p className="mb-8 text-[13px] font-semibold uppercase tracking-widest text-text">
            About Me
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <div
              className="relative w-full shrink-0 cursor-pointer overflow-hidden rounded-[17px] sm:w-[232px] sm:self-stretch"
              onMouseEnter={handleMouseEnter}
            >
              <img
                src={IMAGES[index]}
                alt="Joel"
                className="h-full w-full object-cover object-top transition-opacity duration-150"
              />
              <div
                className={`pointer-events-none absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1200ms] ease-in-out ${
                  shining ? 'translate-x-full' : '-translate-x-full'
                }`}
              />
            </div>

            <div className="space-y-4 text-[15px] leading-[1.7] text-muted">
              <p>
                I'm a UI/UX designer and graphic designer with a thing for clean,
                intentional work. I care about how things look and, more
                importantly, how they feel to use. And yeah, I go by Clover too.
              </p>
              <p>
                Outside of design, I watch anime, learn <JapaneseLink />, play efootball,
                and will sit through any movie genre as long as it holds my
                attention. Lately I've been trying to figure out financial literacy.
              </p>
              <p>
                Based in Ghana. Currently trying to understand stuff other than
                design and available for interesting collaborations. If it's
                creative and a little challenging, I'm in.
              </p>
            </div>
          </div>
        </div>

        {/* Skills / Experience / Certs / Others */}
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.label} className="flex flex-col gap-3 sm:flex-row sm:gap-10">
              {/* Left label */}
              <p className="w-full shrink-0 text-[13px] font-semibold uppercase tracking-widest text-text sm:w-[232px]">
                {section.label}
              </p>

              {/* Right items */}
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-semibold text-text underline underline-offset-[3px] decoration-text/40 hover:decoration-text transition-all"
                      >
                        {item.heading}
                      </a>
                    ) : (
                      <p className="text-[14px] font-semibold text-text">{item.heading}</p>
                    )}
                    <p className="text-[13px] text-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
