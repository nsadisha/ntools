# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ntools is an Angular 18 single-page app: a collection of small standalone utility tools (text editors,
calculators, converters, generators) organized into categories, deployed to Netlify.

## Engineering guidelines

Coding standards (file placement/naming, separation of concerns, Angular
patterns, and a per-file test coverage bar) are defined in
[.guidelines/engineering-guidelines.md](.guidelines/engineering-guidelines.md).
Follow them for new code and for any existing file you modify. Run
`ng test --no-watch --code-coverage` before committing.

## Commands

- `npm start` / `ng serve` — dev server at `http://localhost:4200/`, auto-reloads on change.
- `ng build` — production build, output to `dist/ntools`. Uses `environment.prod.ts` (see Environments below).
- `ng build --configuration development` (or `npm run watch` for watch mode) — dev build using `environment.dev.ts`.
- `ng test` — run unit tests via Karma/Jasmine.
- `ng test --include='**/tool.service.spec.ts'` — run a single spec file.
- `ng generate component ui/tools/my-tool` (or `directive|pipe|service|class|guard|interface|enum`) — scaffold using the project's schematics defaults (standalone components, SCSS styles).

No e2e test runner or lint script is currently configured in `package.json`.

## Architecture

### Tool registry pattern (core concept)

Tools are **not** individually routed. There is a single dynamic route, `tool/:code`
(`src/app/app.routes.ts`), handled by `DisplayToolComponent`
(`src/app/ui/pages/display-tool/display-tool.component.ts`). At runtime it:

1. Reads `:code` from the route.
2. Looks up the matching `Tool` via `ToolService.getToolFromCode()`.
3. Dynamically instantiates that tool's Angular `component` into a `ViewContainerRef`.

All tools are declared as data in `src/app/config/tools.config.ts` (array `tools: Tool[]`), each entry
pointing to a component under `src/app/ui/tools/<tool-name>/`. **Adding a new tool means:**

1. Add a `ToolType` enum value in `src/app/model/tool.model.ts`.
2. Build the standalone tool component under `src/app/ui/tools/<tool-name>/`.
3. Register it as a new entry in the `tools` array in `src/app/config/tools.config.ts`, wiring it to an
   existing `CategoryType` (or a new one — see below).
4. There is no separate route or module to register; `tool/:code` resolves it automatically once listed.

Categories follow the identical pattern: `CategoryType` enum in `src/app/model/category.model.ts`, data rows
in `src/app/config/categories.config.ts`, resolved dynamically via `category/:type`
(`DisplayCategoryComponent`). `CategoryService` / `ToolService` (`src/app/service/category`,
`src/app/service/tool`) are the read-only lookup APIs over that config data — there is no backing database
for tools/categories, it's all static in-repo config.

### Layered folders under `src/app`

- `model/` — TypeScript interfaces/enums (`Tool`, `Category`, and per-tool domain models like `bmi.model.ts`,
  `random.model.ts`).
- `config/` — static data/config: `tools.config.ts`, `categories.config.ts`, plus feature-specific config
  (e.g. `config/random/radom.config.ts`, `config/markdown/` for KaTeX/Mermaid setup, `appwrite.config.ts`,
  `application.config.ts` for app-wide constants like timeouts and input limits).
- `service/` — Angular injectables: `tool/`, `category/` (registry lookups), `local-storage/` (typed wrapper
  with keys centralized in `local-storage-keys.ts`), `popup/`, `route-data/` (drives the page header
  title/subtitle shown across pages, pushed from each page/tool component).
- `api/` — outbound integrations, currently `api/contact/contact-us-api.service.ts` calling Appwrite.
- `ui/pages/` — routed page components (home, all-tools, all-categories, display-tool, display-category,
  contact/*, error/not-found).
- `ui/tools/` — the actual tool implementations, one folder per tool, referenced from `tools.config.ts`.
- `ui/components/` — shared presentational components (e.g. `category-display-card`, `tool-display-card`,
  `markdown-display`).
- `ui/popup/` — modal/popup content components (e.g. `bmi-result-popup`), opened via `PopupService`.
- `util/` — pure helper functions (`string.util.ts`, `number.util.ts`, `object.util.ts`, `form.util.ts`,
  `constants.util.ts`) — prefer these over duplicating logic in components.
- `logic/` — tool-specific business logic split out from UI components, grouped by tool domain
  (`date-and-time`, `health-and-fitness`, `random-generator`, `unit-converter`).

### Third-party integrations

- **Appwrite** (`appwrite` SDK) is the backend for the Contact Us flows (send message / report bug / request
  tool). Config lives in `src/app/config/appwrite.config.ts`, reading endpoint/project/db/collection IDs
  from `src/environments/environment.ts`. These are populated via environment file replacement
  (`fileReplacements` in `angular.json`) between `environment.dev.ts` and `environment.prod.ts` — the
  checked-in `environment.ts` itself is a blank template.
- **ng-zorro-antd** is the UI component library used throughout; icons are registered centrally in
  `src/app/icons-provider.ts`.
- **ngx-markdown** + **marked**, with **KaTeX** (math) and **Mermaid** (diagrams) and **PrismJS**
  (syntax highlighting) wired in as global scripts/styles in `angular.json` and configured under
  `src/app/config/markdown/` — used by the Markdown Text Editor tool and `markdown-display` component.
- **convert-units** powers the Unit Converter tool; **crypto-random-string** powers the Random String
  Generator tool.

### Routing/header convention

Routes carry a `data: { title, subtitle }` payload consumed by a shared layout header. Dynamic routes
(`tool/:code`, `category/:type`) instead set `data: { back: true }` and push the real title/subtitle at
runtime via `RouteDataService.updateData()` once the resolved tool/category is known (see
`DisplayToolComponent.ngAfterViewInit`) — follow this pattern for any new dynamically-resolved route rather
than hardcoding route `data`.
