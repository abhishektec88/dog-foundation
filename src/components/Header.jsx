export default function Header() {
  const links = [
    { href: '#mission', label: 'Mission' },
    { href: '#programs', label: 'What we do' },
    { href: '#support', label: 'Support' },
    { href: '#donate', label: 'Donate' },
  ]

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-logo" href="#top">
          <span className="site-logo__mark" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path fill="#e8c4a8" d="M8 18c0-2 1.5-3.5 3.5-3.5S15 16 15 18v2H8v-2zm11 0c0-2 1.5-3.5 3.5-3.5S24 16 24 18v2h-5v-2z" />
              <ellipse cx="11" cy="12" rx="2.5" ry="3" fill="#e8c4a8" />
              <ellipse cx="21" cy="12" rx="2.5" ry="3" fill="#e8c4a8" />
              <ellipse cx="16" cy="14" rx="4" ry="3.5" fill="var(--color-accent)" />
            </svg>
          </span>
          <span className="site-logo__text">
            Street Dog <em>Foundation</em>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="site-header__cta" href="#donate">
          Give now
        </a>
      </div>
    </header>
  )
}
