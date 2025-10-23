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

2. Deploy database, load data into database, deploy backend

   `chmod +x ./deploy.sh && ./deploy.sh`
