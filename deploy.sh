#!/usr/bin/env bash
set -euo pipefail

echo "Starting full project deployment..."

echo "Deploying backend..."
./backend/deploy-backend.sh
./frontend/deploy-frontend.sh

echo "✅ All deployments completed!"