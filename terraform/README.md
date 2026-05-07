# Terraform — Infrastructure as Code (SE202L Demo)

This folder satisfies the **Infrastructure as Code (Terraform)** requirement of the SE202L project.

It is **completely isolated** from the live deployment:

- It does NOT modify the running EC2 instance
- It does NOT touch the GitHub Actions pipeline
- It only creates a small, free, harmless demo resource (a Security Group)

You can apply and destroy it any number of times without breaking anything.

---

## What it does

`main.tf` declares a single AWS resource: a **Security Group** named
`warm-order-hub-tf-demo` with rules for HTTP (80), backend API (8080),
and SSH (22).

When applied, it appears in the AWS Console under
**EC2 → Network & Security → Security Groups**.

A commented-out section at the bottom of `main.tf` shows how Terraform
could *also* provision a full EC2 instance with Docker pre-installed.
Keep it commented for the demo — it's just there for illustration.

---

## One-time setup (do this BEFORE the demo)

### 1. Install Terraform

Linux:

```bash
sudo apt update
sudo apt install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | \
  sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
  https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install -y terraform
terraform -version
```

### 2. Install AWS CLI and configure credentials

```bash
sudo apt install -y awscli
aws configure
```

When prompted, enter:

- **AWS Access Key ID** — from AWS Console → IAM → Users → Security credentials
- **AWS Secret Access Key** — same place
- **Default region** — `ap-southeast-1` (or whichever region you used)
- **Default output format** — `json`

> If you don't have IAM keys, create them in:
> AWS Console → IAM → Users → (your user) → Security credentials → Create access key.

---

## Live demo (what to run in front of the instructor)

All commands are run from the `terraform/` folder.

### Step 1 — Initialize

```bash
cd terraform
terraform init
```

**What it does:** Downloads the AWS provider plugin.
**What to show:** "Terraform has been successfully initialized!" message.

### Step 2 — Preview the plan

```bash
terraform plan
```

**What it does:** Shows exactly what AWS resources will be created.
**What to show:** The "Plan: 1 to add, 0 to change, 0 to destroy." line.

### Step 3 — Apply (actually create the resource)

```bash
terraform apply -auto-approve
```

**What it does:** Creates the Security Group in AWS.
**What to show:**

- "Apply complete! Resources: 1 added, 0 changed, 0 destroyed."
- The **Outputs** block printed at the end (Security Group ID, name, region).

### Step 4 — Verify in AWS Console

Open the AWS Console:
**EC2 → Network & Security → Security Groups → Search "warm-order-hub-tf-demo"**

You'll see the Security Group with:
- Tag `ManagedBy = terraform`
- Inbound rules for ports 80, 8080, 22

This **proves** Terraform created real infrastructure.

### Step 5 — Tear it down (clean up)

```bash
terraform destroy -auto-approve
```

**What it does:** Removes the Security Group.
**What to show:** "Destroy complete! Resources: 1 destroyed." — and refresh AWS Console to show the SG is gone.

---

## How to explain it to the instructor (script)

> "For the Terraform requirement, I defined my AWS infrastructure as code in
> `terraform/main.tf`. Right now it provisions a tagged Security Group, but
> the same pattern scales to EC2 instances, VPCs, etc. — I left an example
> of EC2 provisioning commented out in the file.
>
> When I run `terraform plan`, it shows me exactly what will change. When I
> run `terraform apply`, Terraform calls AWS APIs to create the resource,
> and you can see it appear in the AWS Console. When I run
> `terraform destroy`, it cleans everything up. This is reproducible — I
> can recreate the exact same infrastructure in any AWS account just by
> running this code."

---

## What outputs to capture for your report

After `terraform apply`, take screenshots of:

1. The terminal showing **"Apply complete! Resources: 1 added"** + the Outputs block.
2. The **AWS Console** Security Groups page showing `warm-order-hub-tf-demo`.
3. The terminal after `terraform destroy` showing **"Destroy complete!"**.

These three screenshots are enough to demonstrate the full IaC lifecycle.

---

## Why this doesn't break anything

- The Security Group is named `warm-order-hub-tf-demo` (different from your live one)
- It is **not attached** to any EC2 instance
- It uses a separate Terraform state file (`terraform.tfstate`)
- The CI/CD pipeline (`.github/workflows/ci-cd.yml`) does NOT run any Terraform commands

So whether or not Terraform has been applied, your application keeps deploying normally.
