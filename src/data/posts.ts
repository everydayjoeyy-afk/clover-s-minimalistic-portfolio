export type Block =
  | { type: 'p';       text: string }
  | { type: 'callout'; text: string }
  | { type: 'h2';      text: string }
  | { type: 'credit';  name: string; note: string; url?: string }

export type Post = {
  slug: string
  title: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
  blocks: Block[]
}

export const POSTS: Post[] = [
  {
    slug: 'credits',
    title: 'Credits',
    date: 'Jul 2026',
    readTime: '2 min read',
    tags: ['design', 'acknowledgement'],
    excerpt: 'I procrastinated on this for a long time. Here\'s who finally pushed me over the edge.',
    blocks: [
      {
        type: 'p',
        text: 'This portfolio sat unbuilt for months. Not for lack of ideas, but for too many wrong ones. I kept waiting for some perfect version to appear in my head before I touched anything. It never did. What actually got me moving was simpler: I looked around. Teammates had portfolios. Designers I followed had portfolios. So I started paying attention, really paying attention, to the details, the decisions, the small things that made certain sites feel alive.',
      },
      {
        type: 'callout',
        text: 'Keep your eyes open. Everything is inspiration. — Donatella Versace',
      },
      {
        type: 'p',
        text: 'And so I looked. At portfolios my teammates had built, at designers I stumbled across, at sites shared in a Google UX course I was taking. Some left a fingerprint on one small detail. Others rewired how I thought about whole sections. These are my honorable mentions, the ones that show up in this site whether you notice them or not.',
      },
      { type: 'h2', text: 'Design Inspiration' },
      {
        type: 'credit',
        name: 'SCULPT (Figma)',
        note: 'The grid layout and overall page structure came directly from studying this Figma design. It gave me a visual foundation to build on.',
        url: 'https://www.figma.com/design/5zYMvmPxQ1SmJIBGNGY3lF/SCULPT?m=auto&t=JPg1ELV1eiMfA11y-6',
      },
      {
        type: 'credit',
        name: 'Eyarko',
        note: 'Enyarko had a message wall on his site. I loved the idea but went a different direction — the message bubble chat you see on the Say Hi page is my take on it.',
        url: 'https://eyarko.vercel.app/about',
      },
      {
        type: 'credit',
        name: 'Kartik Rao',
        note: 'His Say Hi copy and the way he kept everything on that page light and fun.',
        url: 'http://www.kartikrao.in',
      },
      {
        type: 'credit',
        name: 'degreat.co.uk',
        note: 'The pill-style navbar and the overall restrained, clean layout. A site I kept coming back to.',
        url: 'https://degreat.co.uk',
      },
      {
        type: 'credit',
        name: 'Jude',
        note: 'Clean, intentional design work that pushed me to be more deliberate with every section.',
        url: 'https://jude.vercel.app',
      },
      {
        type: 'credit',
        name: 'Mobasit',
        note: 'Another portfolio I studied closely when figuring out how to present work simply without losing personality.',
        url: 'https://www.mobasit.online',
      },
      {
        type: 'credit',
        name: 'JdeGrathinson',
        note: 'Helped me think about how to balance typography and whitespace — two things I was overthinking.',
        url: 'https://www.jdegrafthinson.com',
      },
      {
        type: 'credit',
        name: 'Onyekachi',
        note: 'A fellow designer whose portfolio reminded me that personality in design is not extra — it is the point.',
        url: 'https://onyekachi.design',
      },
      {
        type: 'credit',
        name: 'Penny Banks',
        note: 'Sharp, focused work presentation. Taught me a lot about keeping things tight.',
        url: 'https://pennybanks.com',
      },
      {
        type: 'credit',
        name: 'Tong Fang Sun',
        note: 'Replicated his way of placing the social icons — the position you see them in on this site came directly from studying his layout.',
        url: 'https://www.tongfangsun.xyz',
      },
      {
        type: 'credit',
        name: 'Behance portfolio',
        note: 'A UI/UX designer portfolio on Behance that was shared as inspiration during my Google UX course on Coursera. It, along with several other sites from that course, quietly shaped how I thought about presenting case studies.',
        url: 'https://www.behance.net/gallery/168903999/UXUI-Designer-Portfolio-CV-2023/modules/952808577',
      },
      { type: 'h2', text: 'Built With' },
      {
        type: 'credit',
        name: 'React + Vite',
        note: 'The foundation. Fast, minimal, and gets out of the way.',
      },
      {
        type: 'credit',
        name: 'Tailwind CSS',
        note: 'Made it possible to move fast without fighting a stylesheet.',
      },
      {
        type: 'credit',
        name: 'Clash Display',
        note: 'The display font carrying the personality of the big headings. Via Fontshare.',
        url: 'https://www.fontshare.com/fonts/clash-display',
      },
      {
        type: 'credit',
        name: 'Claude',
        note: 'The AI co-pilot that helped build this whole thing through conversation.',
        url: 'https://claude.ai',
      },
      {
        type: 'p',
        text: 'Some people will say a portfolio website is not worth it. Maybe. But I actually had fun making this one, and that alone made it worth it.',
      },
    ],
  },
]
