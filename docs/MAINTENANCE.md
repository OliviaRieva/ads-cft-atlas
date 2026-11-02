# Daily maintenance

This repository runs a bounded, clearly automated maintenance routine. It does not manufacture activity or promise a daily contribution square.

## Schedule and scope

- Every day at **09:17 Europe/Copenhagen**, GitHub Actions installs the locked dependencies, builds the site, checks TypeScript and runs the tests.
- After a successful scheduled/manual run, it refreshes only [`CONTENT_INDEX.md`](CONTENT_INDEX.md) if the authored content inventory has actually changed. The commit is attributed to `github-actions[bot]`, not presented as Olivia's manual work.
- The same validation runs on pull requests and pushes to `main`, but those runs cannot publish an index update.
- Dependabot checks npm and workflow dependencies at **09:47 Europe/Copenhagen**, including weekends. It proposes updates in pull requests, with at most two npm update PRs and one Actions update PR open. Nothing is automatically merged.
- Failed validation makes no source changes. Runs and failures are visible in the [Actions tab](https://github.com/OliviaRieva/ads-cft-atlas/actions/workflows/daily-maintenance.yml).

This is deterministic repository maintenance, not an autonomous AI author. There is no paid AI connection configured. It does not rewrite scientific explanations, alter equations, delete files, add questions, change the live website, or touch learner data. Those changes still need a separately reviewed implementation.

## Stop or pause

To stop **all** scheduled maintenance, do both:

1. Open **Actions → Daily maintenance → ⋯ → Disable workflow**. Cancel any already-running maintenance run too.
2. Edit `.github/dependabot.yml` and set `open-pull-requests-limit: 0` for **both** ecosystems, or remove that configuration file. Existing dependency PRs remain for you to close or review. Security-alert updates, if enabled separately, are a separate setting.

Alternatively, ask Codex to stop daily maintenance in this repository. It should disable the workflow, cancel outstanding maintenance runs and pause both Dependabot version-update entries, without deleting project files or closing your other work.

For a temporary pause of daily checks/index updates while keeping push/PR validation, set repository Actions variable `ATLAS_MAINTENANCE_PAUSED` to `true`. This variable does **not** pause Dependabot; use step 2 for that. Remove the variable or set it to `false` to resume.

GitHub schedules are best-effort, not exact-time guarantees. Public-repository schedules can be disabled after 60 days with no repository activity. Re-enable through Actions if that happens; the routine will not create meaningless commits to prevent inactivity.

## Safety and test boundaries

Validation jobs have read-only repository permissions and do not retain checkout credentials. The small writer job does not check out or execute project code; it can only publish the generated index after the tested `main` revision is still current. If `main` changes during a run, the write is skipped. It uses GitHub's short-lived workflow token, not a personal access token or hosting credential.

The index contains no timestamp, rotating text, or run counter, so identical content produces no commit. Dependency updates use reviewable bot PRs. Automatic bot activity is not represented as personal daily coding.

Two source-provenance tests skip in clean GitHub checkouts because the private local `tmp/` source snapshots are deliberately excluded. Other content/rendering/physics tests still run. Passing tests is not proof of complete physics correctness or a new visual review.

## Local commands

```sh
npm ci
npm run build
npx --no-install tsc --noEmit
node --test tests/*.test.mjs
node scripts/maintenance-index.mjs --check
```

The live site still uses its separate Sites publication workflow. This automation never pushes to the Sites remote.
