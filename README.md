# Kwete Junior — Portfolio

A responsive, accessible personal portfolio built with React, TypeScript, and Vite. Separate hash-routed pages cover selected work, games, background, skills, credentials, and a live GitHub Observatory. The site also includes keyboard-accessible project dialogs, verified Coursera credentials, branded technology icons, gameplay media, a personal portrait, and scroll-triggered animations.

## Development

Requires Node.js 22.12+ (or a newer Vite-supported release).

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run test:github
npm run test:theme
npm run build
npm run preview
```

The production build is generated in `dist`. Deploy that directory to any static host. For hosting beneath a subdirectory, configure Vite's `base` in `vite.config.ts` before building.

## Appearance

The header's sun/moon button switches every page between light and dark mode. The initial theme follows the device preference; an explicit choice is saved under `portfolio-theme` in browser local storage and synchronized across tabs. Clearing that preference restores system-following behavior. If storage is blocked or full, the control still works for the current visit and displays a notice.

[`public/theme.js`](public/theme.js) applies the preference before React renders to avoid a light flash on dark-mode reloads. Photos, gameplay footage, and original project illustrations keep their original colors. Existing reduced-motion preferences are respected in either theme.

## Update your content

Edit [`src/data/portfolio.ts`](src/data/portfolio.ts) to change your profile, contact details, projects, technologies, or credentials. No API keys or private-account access are required.

- **Identity and links:** GitHub `Suraku237`; LinkedIn URL supplied by the owner. The contact email is publicly associated with the GitHub account in its domain-registration repository.
- **Projects and skills:** Project technologies are based on public source and project credits checked September 11, 2026. Jenkins and GitHub Actions were added as owner-provided CI/CD skills. Grid Survival and Math Runner are owner-provided game titles; direct public repositories and gameplay details were not found, so their cards avoid unsupported claims and currently link to the GitHub repository list. Collaborative projects, coursework, prototypes, and unfinished features are labeled honestly. Project previews are original illustrative designs, not screenshots.
- **Game media:** Grid Survival uses the owner-provided `public/videos/grid-survival.mp4` recording and matching poster image. Math Runner uses the owner-provided `public/images/math-runner-gameplay.png` screenshot, displayed in full without cropping or a play-button overlay; its gameplay video is still to come. Put additional compressed recordings in `public/videos/`, then set each `video` field in [`src/data/portfolio.ts`](src/data/portfolio.ts). Exact filename examples are in [`public/videos/README.txt`](public/videos/README.txt).
- **Portrait:** `public/kwete-junior.jpg` is the owner-provided personal photo.
- **Credentials:** The owner-provided [Google Project Management specialization](https://www.coursera.org/account/accomplishments/specialization/HDRAWMICVJ79) verifies the recipient, completion date, and all seven linked course certificates. These are course/specialization certificates, not academic degrees. Other credentials can be added after their public verification links are supplied.
- **GitHub progress:** The home page and `#/github` Observatory load repository data from GitHub's public REST API. The activity calendar uses the exact daily counts and intensity levels from the public GitHub profile, not the latest 100 commits. Weekly rhythm sums the same days into Sunday–Saturday weeks, including partial weeks. These are **contributions**, including eligible commits, issues, pull requests, and reviews; publicly shared private-activity counts may also appear. GitHub's own calendar dates and eligibility rules are preserved.
- **Fonts:** DM Sans and Manrope are served locally through Fontsource. The only external runtime requests are public GitHub data and the GitHub avatar.

## Refresh the GitHub calendar

```sh
npm run refresh:github
```

The Node collector downloads the public, signed-out [GitHub contribution calendar](https://github.com/users/Suraku237/contributions). It joins each dated cell to its exact tooltip count, preserves GitHub's intensity level, and validates consecutive dates and the sum against GitHub's reported total before replacing [`src/data/github-contributions.json`](src/data/github-contributions.json). An HTML format change or failed request stops collection; it never generates zero-filled replacement data.

- Development reads the bundled JSON; run the refresh command to update it.
- Production first displays the bundled verified calendar, then checks the newer JSON on this repository's `main` branch through GitHub's raw-content endpoint. Older remote data never replaces a newer bundled copy. A failed refresh keeps the dated snapshot and displays a notice; snapshots older than 48 hours are flagged.
- After these changes are pushed to `main`, the [refresh workflow](.github/workflows/github-contributions.yml) is scheduled every six hours and can be run manually from Actions. It commits only the generated calendar. Because the page reads the JSON directly from GitHub, a new site deployment is not needed for these refreshes. Enable Actions and allow its built-in token to write repository contents; branch protection may require adapting the save step. No personal token is needed or included in the website.
- GitHub may delay both contribution attribution and scheduled jobs. The page always shows its collection timestamp rather than claiming an instantaneous live calendar.
- If the portfolio repository or default branch changes, update the published JSON URL in [`useGitHubContributions.ts`](src/hooks/useGitHubContributions.ts) and the workflow branch.

## Verification sources

- [GitHub profile](https://github.com/Suraku237) and [public profile API](https://api.github.com/users/Suraku237)
- [GitHub repository API](https://api.github.com/users/Suraku237/repos?type=owner&sort=pushed&per_page=100) and [public contribution calendar](https://github.com/users/Suraku237/contributions)
- [Tickety mobile](https://github.com/Suraku237/tickety), [dashboard](https://github.com/Suraku237/tickety_website), and [API](https://github.com/Suraku237/tickety_backend)
- [SmartTutor](https://github.com/Suraku237/smart-tutor), including the in-app team credits
- [MarketFlow / SmartSchool](https://github.com/Suraku237/MarketFlow)
- [Smart Garden](https://github.com/Suraku237/agri_app)
- [Fast Travel](https://github.com/Suraku237/fast_travel)
- [Camfranglais Collector](https://github.com/Suraku237/francanglaiscompiler)
- [Village Games / Afriplay repository](https://github.com/Suraku237/village-games)
- [Google Project Management and seven course certificates](https://www.coursera.org/account/accomplishments/specialization/HDRAWMICVJ79)

Scroll reveals and subtle hover movement respect reduced-motion settings. Project filtering, mobile navigation, and dialogs work with a keyboard. External links open in a separate tab with `noopener noreferrer`; email links use the visitor's email application.
