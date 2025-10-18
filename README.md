# OpenERP

## Work In Progress

---

## Prerequisites

- Docker installed and running
- `kubectl` installed
- `kind` CLI installed

---

1. Create a single-node Kubernetes cluster inside Docker ( using `Kind`)
   `kind create cluster`

2. Deploy PostgreSQL Stateful Set with persistent storage
   `kubectl apply -f k8s/db/`

3. Allow Pods to start. Monitor for 3 pods to start
   `kubectl get pods -w`
