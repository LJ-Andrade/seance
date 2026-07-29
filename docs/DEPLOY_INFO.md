# Deployment Information

Operational runbook for deploying and running the site in production. It is
written to be executed step by step by an agent or an operator with shell access
to the production VPS.

Read [Shared Server Rules](#shared-server-rules),
[Panel-Only Operations](#panel-only-operations) and
[Values To Confirm](#values-to-confirm) before running anything. The server hosts
other live sites, and several steps are destructive if applied carelessly.

## Hosting

Target: **Hostinger VPS managed with CloudPanel**, running the Next.js server
under PM2 behind CloudPanel's Nginx.

The application is a Next.js 16 App Router project living in `web/`. All 19
public pages (7 logical routes x 2 locales, plus `robots.txt`, `sitemap.xml` and
`_not-found`) are prerendered as static HTML at build time. A long-lived Node
process is still required, because three things run on the server:

1. The `next-intl` proxy (`web/proxy.ts`) that redirects `/` to `/es` and
   normalizes locale prefixes.
2. The contact form Server Action (`web/app/[locale]/contacto/actions.ts`), which
   calls the Brevo transactional email API.
3. On-demand image optimization for `next/image`.

CloudPanel supplies the per-site Linux user, the Nginx vhost that reverse-proxies
to the Node process, and the Let's Encrypt certificate. PM2 supplies process
supervision and boot persistence.

> CloudPanel UI labels vary slightly between versions. The navigation paths below
> describe CloudPanel v2; verify them in the panel rather than assuming.

## Shared Server Rules

**This VPS is shared with other production sites. Do not disturb them.**

### Port selection

The application port must be **discovered, never assumed**. `3000` is the
Next.js default and the value CloudPanel suggests, which makes it the most likely
port to already be taken by another Node app on this server.

Before choosing a port, list what is already listening:

```bash
sudo ss -tlnp
```

Also check the PM2 processes of every user that runs one. Then ask the operator
for the App Port of every existing CloudPanel Node.js/Reverse Proxy site — that
list is [panel-only](#panel-only-operations), and it is authoritative: a port can
be reserved by a site that is currently stopped, so it may look free in `ss` and
still collide later.

Then:

- Pick a free port above `3000` (e.g. `3001`, `3002`, ...) and record the chosen
  value in the [Values To Confirm](#values-to-confirm) table.
- Never bind to `80`, `443`, `8443` (CloudPanel admin UI), `22`, or `3306`.
- The port must match in **two** places: the `PORT` value in the PM2 ecosystem
  file and the App Port of the CloudPanel site. If they diverge, the vhost
  proxies to nothing and the site returns 502.
- Verify after starting that the process bound the intended port and nothing else
  was displaced.

### Never do these

- `pm2 kill`, `pm2 stop all`, `pm2 delete all`, `pm2 restart all` — these hit
  every app of that user, including other sites. Always scope commands by app
  name: `pm2 reload seance-web`.
- `pm2 resurrect` from a dump you did not write.
- Stopping, restarting, or reconfiguring another site's PM2 process, systemd
  unit, PHP-FPM pool, or database.
- Editing the global Nginx configuration. Site-specific changes belong in that
  site's vhost, through CloudPanel.
- `systemctl restart nginx`. If a reload is genuinely needed, validate first and
  reload instead of restarting, so live connections on other sites survive:
  `sudo nginx -t && sudo systemctl reload nginx`. Normally CloudPanel does this
  for you when a vhost is saved.
- Changing the system-wide Node.js version. Other sites may depend on the current
  one. Node version is per site in CloudPanel.
- Running `certbot` by hand. CloudPanel manages Let's Encrypt per site, and
  manual issuance conflicts with its renewal.
- Touching anything under another site's home directory.
- Rebooting the VPS.

### PM2 ownership

PM2 runs per Linux user, with a separate daemon and process list for each. Run
every PM2 command as the site user created by CloudPanel (`<SITE_USER>`), never
as root. That way this site's process list, `pm2 save` dump, and boot service are
isolated from the other sites on the server.

## Panel-Only Operations

**The agent has shell access to the VPS but no access to the CloudPanel UI.**
Anything that lives only in the panel must be requested from the operator, who
performs it and reports back. Never guess at panel state, and never reconstruct a
configuration file from memory.

Operations that are always the operator's:

| Operation | Why the agent cannot do it |
| --- | --- |
| Creating the site, setting the site user and Node version | Panel-only |
| Reading or editing the Nginx vhost | Panel-managed file; edited through the panel's Vhost editor |
| Reading the App Port of existing sites | Panel-only, and authoritative over `ss` output |
| Issuing or renewing the Let's Encrypt certificate | Panel-managed; manual `certbot` breaks renewal |
| Domain-level redirects | Panel-only |

### Vhost protocol

The vhost is the highest-risk file on a shared server: it is generated from a
CloudPanel template, contains managed `include` directives, and saving it reloads
Nginx for **every** site on the box. Follow this exchange every time.

**Step 1 — the agent requests the current vhost.** Ask the operator to open
Sites → `<SITE_DOMAIN>` → Vhost and paste the file **complete and verbatim**,
including comments, `include` lines and any block that looks auto-generated.
Suggested wording:

> Necesito el vhost actual del sitio para modificarlo sin romper nada. En
> CloudPanel: Sites → `<SITE_DOMAIN>` → Vhost. Copiá y pegá el archivo completo,
> tal cual está, sin recortar comentarios ni líneas `include`. Antes de pegarlo,
> guardá una copia aparte: es el punto de rollback.

**Step 2 — the agent never works from a partial file.** If the paste looks
truncated, or if `include` directives reference files whose content matters, ask
for the missing pieces before proposing anything. Do not fill gaps with a
reconstructed CloudPanel template.

**Step 3 — the agent returns one of two things, explicitly labelled:**

- **Full corrected vhost**, ready to paste over the existing content. Preferred
  when the change touches existing directives or their ordering. Must preserve
  every managed block and `include` exactly as received, and the reply must state
  what changed and why.
- **A snippet to add**, when the change is purely additive. Must specify the
  exact insertion point by quoting the surrounding lines from the file the
  operator sent — not "inside the server block", but "immediately after this
  line: `...`".

Never send a diff-style fragment without one of those two framings, and never ask
the operator to figure out placement on their own.

**Step 4 — the operator saves and reports.** CloudPanel validates and reloads
Nginx on save. The operator confirms: whether the panel accepted the change, that
`<SITE_DOMAIN>` still responds, and — because the reload is server-wide — that
the other sites on the VPS still respond. If the panel rejects the change or any
site breaks, restore the copy from Step 1 immediately, then diagnose.

## Values To Confirm

Replace every occurrence of these placeholders before running any command.

| Placeholder | Meaning | Status |
| --- | --- | --- |
| `<SITE_DOMAIN>` | Canonical public host, including subdomain (e.g. `www.laboratorioseance.com.ar`) | `seance.studiovimana.com.ar` (staging) |
| `<REDIRECT_DOMAIN>` | The non-canonical variant that 301s to `<SITE_DOMAIN>` (apex or `www`) | N/A for the staging subdomain |
| `<SITE_USER>` | Linux user CloudPanel creates for this site; owns the checkout and the PM2 daemon | `seance` |
| `<REPO_PATH>` | Absolute path of the checkout, inside the site user's home (e.g. `/home/<SITE_USER>/htdocs/<SITE_DOMAIN>`) | `/home/seance/htdocs/seance.studiovimana.com.ar/seance` |
| `<APP_PORT>` | Local port the Node server listens on. **Must be discovered** per [Port selection](#port-selection) — do not default to 3000 | `3010` (3000–3002 were already taken) |
| `<NODE_VERSION>` | Node.js version selected for the site (20.9+; 22 LTS recommended) | 22 (`v22.23.2`) |
| `<BREVO_API_KEY>` | Brevo transactional API key | Pending — form fakes success until set |
| `<BREVO_SENDER_EMAIL>` | Verified sender address in Brevo | Pending |
| `<CONTACT_TO_EMAIL>` | Inbox that receives contact submissions | Pending |

## Environment Variables

The distinction below is the most common source of production bugs.

### Build-time (inlined into the bundle by `next build`)

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Absolute origin, no trailing slash. Feeds canonical URLs, `hreflang` alternates, Open Graph and `sitemap.xml`. If it is missing, `web/lib/site.ts` falls back to `http://localhost:3000` and the deployed site ships broken SEO metadata. Changing it later requires a **rebuild**, not a restart. |

Store it in `web/.env.production` on the server (git-ignored by the root
`.gitignore`):

```bash
NEXT_PUBLIC_SITE_URL=https://<SITE_DOMAIN>
```

### Runtime (read by the server process on each request)

| Variable | Required | Notes |
| --- | --- | --- |
| `BREVO_API_KEY` | Yes | Transactional API key. |
| `BREVO_SENDER_EMAIL` | Yes | Must be a verified sender in Brevo. |
| `CONTACT_TO_EMAIL` | Yes | Destination inbox. |
| `PORT` | Yes | Must equal `<APP_PORT>` and the CloudPanel site's App Port. |
| `NODE_ENV` | Yes | `production`. |

While the three Brevo variables are unset, `web/lib/email.ts` intentionally
**logs the message and reports success to the user**. The form will look like it
works while every submission is silently dropped. Treat their absence in
production as an incident, not a warning.

Runtime variables are supplied through the PM2 ecosystem file so secrets stay
out of the repository tree. A restart (`pm2 restart seance-web`) is enough to
apply changes.

## First-Time Provisioning

### 1. Create the site in CloudPanel

Operator-performed ([panel-only](#panel-only-operations)). The agent supplies the
values and waits for the results.

In CloudPanel: Sites → Add Site → Node.js site (a Reverse Proxy site also works;
the app is supervised by PM2 either way, not by CloudPanel).

- Domain: `<SITE_DOMAIN>`.
- Node.js version: `<NODE_VERSION>`.
- App Port: `<APP_PORT>`, chosen per [Port selection](#port-selection).
- Site user: note the generated `<SITE_USER>` and its home directory.

Add `<REDIRECT_DOMAIN>` so the certificate covers both hosts.

### 2. System prerequisites

Confirm what is already installed before installing anything — other sites
depend on the current toolchain.

- Node.js `<NODE_VERSION>` available to `<SITE_USER>` (CloudPanel provides
  per-site Node versions; `node -v` as that user must report 20.9+).
- Git.
- PM2, available to `<SITE_USER>`. If it is not already installed globally,
  install it for that user rather than changing global packages other sites use.
- At least 2 GB of usable memory **free at build time**. `next build` is
  memory-hungry; on a small VPS it can be OOM-killed, and worse, memory pressure
  can trigger the kernel to kill another site's process. Check free memory and
  swap before building, and prefer building at low-traffic hours.

### 3. Checkout

As `<SITE_USER>`, clone the repository into `<REPO_PATH>` and check out `main`.

### 4. Configure the environment

Create `<REPO_PATH>/web/.env.production` with the build-time variable shown
above.

Create `<REPO_PATH>/ecosystem.config.cjs`:

```js
module.exports = {
  apps: [
    {
      name: "seance-web",
      cwd: "./web",
      script: "npm",
      args: "run start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        // Must match the CloudPanel site's App Port. Never assume 3000.
        PORT: "<APP_PORT>",
        BREVO_API_KEY: "<BREVO_API_KEY>",
        BREVO_SENDER_EMAIL: "<BREVO_SENDER_EMAIL>",
        CONTACT_TO_EMAIL: "<CONTACT_TO_EMAIL>",
      },
    },
  ],
};
```

Keep `instances: 1`. Cluster mode adds nothing here — the pages are static and
the only real per-request work is the contact form submission — while multiplying
the memory footprint on a shared box.

### 5. Install and build

As `<SITE_USER>`, from `<REPO_PATH>`:

```bash
npm ci --prefix web
```

```bash
npm run build --prefix web
```

The build must print `●  (SSG)` for the locale routes. If any route is marked
dynamic (`ƒ`), stop and investigate before deploying — it means something broke
static generation.

### 6. Start under PM2

As `<SITE_USER>`, from `<REPO_PATH>`:

```bash
pm2 start ecosystem.config.cjs
```

Confirm it bound the intended port and that nothing else changed:

```bash
pm2 status && sudo ss -tlnp | grep ":<APP_PORT>"
```

Persist this user's process list:

```bash
pm2 save
```

Install the boot service **scoped to the site user** (run as root, once):

```bash
sudo env PATH=$PATH pm2 startup systemd -u <SITE_USER> --hp /home/<SITE_USER>
```

Run the command it prints. Do not run a bare `pm2 startup` as root: that would
create a root-level service and mix this app with whatever else root supervises.

### 7. Vhost adjustments

Follow the [Vhost protocol](#vhost-protocol): request the current vhost from the
operator, then return either the full corrected file or a precisely placed
snippet. Everything below describes the *intended end state*, not a file to write
blindly.

CloudPanel already generates the reverse proxy to `127.0.0.1:<APP_PORT>`. What has
to be added:

```nginx
# Redirect the bare root to the default locale. Keep this as a real 301: it is a
# stronger signal than the application-level proxy redirect.
location = / {
    return 301 https://<SITE_DOMAIN>/es;
}
```

And, for the non-canonical host, a CloudPanel domain-level redirect (or its own
vhost) sending `<REDIRECT_DOMAIN>` to `https://<SITE_DOMAIN>$request_uri` with a
301. That one is panel-only — request it from the operator.

What to check in the received file, rather than change:

- The generated proxy block forwards `Host`, `X-Forwarded-For` and
  `X-Forwarded-Proto`. The default CloudPanel template does; confirm it, and only
  propose a change if a header is genuinely missing.
- No custom `Cache-Control` for `/_next/static`. Next.js already serves those
  assets as immutable, and overriding it breaks cache-busting after a deploy.
- No rule restricting request methods. The contact form is a `POST` to the page
  URL (Server Action); anything that blocks `POST` or strips its body breaks it.

Keep the change scoped to this site's block. The operator's save reloads Nginx
server-wide, so the neighbour check in [Verification](#verification) applies.

### 8. TLS

Operator-performed ([panel-only](#panel-only-operations)). Issue the certificate
from CloudPanel: Sites → `<SITE_DOMAIN>` → SSL/TLS → New Let's Encrypt
Certificate, covering both `<SITE_DOMAIN>` and `<REDIRECT_DOMAIN>`. Do not use
the `certbot` CLI.

## Release Process

As `<SITE_USER>`, from `<REPO_PATH>`:

1. `git pull` on `main`.
2. `npm ci --prefix web` (only needed when `package-lock.json` changed, harmless
   otherwise).
3. `npm run build --prefix web`.
4. `pm2 reload seance-web`.

The build must finish **before** the reload. Reloading first makes PM2 boot the
server against a half-written `.next` directory, which surfaces as intermittent
500s.

`pm2 reload seance-web` restarts without dropping connections. Use
`pm2 restart seance-web` only when runtime environment variables changed and you
want them re-read. Never use the `all` form of either command.

## Verification

After every deploy, confirm all of the following.

Both locales return `200`:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://<SITE_DOMAIN>/es
```

The root redirects to the default locale:

```bash
curl -sSI https://<SITE_DOMAIN>/ | grep -i '^location:'
```

The sitemap contains the production domain and not `localhost` — this is the
canary for a build made without `NEXT_PUBLIC_SITE_URL`:

```bash
curl -sS https://<SITE_DOMAIN>/sitemap.xml | grep -c '<SITE_DOMAIN>'
```

The canonical tag of a page points at the production origin:

```bash
curl -sS https://<SITE_DOMAIN>/es/nosotros | grep -o '<link rel="canonical"[^>]*>'
```

The contact form delivers a real email: submit it once and confirm the message
arrives at `<CONTACT_TO_EMAIL>`. A success message in the UI proves nothing —
see the Brevo note above.

Process health: `pm2 status` and `pm2 logs seance-web --lines 50`.

**Neighbour check.** Because the server is shared, confirm the other sites are
still up after provisioning or any Nginx-affecting change: load each of the other
domains hosted on this VPS, and confirm no other PM2 process changed state.

## Rollback

The build output is not versioned, so rolling back means rebuilding the previous
commit. As `<SITE_USER>`, from `<REPO_PATH>`:

1. `git log --oneline` to find the last known-good commit.
2. `git checkout <commit>`.
3. `npm ci --prefix web && npm run build --prefix web`.
4. `pm2 reload seance-web`.

To make rollbacks instant, switch to a release-directory layout (build into a
timestamped directory, symlink `current`, point PM2 at the symlink). Not set up
today.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| 502 from Nginx, app running fine | `PORT` in the PM2 env and the CloudPanel App Port disagree | Align both to `<APP_PORT>`, `pm2 restart seance-web`, save the vhost |
| `EADDRINUSE` on start | Chosen port already taken by another site | Re-run [Port selection](#port-selection), pick a free port, update **both** places. Never free the port by stopping the other process |
| Another site went down after this deploy | An `all`-scoped PM2 command, a global Nginx edit, or an OOM during build | Restore that site's process (`pm2 start` as **its** user), review what was run, rebuild at a low-traffic hour |
| Every route returns 500 with `SyntaxError: Unexpected non-whitespace character after JSON` | Corrupted `.next` cache (typically a dev server that kept running while files changed) | Stop the process, delete `web/.next`, rebuild |
| Canonical URLs, `hreflang` or `sitemap.xml` point to `localhost:3000` | `NEXT_PUBLIC_SITE_URL` was missing at build time | Set it in `web/.env.production` and **rebuild** (a restart will not help) |
| Form shows the success message but no email arrives | One or more Brevo variables unset; `lib/email.ts` logs and fakes success | Set all three in the PM2 env, `pm2 restart seance-web`, check `pm2 logs` for `[contact]` warnings |
| `next build` killed without an error message | Out of memory | Free memory or add swap, build at a low-traffic hour, or build in CI and ship the artifact (see `output: "standalone"`) |
| Intermittent 500s right after a deploy | Reloaded before the build finished | Rebuild fully, then `pm2 reload seance-web` |
| Site down after a server reboot | `pm2 save` / `pm2 startup` never completed for `<SITE_USER>` | Re-run both, scoped to the site user |

## Pending Production Inputs

These do not block deployment but are visible defects in production:

- No Open Graph image: `ogImage` is never passed to `buildMetadata`
  (`web/lib/seo.ts`), so shared links render without a preview.
- `siteConfig.social` (YouTube, Facebook, LinkedIn) still holds `#` placeholders;
  the About page video links to `#`.
- Product data-sheet buttons link to `#` — no real PDFs yet.
- `siteConfig.contact` and `siteConfig.footer` carry different emails and phone
  numbers. The footer values are the ones exposed in JSON-LD, so the discrepancy
  must be resolved.
- Business opening hours are still unconfirmed for the LocalBusiness structured
  data.

## Post-Launch

- Register both the `es` and `en` variants in Google Search Console and submit
  `https://<SITE_DOMAIN>/sitemap.xml`.
- Validate `hreflang` reciprocity and the JSON-LD graphs with the Rich Results
  Test.

## Alternatives Not In Use

- **Vercel**: root directory `web/`, no PM2/Nginx/TLS setup. Not the current
  target.
- **Static export** (`output: "export"`): would remove the Node process, but
  requires replacing the proxy redirect, the Server Action, and `next/image`
  optimization.

## Temporary local demos

For short-lived, non-production reviews, the local Next.js server can be shared
through a Cloudflare Quick Tunnel. The procedure, limitations, and shutdown steps
are documented in Spanish in [`TUNEL_TEMPORAL.md`](./TUNEL_TEMPORAL.md).
