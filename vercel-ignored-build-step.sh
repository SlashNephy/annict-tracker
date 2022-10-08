#!/usr/bin/env bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

for branch in "master" "main" "develop" "dev" "staging"; do
  if [[ "$VERCEL_GIT_COMMIT_REF" == "$branch" ]]; then
    echo "✅ - Build can proceed"
    exit 1;
  else
    echo "🛑 - Build cancelled"
    exit 0;
  fi
done
