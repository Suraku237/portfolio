# Kwete Junior — Portfolio

A responsive, accessible personal portfolio built with React, TypeScript, and Vite. Features category-filtered projects, keyboard-accessible project dialogs, verified Coursera credentials, live public GitHub updates, and direct GitHub, LinkedIn, and email links.

## Development

Requires Node.js 22.12+ (or a newer Vite-supported release).

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

The production build is generated in `dist`. Deploy that directory to any static host. For hosting beneath a subdirectory, configure Vite's `base` in `vite.config.ts` before building.

## Update your content

Edit [`src/data/portfolio.ts`](src/data/portfolio.ts) to change your profile, contact details, projects, technologies, or credentials. No API keys or private-account access are required.

- **Identity and links:** GitHub `Suraku237`; LinkedIn URL supplied by the owner. The contact email is publicly associated with the GitHub account in its domain-registration repository.
- **Projects and skills:** Based on public source and project credits, checked September 11, 2026. Collaborative projects, coursework, prototypes, and unfinished features are labeled honestly. Project previews are original illustrative designs, not screenshots.
- **Credentials:** The owner-provided [Google Project Management specialization](https://www.coursera.org/account/accomplishments/specialization/HDRAWMICVJ79) verifies the recipient, completion date, and all seven linked course certificates. These are course/specialization certificates, not academic degrees. Other credentials can be added after their public verification links are supplied.
- **GitHub progress:** The public GitHub API refreshes the repository count and shows the three most recently updated non-fork repositories from its first 100 results. Repository updates are not commit/contribution counts. A visible, dated snapshot is shown when the API is unavailable or rate-limited; no random activity data is generated.
- **Fonts:** DM Sans and Manrope are served locally through Fontsource. The only external runtime requests are public GitHub data and the GitHub avatar.

## Verification sources

- [GitHub profile](https://github.com/Suraku237) and [public profile API](https://api.github.com/users/Suraku237)
- [Tickety mobile](https://github.com/Suraku237/tickety), [dashboard](https://github.com/Suraku237/tickety_website), and [API](https://github.com/Suraku237/tickety_backend)
- [SmartTutor](https://github.com/Suraku237/smart-tutor), including the in-app team credits
- [MarketFlow / SmartSchool](https://github.com/Suraku237/MarketFlow)
- [Smart Garden](https://github.com/Suraku237/agri_app)
- [Fast Travel](https://github.com/Suraku237/fast_travel)
- [Camfranglais Collector](https://github.com/Suraku237/francanglaiscompiler)
- [Google Project Management and seven course certificates](https://www.coursera.org/account/accomplishments/specialization/HDRAWMICVJ79)

Respect reduced-motion settings. Project filtering, mobile navigation, and dialogs work with a keyboard. External links open in a separate tab with `noopener noreferrer`; email links use the visitor's email application.
