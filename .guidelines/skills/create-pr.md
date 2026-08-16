# create-pr: draft PR from the current branch to `main`

Detailed procedure for the `/create-pr` skill (`.claude/skills/create-pr/SKILL.md`).
Follow these steps in order, every time. Works from whatever branch is
currently checked out — never hardcode a source branch — always targets
`main`.

## 1. Preconditions — stop if any of these fail

- `git fetch origin main` — get the latest `main` before comparing.
- `git branch --show-current` — if the result is `main`, stop. There's
  nothing to PR from `main` to itself.
- `git status --short` — must be empty. This skill **never
  auto-commits**. If the tree is dirty, stop and ask the user to commit
  or stash first.
- `git log origin/main..HEAD --oneline` — must be non-empty. If there
  are no commits ahead of `origin/main`, stop; there's nothing to PR.
- `gh pr list --head <branch> --state open --json url,number` — if an
  open PR already exists for this branch, stop and report its URL
  instead of creating a duplicate.

## 2. Push the branch

- No upstream configured (`git rev-parse --abbrev-ref --symbolic-full-name @{u}` fails) → `git push -u origin <branch>`.
- Upstream exists but local is ahead → `git push`.
- **Never force-push**, under any circumstance in this skill.

## 3. Gather PR content

- `git log origin/main..HEAD` — full commit messages (subject + body),
  not `--oneline`. This is the primary source for the PR description.
- `git diff origin/main...HEAD --stat` — shape-of-changes overview, for
  context when drafting the Summary.

## 4. Draft the PR

**Title** — a short, imperative summary of the overall change. A single
commit's subject line is usually fine as-is. Multiple commits: write
one title that covers the arc of the work, not a concatenation.

**Body**, in this order:

- `## Summary` — bullet points on what changed and why, drawn from the
  commit subjects/bodies. Not a mechanical file-by-file listing.
- `## How it was tested` — pulled from verification/testing details
  already documented in the commit bodies (this repo's commits
  routinely include "Verified: ..." sections — reuse that text
  directly). **Never fabricate testing claims that aren't evidenced in
  the commit history.** If a commit in range doesn't document what was
  tested, say so explicitly in this section rather than inventing
  something plausible-sounding.
- `## Other information` — only when there's something worth flagging:
  manual follow-up steps mentioned in commits, migration notes,
  breaking changes. Omit this section entirely when there's nothing to
  add — don't pad it.

## 5. Confirm before submitting

Show the drafted title and full body in chat before running
`gh pr create`. This becomes public-ish content on GitHub once posted —
worth a last look before it's out there.

## 6. Create the PR

```
gh pr create --base main --head <branch> --draft --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

Always `--draft`. Always `--base main`. `<branch>` is whatever
`git branch --show-current` returned in step 1.

## 7. Report

`gh pr create` prints the PR's URL as its own output. Print that URL
clearly as the final output of this skill so it's visible in the
terminal.

## Guardrails

- Never force-push.
- Never auto-commit uncommitted changes — stop and ask instead.
- Never target a base branch other than `main`.
- Never mark the PR ready-for-review — always `--draft`.
- Never fabricate "how it was tested" content not grounded in the
  actual commit history.
