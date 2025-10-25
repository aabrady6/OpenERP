#!/usr/bin/env bash
set -euo pipefail

K8S_INGRESS_DIR="k8s/ingress"

echo "Deploying Ingress Controller and Ingress Resource..."

if ! kubectl get namespace ingress-nginx &>/dev/null; then
  echo "Installing NGINX Ingress Controller..."
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
else
  echo "NGINX Ingress Controller already installed, skipping..."
fi

# Wait for controller
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=180s

# Wait for webhook
kubectl wait --namespace ingress-nginx \
  --for=condition=available pod \
  --selector=app.kubernetes.io/component=admission-webhook \
  --timeout=180s || true

# Apply ingress with retry
until kubectl apply -f "${K8S_INGRESS_DIR}/ingress.yaml"; do
  echo "Waiting for admission webhook to be ready..."
  sleep 5
done

if [ -f "${K8S_INGRESS_DIR}/ingress.yaml" ]; then
  echo "Applying ingress resource..."
  kubectl apply -f "${K8S_INGRESS_DIR}/ingress.yaml"
else
  echo "Error: Ingress manifest not found at ${K8S_INGRESS_DIR}/ingress.yaml"
  exit 1
fi

echo "Checking ingress resources..."
kubectl get ingress


echo ""
echo "Ingress deployed successfully!"
echo "Open http://localhost:8080/ to explore!"

kubectl port-forward --namespace ingress-nginx service/ingress-nginx-controller 8080:80
