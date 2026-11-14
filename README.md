# WordPress Portfolio

Two custom WordPress themes and a functionality plugin, written to the WordPress Coding Standards and tested on WordPress 7.1.

[![CI](https://github.com/emediong/wordpress-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/emediong/wordpress-portfolio/actions/workflows/ci.yml)
![WordPress 6.6+](https://img.shields.io/badge/WordPress-6.6%2B-21759b?logo=wordpress&logoColor=white)
![PHP 7.4+](https://img.shields.io/badge/PHP-7.4%2B-777bb4?logo=php&logoColor=white)
![Code style: WPCS](https://img.shields.io/badge/code%20style-WPCS-2c3338)
![License: GPL-2.0-or-later](https://img.shields.io/badge/license-GPL--2.0--or--later-blue)

![The Lintel theme's front page](docs/screenshots/lintel-home.jpg)

## What's inside

| Package | Type | What it demonstrates |
| --- | --- | --- |
| [**Lintel**](themes/lintel) | Classic theme | PHP template hierarchy, reusable template parts, page templates, Customizer options with live preview, block patterns, block styles and `theme.json` |
| [**Commons**](themes/commons) | Block theme | Full Site Editing: HTML templates, template parts, patterns, style variations and section styles, with no custom PHP templates |
| [**Groundwork**](plugins/groundwork) | Plugin | Custom post types and a taxonomy, registered post meta, React blocks and an editor sidebar panel, a REST API endpoint, a secure contact form and privacy tools |

The themes and the plugin are independent. Each theme works on its own, and both gain extra sections when Groundwork is active.

## Lintel: classic theme for engineering and construction firms

The front page reads like an engineering drawing sheet: grid references along the top edge, a line drawing of a truss bridge that sets itself out once on load, and a title block of key facts. Services, projects, a client quote and the latest articles follow.

| Project case study | Projects archive with type filter |
| --- | --- |
| ![A single project page with its project data sheet](docs/screenshots/lintel-project.jpg) | ![The projects archive](docs/screenshots/lintel-projects.jpg) |

- **Templates:** `front-page.php`, `index.php`, `single.php`, `page.php`, `archive.php`, `search.php`, `404.php`, plus `single-gw_project.php`, `archive-gw_project.php` and service templates for the plugin's post types.
- **Template parts:** cards, page header, hero and front page sections, and a reusable `title-block` component used for company facts and project data.
- **Page templates:** "Page without title" for pattern-built pages, and "Landing page", which removes the menu for ad campaigns.
- **Customizer:** hero text, the four title block facts, the call to action and company details. Every option is declared once in [`inc/customizer.php`](themes/lintel/inc/customizer.php) and drives its setting, control, sanitiser and default.
- **Block editor:** six patterns (process steps, safety record, about, contact, FAQ, call to action), three block styles and a `theme.json`, so the editor matches the front end.
- **Navigation:** keyboard-accessible menu with submenu toggle buttons, Escape to close, and a fully expanded menu when JavaScript is off.

## Commons: block theme for non-profits

![The Commons theme's front page](docs/screenshots/commons-home.jpg)

- **Built from blocks:** eight templates and two template parts, editable in the Site Editor.
- **Patterns:** hero, programmes, an impact ledger, a community quote, ways to help, latest stories and a contact section. Strings live in PHP pattern files, so the whole theme is translatable.
- **Styles:** two style variations (Evening, a dark palette, and Indigo) and two section styles, all in JSON.
- **Typography:** body text in Atkinson Hyperlegible Next, a typeface designed for readers with low vision, under Zilla Slab headings.

### On phones

Both themes are built mobile-first. From left: Lintel's front page, a Lintel project, and Commons' front page.

![Lintel and Commons on a phone](docs/screenshots/mobile.jpg)

## Groundwork: site functionality plugin

| Project details panel (React) | Contact form validation |
| --- | --- |
| ![The block editor with the Project details sidebar panel](docs/screenshots/groundwork-editor.jpg) | ![The contact form showing errors next to each field](docs/screenshots/groundwork-form.jpg) |

- **Content model:** Projects (with a Project type taxonomy), Services and Testimonials. Each new project opens with a case study outline (brief, approach, outcome) set by a block template.
- **Editor panel:** project and testimonial fields are registered with `register_post_meta()`, so they are sanitised on save and edited in a React sidebar panel built with `@wordpress/components`.
- **Blocks:** Project grid, Testimonials and Contact form. All three are dynamic blocks rendered in `render.php`, with a live server-side preview in the editor, and are registered from a single blocks manifest.
- **Shortcodes:** `[groundwork_projects]`, `[groundwork_testimonials]` and `[groundwork_contact_form]` render the same blocks inside page builders such as Elementor.
- **Contact form:**
  - Works without JavaScript by posting to `admin-post.php`. With JavaScript it posts JSON to `POST /wp-json/groundwork/v1/enquiries` and shows errors next to each field, announced to screen readers.
  - Filters spam without a CAPTCHA, using a honeypot field, a signed timestamp that rejects instant submissions and a rate limit per IP address (stored as a hash).
  - Verifies a nonce, sanitises every field and validates on the server.
  - Emails the site owner with `Reply-To` set to the sender, and keeps a private copy that only administrators can read.
- **Privacy:** enquiries plug into the WordPress personal data exporter and eraser, and the plugin suggests text for the privacy policy.
- **Settings:** Settings > Groundwork sets the recipient, the success message and whether copies are kept, through the Settings API.
- **Extensible:** actions and filters such as `groundwork_enquiry_received` and `groundwork_project_details` let other code hook in.

## Standards

- **Coding standards:** every PHP file passes the WordPress Coding Standards and PHPCompatibility for PHP 7.4 and later, with no errors or warnings. JavaScript and CSS pass the `@wordpress/scripts` lint rules.
- **Security:** output is escaped late, input is sanitised and validated, forms use nonces, and settings, post meta and stored enquiries are protected by capability checks.
- **Accessibility:** skip link, visible focus styles, landmark regions, labelled form fields, keyboard-operable menus, and motion that respects `prefers-reduced-motion`.
- **Internationalisation:** every string is translatable, and a `.pot` file ships with each package.
- **Performance:** self-hosted fonts with the above-the-fold files preloaded, no jQuery, no external requests, and the contact form script only on pages that show the form.
- **Tested:** on WordPress 7.1.4 with PHP 8.3, on desktop and mobile widths. Every block pattern was loaded in the block editor and validated by WordPress's own block parser.

## Run it locally

### With wp-env (needs Docker)

```bash
npm install
npm run env:start
npm run env:demo:lintel      # or: npm run env:demo:commons
```

Open http://localhost:8888 and log in at http://localhost:8888/wp-admin with `admin` / `password`. The demo script fills the site with sample pages, projects, articles and menus, and can be run again at any time.

### On an existing WordPress site

1. Copy `themes/lintel` and `themes/commons` into `wp-content/themes`.
2. Copy `plugins/groundwork` into `wp-content/plugins`. The compiled `build` folder is included, so no build step is needed.
3. Activate Groundwork, then one of the themes.

## Development

```bash
npm install          # JavaScript build and lint tools
npm run start        # rebuild the plugin's blocks on every change
npm run build        # production build into plugins/groundwork/build
npm run lint         # ESLint and Stylelint, WordPress rules

composer install     # PHP_CodeSniffer and the WordPress standards
composer lint        # check every PHP file
composer lint:fix    # fix what can be fixed automatically
```

GitHub Actions runs the same checks on every push: PHP syntax on 7.4 and 8.3, the coding standards, the JavaScript and CSS lint, and a check that the committed build matches the source.

## Repository structure

```
.
├── demo/                      WP-CLI script and images for the demo content
├── docs/screenshots/          Images used in this README
├── plugins/
│   └── groundwork/
│       ├── includes/          One class per feature, plus template functions
│       ├── src/               Block and editor panel source (React, SCSS, render.php)
│       ├── build/             Compiled assets, committed so the plugin installs as is
│       └── languages/
├── themes/
│   ├── lintel/                Classic theme
│   │   ├── inc/               Setup, assets, Customizer, template tags
│   │   ├── template-parts/    Cards, components, front page sections
│   │   ├── page-templates/
│   │   ├── patterns/
│   │   └── assets/            CSS, JavaScript, fonts
│   └── commons/               Block theme
│       ├── templates/
│       ├── parts/
│       ├── patterns/
│       ├── styles/            Style variations and section styles
│       └── assets/
├── .github/workflows/ci.yml
├── .wp-env.json
├── composer.json
├── package.json
└── phpcs.xml.dist
```

## Licence

The code is licensed under the [GPL v2 or later](LICENSE), like WordPress itself. The bundled fonts (Barlow, Zilla Slab and Atkinson Hyperlegible Next) are licensed under the SIL Open Font License 1.1. All organisations, people, projects and quotes in the demo content are fictional.

## Author

**Innocent Emediong Friday**, frontend web developer, Port Harcourt, Nigeria.
[emediong.dev](https://emediong.dev) | [LinkedIn](https://www.linkedin.com/in/emediong-friday) | innocentemediong@gmail.com
