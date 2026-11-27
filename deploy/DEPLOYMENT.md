# Deployment — homelab stack

Self-hosted stack for the profile site on an always-on Ubuntu mini PC.
No router ports are opened: all traffic enters through a Cloudflare Tunnel.

```
Internet -> cloudflared (Cloudflare Tunnel) -> nginx (reverse proxy) ->
  your-domain.com          -> profile-app    (Next.js, :3000)
  analytics.your-domain.com -> umami          (analytics, :3000) + umami-db (postgres)
  status.your-domain.com    -> uptime-kuma    (status page, :3001)
```

CI/CD: every push to `main` builds the image in GitHub Actions and pushes it
to `ghcr.io/tenshinouta1979/myprofilesite:latest`; Watchtower on the mini PC
pulls it within ~60 s and restarts only `profile-app`.

## Files

| File | Purpose |
|---|---|
| `deploy/docker-compose.yml` | The whole stack |
| `deploy/nginx/conf.d/default.conf` | Routing + security headers (domain-agnostic) |
| `deploy/.env.example` | Copy to `deploy/.env` and fill in |
| `.github/workflows/deploy.yml` | Build/push to GHCR on push to `main` |

## 1. One-time setup on the mini PC (10.88.111.11)

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER   # log out/in afterwards
git clone https://github.com/tenshinouta1979/myProfileSite.git
cd myProfileSite/deploy
cp .env.example .env
```

Generate secrets and edit `.env`:

```bash
openssl rand -hex 32   # -> UMAMI_APP_SECRET
openssl rand -hex 32   # -> POSTGRES_PASSWORD
```

## 2. Cloudflare Tunnel

1. Zero Trust dashboard → **Networks → Tunnels → Create a tunnel** (cloudflared).
2. Copy the tunnel token into `CLOUDFLARE_TUNNEL_TOKEN` in `.env`.
3. Add three **Public Hostnames**, all pointing at service `http://nginx:80`:

   | Public hostname | Service |
   |---|---|
   | `your-domain.com` | `http://nginx:80` |
   | `analytics.your-domain.com` | `http://nginx:80` |
   | `status.your-domain.com` | `http://nginx:80` |

   Nginx routes on the `Host` header, so all three use the same internal service.

## 3. First launch

```bash
docker compose pull
docker compose up -d
docker compose ps
```

On first boot: open `https://status.your-domain.com` to create the Uptime Kuma
admin account, then `https://analytics.your-domain.com` (Umami default login
`admin` / `umami` — change it immediately).

### If the GHCR package is private

GitHub creates the package as private unless you flip it to public.
Either make it public in GitHub (Packages → package settings → change
visibility) or authenticate on the mini PC:

```bash
# PAT needs read:packages scope
echo <PAT> | docker login ghcr.io -u tenshinouta1979 --password-stdin
```

Compose mounts `~/.docker/config.json` into watchtower, so both `docker
compose pull` and watchtower reuse that login.

## 4. Umami tracking on the site

In Umami → Websites → Add website → copy the tracking code, then add it to
`app/layout.tsx` inside `<head>`:

```tsx
<Script
  src="https://analytics.your-domain.com/script.js"
  data-website-id="<your-website-id>"
  strategy="afterInteractive"
/>
```

(`import Script from 'next/script'`.)

## 5. Useful commands

```bash
docker compose logs -f nginx        # proxy traffic
docker compose logs -f cloudflared  # tunnel status
ssh -L 8888:127.0.0.1:8888 <user>@10.88.111.11   # then open http://localhost:8888 for Dozzle
docker compose up -d --force-recreate profile-app   # manual restart
```

## Troubleshooting

- **502 / site unreachable**: `docker compose logs cloudflared` — check the
  tunnel token and that all three public hostnames point to `http://nginx:80`.
- **Deploy not picked up**: `docker compose logs watchtower`; verify the
  `:latest` tag advanced (`docker inspect --format '{{.Image}}' profile-app`)
  and, for a private package, that `docker pull ghcr.io/tenshinouta1979/myprofilesite:latest`
  works on the host.
- **Umami won't start**: `docker compose logs umami-db` — usually a
  `POSTGRES_PASSWORD` mismatch after a previous boot; reset with
  `docker compose down -v` (destroys analytics data) and `up -d`.
- **Nginx config check**: `docker compose exec nginx nginx -t`.
