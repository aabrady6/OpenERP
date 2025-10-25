#!/usr/bin/env bash
set -euo pipefail

echo "Starting full project deployment..."
chmod +x ./backend/deploy-backend.sh ./frontend/deploy-frontend.sh ./k8s/ingress/deploy-ingress.sh || true

./backend/deploy-backend.sh
echo "✅ Backend deployed!"
./frontend/deploy-frontend.sh
echo "✅ Frontend deployed!"
./k8s/ingress/deploy-ingress.sh

echo "✅ All deployments completed!"

echo "Open http://oerp.dev:8080 to explore!"