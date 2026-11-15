# Secure Login Dashboard — Wajahat Irfan

A demo login + dashboard web app. Frontend only.

> **DEMO ONLY — no real authentication, NOT production security.**
>
> The "login" just compares what you type to the demo credentials in your own browser. There is no server, no database, and no real security. Never use this pattern for a real application — real authentication needs a server, hashed passwords, and sessions.

## What it does

- Login form with demo credentials shown on the page: username `demo`, password `demo123`.
- "Remember me" checkbox: when ticked, the demo session is saved in localStorage and the dashboard stays open across reloads. Without it, reloading returns to the login form.
- On correct credentials, shows a dashboard with live demo stats: demo users (3, sample), total logins in this browser (demo counter), security alerts (2, sample), and failed login attempts in this browser (demo counter) — plus a sample security-alerts list and sample activity list.
- On wrong credentials, shows an error message and counts the failed attempt.
- Logout returns to the login form and clears the remembered demo session.

## How to run

No build step and no backend. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally:

```bash
cd secure-login-dashboard
python3 -m http.server 8000
```

Then visit http://localhost:8000 in a browser and log in with `demo` / `demo123`.

## Skills shown

- HTML forms and page states (login view vs dashboard view)
- CSS layout (stat cards, warning banner)
- JavaScript (form handling, conditional UI, showing/hiding views, localStorage session + demo counters)

## Author

Wajahat Irfan — BS Computer Science student (7th semester), GPGC No. 1 Abbottabad.
