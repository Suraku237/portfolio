interface SocialIconProps {
  size?: number
}

export function Github({ size = 24 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 20.5c-4 .8-4-2.5-6-3" />
      <path d="M8.5 22v-3.2c0-1 .4-1.7 1-2-4.1-.5-6.2-2.1-6.2-5.6 0-1.5.6-2.8 1.6-3.8-.2-1-.1-2.2.4-3.4 1.5.1 2.7.7 3.7 1.4 2-.5 4-.5 6 0 1.1-.7 2.3-1.3 3.7-1.4.5 1.2.6 2.4.4 3.4 1 1 1.6 2.3 1.6 3.8 0 3.5-2.1 5.1-6.2 5.6.7.4 1 1.3 1 2.5V22" />
    </svg>
  )
}

export function Linkedin({ size = 24 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <circle cx="7.5" cy="7.5" r=".9" fill="currentColor" stroke="none" />
      <path d="M7.5 11v6M11.5 17v-6m0 2.5c0-3.4 5-3.4 5 0V17" />
    </svg>
  )
}
