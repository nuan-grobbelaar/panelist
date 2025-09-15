#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR/../frontend"
npm run build

cd "$SCRIPT_DIR/../backend"
rm -rf public
mkdir public
cp -r ../frontend/dist/* ./public/

docker compose build && docker compose up