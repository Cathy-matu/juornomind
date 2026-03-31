#!/bin/bash
set -e

# Backend helper script for JournoMind Connect
# 1) fix CORS origin list
# 2) update env settings
# 3) commit with context message

REPO_ROOT="/home/nimomatu/Projects/juornomind/journomind-connect-backend"
cd "$REPO_ROOT"

update_cors() {
  echo "Updating CORS allowed origins..."
  python - <<'PY'
from pathlib import Path
f = Path('app/main.py')
text = f.read_text()
old = '"https://juornomind.vercel.app",'
if 'https://juornomind.vercel.app' not in text:
    text = text.replace('os.getenv("FRONTEND_URL", "http://localhost:5173")', '"https://juornomind.vercel.app",\n    "https://journo-backend.vercel.app",\n    os.getenv("FRONTEND_URL", "http://localhost:5173")')
    f.write_text(text)
PY
}

update_env() {
  echo "Updating .env placeholders for production connectivity..."
  cp .env .env.bak || true
  sed -i 's|^FRONTEND_URL=.*|FRONTEND_URL=https://juornomind.vercel.app|' .env
  if ! grep -q '^BACKEND_URL=' .env; then
    echo 'BACKEND_URL=https://journo-backend.vercel.app' >> .env
  fi
}

commit_changes() {
  local msg="$1"
  if [[ -n $(git status --porcelain) ]]; then
    git add app/main.py app/config.py
    if git check-ignore -q .env; then
      echo ".env is ignored by git; skipping .env add"
    else
      git add .env 2>/dev/null || true
    fi
    git commit -m "$msg"
    echo "Committed: $msg"
  else
    echo "No files changed. Nothing to commit."
  fi
}

# run all tasks
update_cors
update_env
commit_changes "chore: configure CORS for Vercel frontend/backend URLs and set .env in docs"
