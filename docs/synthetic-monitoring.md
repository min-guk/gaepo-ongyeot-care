# Staging synthetic monitoring

`.github/workflows/synthetic-inquiry.yml` runs daily and manually against an explicitly allowlisted HTTPS staging host. It uses fixed fictional `합성…점검` names and the reserved fixture `010-0000-0000`; no real person or production endpoint is contacted. The runner refuses a target equal to `SYNTHETIC_PRODUCTION_HOST`, does not print request/response bodies, and uploads no artifacts.

The API returns `confirmed` only after Discord returns a message ID, so workflow success is transitively tied to endpoint confirmation rather than a bare HTTP 2xx. Configure a staging Turnstile test token, staging privacy notice, and staging-only care/recruitment webhooks.

For independent failure notification, the designated maintainer must enable GitHub **Actions → workflow run** email notifications in their personal notification settings and watch this repository. Run the manual workflow with `force_failure=true`; it fails before network access. Save only the workflow URL, UTC time, conclusion, and receipt time of the GitHub email. Do not route the alert through Discord and do not store email contents or addresses in the repository. GitHub notification configuration and actual email receipt are operator-only evidence.
