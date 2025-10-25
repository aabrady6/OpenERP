#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="frontend"
TAG="latest"
KIND_CLUSTER="kind"
FRONTEND_DIR="frontend"
K8S_FRONTEND_DIR="k8s/frontend"

echo "Building Docker image frontend:latest..."
docker build -t frontend:latest ./frontend

echo "Loading frontend image into Kind cluster 'kind'..."
kind load docker-image frontend:latest --name kind

echo "Applying frontend manifests..."
kubectl apply -f k8s/frontend/deployment.yaml
kubectl apply -f k8s/frontend/service.yaml

echo "Waiting for frontend deployment to rollout..."
kubectl rollout status deployment/frontend
