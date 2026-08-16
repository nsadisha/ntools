---
name: create-pr
description: Use when the user asks to create/open a pull request for the current work, or explicitly invokes /create-pr. Opens a draft PR from whatever branch is currently checked out to main via the gh CLI, with a Summary/How it was tested/Other information body synthesized from the branch's commit history, and prints the resulting PR URL.
---

# create-pr

Follow the full step-by-step procedure in
[.guidelines/skills/create-pr.md](../../../.guidelines/skills/create-pr.md)
exactly, in order: preconditions, push handling, content drafting, the
pre-submit confirmation, and the guardrails at the end (never
force-push, never auto-commit, always `--base main`, always `--draft`,
never fabricate testing claims not evidenced in commit history).

Works from any branch — never assume a specific source branch name —
always targets `main`.

If a precondition fails (dirty working tree, already on `main`, no
commits ahead of `main`, an existing open PR already covers this
branch), stop and explain why rather than pushing forward.
