# Ntools Engineering Guidelines

These are the coding standards for this repository. They apply to **new
code, and to any existing file you modify** — the current codebase does
not yet fully conform (see [Migration note](#8-migration-note)), and that
gap is being closed in a dedicated follow-up commit, not piecemeal inside
unrelated changes.

## 1. Purpose & scope

- Applies to all new files, and to any existing file touched by a change.
- Does **not** require retrofitting files you didn't otherwise need to
  touch. Don't expand an unrelated change into a drive-by refactor just to
  bring a file up to standard.
- Human contributors and Claude are both expected to follow this
  document. Claude is directed to do so via `.claude/engineering-guidelines.md`.

## 2. Project structure & layering

Every file has exactly one home, based on what it *is*, not what feature
it happens to belong to:

| Directory | What goes here | What does NOT go here |
|---|---|---|
| `src/app/model/` | TypeScript interfaces, types, enums — pure shape, no behavior | Any function, any logic |
| `src/app/service/<name>/` | General/application-level services: app state, storage, routing glue, cross-cutting UI concerns (`ThemeService`, `PopupService`, `RouteDataService`) | Domain/business calculations specific to one tool or feature |
| `src/app/logic/<domain>/` | Business/domain logic for a specific tool or feature — calculations, transformations, validation rules (`unit-converter`, `health-and-fitness`, `date-and-time`, `random-generator`) | App-level plumbing unrelated to a specific domain |
| `src/app/api/<name>/` | Services that call an external system/API (matches `api/contact/contact-us-api.service.ts` calling Appwrite) | Local-only logic that never leaves the browser |
| `src/app/util/` | Pure, stateless helper functions — no dependency injection, no side effects, no internal state | Anything that needs `@Injectable`, holds state, or calls another service |
| `src/app/config/` | Static data/config objects (`tools.config.ts`, `categories.config.ts`) | Logic, computed values, anything that changes at runtime |
| `src/app/ui/pages/` | Routed page components | Reusable presentational components (→ `ui/components`) |
| `src/app/ui/components/` | Shared presentational components used across pages | Route-level pages, tool implementations |
| `src/app/ui/tools/` | Individual tool implementations, referenced from `tools.config.ts` | Anything not registered as a tool |
| `src/app/ui/popup/` | Modal/popup content components, opened via `PopupService` | Inline page content |

**Rule of thumb:** if you're not sure whether something is a `service/`
or `logic/` concern, ask: "is this specific to one tool/feature's
domain, or is it app-wide plumbing?" Domain-specific → `logic/`.
App-wide → `service/`.

## 3. Naming conventions

| Type | File suffix | Example | Spec file |
|---|---|---|---|
| Service | `*.service.ts` | `tool.service.ts` | `tool.service.spec.ts` |
| Utility | `*.util.ts` | `string.util.ts` | `string.util.spec.ts` |
| Model | `*.model.ts` | `tool.model.ts` | *(not required — see §6)* |
| Config | `*.config.ts` | `tools.config.ts` | *(not required — see §6)* |
| Component | `*.component.ts` | `home.component.ts` | `home.component.spec.ts` |
| Directive | `*.directive.ts` | — | `*.directive.spec.ts` |
| Pipe | `*.pipe.ts` | — | `*.pipe.spec.ts` |

Spec files are always colocated next to the file they test, following
`*.<type>.spec.ts` — never in a separate `__tests__` or `test/` tree.

## 4. Separation of concerns

- Components handle presentation and orchestration only: binding data,
  handling user events, calling a service method, and rendering the
  result.
- **Every piece of business logic lives in a service** (`service/` or
  `logic/`, per §2) — never inline in a component method. If a component
  method has a non-trivial conditional, calculation, or transformation
  that isn't purely about UI state (open/closed, loading, selected tab),
  it belongs in a service.
- This isn't bureaucracy for its own sake: logic isolated in a service is
  unit-testable without a component test harness, which is what makes
  the coverage bar in §6 realistic rather than punishing.

## 5. Angular patterns

Codifies what's already consistent across this codebase, plus a couple
of forward-looking recommendations:

- **Standalone components only** — no `NgModule`s. Already 100% consistent
  in this codebase; keep it that way.
- **Strict TypeScript** — this repo's `tsconfig.json` already has
  `strict: true` plus `noImplicitOverride`, `noPropertyAccessFromIndexSignature`,
  `noImplicitReturns`, `noFallthroughCasesInSwitch`. Never use `any` to
  route around a type error — fix the type.
- **Typed reactive forms** (`FormControl<T>`, `FormGroup`) over template-driven
  forms, matching existing usage (`markdown-text-editor`, `unit-converter`).
- **Modern control-flow syntax** — `@if`/`@for`/`@switch`, not the
  structural directives `*ngIf`/`*ngFor`.
- **Constructor-based dependency injection** — matches every existing
  service/component in this codebase.
- **Recommended, not mandated, for new work:** `ChangeDetectionStrategy.OnPush`
  and Angular signals for component state (the pattern `ThemeService`
  already establishes for app-wide state). Existing components using
  default change detection are not required to be converted as a side
  effect of unrelated changes.

## 6. Testing standards

- A spec file must exercise real behavior — actual inputs, actual
  assertions on outputs, branches, and error paths. A bare
  `it('should create', () => expect(service).toBeTruthy())` with nothing
  else does not count as a test for coverage purposes, even though it
  technically executes code.
- **Coverage bar: 85% statements, branches, functions, and lines — per
  file**, for every new file and every existing file you modify. This is
  enforced by `karma.conf.js`'s `coverageReporter.check.each` and checked
  by running:

  ```
  ng test --no-watch --code-coverage
  ```

  Run this before committing. `*.model.ts` and `*.config.ts` files are
  excluded from the coverage check (see `angular.json`'s
  `codeCoverageExclude`) — they're pure types/static data with nothing
  to branch-cover.
- If you modify an existing file that has no meaningful tests (most of
  this codebase, today — see §8), **add them as part of that change**.
  Don't leave a file you just touched below the bar.
- Utilities in `util/` are pure functions — they have no excuse for
  being under-tested; every branch (including edge cases like empty
  strings, null, boundary numbers) should be covered.

## 7. Commit workflow

Before committing:

1. `ng build` — confirms the app still compiles.
2. `ng test --no-watch --code-coverage` — confirms new/changed files meet
   the 85% per-file bar.

## 8. Migration note

As of the introduction of this document, the existing codebase does
**not** meet these standards — most spec files are Angular CLI's default
placeholder tests, and `util/*.util.ts` plus a few services have no
tests at all. `ng test --no-watch --code-coverage` will fail today
(overall: ~20% statements, ~8% branches, ~8% functions, ~18% lines —
verified when this document and the coverage check were introduced).
This is expected: the gap is being closed in a dedicated follow-up
commit that brings the existing codebase up to this bar, not folded
into unrelated feature work. Until that lands, only the files you
actually touch are held to this standard.

Two specific pre-existing issues surfaced while verifying the coverage
check (previously masked by an unrelated compile error that blocked the
suite before it could even run) are worth flagging for that commit:

- `app.component.spec.ts`'s `AppComponent` test fails at runtime —
  `NullInjectorError: No provider for ActivatedRoute` — because
  `RouteDataService` (injected by `AppComponent`) depends on
  `ActivatedRoute`, which isn't provided in that spec's `TestBed`.
- The suite throws `ReferenceError: global is not defined` in an
  `afterAll` hook, originating from `convert-units`' `lodash.foreach`
  dependency chain — a Node global expected in a browser test
  environment. Likely fixable with a `global` shim in `src/polyfills.ts`.

## Future enhancement (not built yet)

A git-diff-aware coverage check (comparing changed files against a
coverage report, rather than a global per-file threshold) would more
precisely enforce "every *new* file" without the current codebase's debt
tripping the check on unrelated work. Worth revisiting once the
migration commit lands and the karma threshold is passing cleanly.
