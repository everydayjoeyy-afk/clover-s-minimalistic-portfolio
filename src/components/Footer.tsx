import claudeIcon from '../assets/claude-color.svg'

export default function Footer() {
  return (
    <footer className="flex items-center justify-center gap-1.5 py-2 opacity-75">
      <p className="text-[11px] leading-[1.4] text-muted">
        © 2026 Clover. Designed with Figma. feat.
      </p>
      <img
        src={claudeIcon}
        alt="Claude"
        className="size-[15px] shrink-0 select-none"
      />
    </footer>
  )
}
