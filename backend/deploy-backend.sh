#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="backend"
TAG="latest"
KIND_CLUSTER="kind"

K8S_BACKEND_DIR="k8s/backend"
K8S_DB_DIR="k8s/db"
BACKEND_DIR="backend"

echo "-- Cleaning previous deployments..."
kubectl delete -f "${K8S_BACKEND_DIR}/service.yaml" --ignore-not-found
kubectl delete -f "${K8S_BACKEND_DIR}/deployment.yaml" --ignore-not-found

echo "-- Building Docker image ${IMAGE_NAME}:${TAG}..."
docker build -t "${IMAGE_NAME}:${TAG}" "${BACKEND_DIR}"

echo "-- Loading image into Kind cluster '${KIND_CLUSTER}'..."
kind load docker-image "${IMAGE_NAME}:${TAG}" --name "${KIND_CLUSTER}"

echo "-- Applying database manifests..."
kubectl apply -f "${K8S_DB_DIR}/postgres-secret.yaml"
kubectl apply -f "${K8S_DB_DIR}/postgres-statefulset.yaml"
kubectl rollout status statefulset/postgres

echo "skipping import for now..."
# echo "-- Loading data into Database..."
# kubectl apply -f "${K8S_DB_DIR}/osm2pgsql.yaml"
# echo "⏳ Waiting for data to be loaded.."
# kubectl wait --for=condition=complete job/osm-import-job --timeout=600s

echo "-- Applying backend manifests..."
kubectl apply -f "${K8S_BACKEND_DIR}/deployment.yaml"
kubectl apply -f "${K8S_BACKEND_DIR}/service.yaml"

echo "-- Waiting for backend deployment to rollout..."
kubectl rollout status deployment/rust-backend

echo "-- Deployment completed!"
echo ""
echo "To access backend locally, run:"
echo "kubectl port-forward svc/rust-backend 8000:8000"
