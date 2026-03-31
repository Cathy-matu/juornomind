#!/bin/bash
set -e

# Frontend helper script for JournoMind
# Configures VITE_API_URL and commit

REPO_ROOT="/home/nimomatu/Projects/juornomind"
cd "$REPO_ROOT"

if [[ ! -f .env ]]; then
  echo "VITE_API_URL=https://journo-backend.vercel.app" > .env
else
  cp .env .env.bak || true
  if grep -q '^VITE_API_URL=' .env; then
    sed -i 's|^VITE_API_URL=.*|VITE_API_URL=https://journo-backend.vercel.app|' .env
  else
    echo 'VITE_API_URL=https://journo-backend.vercel.app' >> .env
  fi
fi

if [[ -n $(git status --porcelain --untracked-files=normal | grep -v '^?? .env.bak') ]]; then
  if git check-ignore -q .env; then
    echo ".env is ignored by git; skipping commit. Please add this manually if needed."
  else
    git add .env
    git commit -m "chore: set frontend VITE_API_URL to https://journo-backend.vercel.app" || true
    echo "Committed frontend .env update."
  fi
else
  echo "No changes to commit in frontend." 
fi
