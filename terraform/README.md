# Terraform — Infrastructure as Code

> A small, completely-isolated Terraform module that provisions a tagged AWS Security Group as code. It exists to satisfy the **Infrastructure-as-Code** requirement of the SE202L project without ever touching the live deployment.

## What this README is

This README explains the **`terraform/`** folder of the `warm-order-hub` repository. It walks you from "I just installed Terraform for the first time" to "I'm running the demo in front of the instructor and tearing it back down". By the time you finish reading you'll be able to:

- Understand exactly what `main.tf` does (and what it deliberately does **not** do).
- Install Terraform and AWS CLI on a fresh machine.
- Run the four-command IaC lifecycle: `init → plan → apply → destroy`.
- Capture screenshots that prove the resource was created in real AWS.
- Explain the demo to the instructor in plain English.

For everything else in the project (frontend, backend, CI/CD, EC2 deploy), see the top-level [`../README.md`](../README.md).

---

## Why this folder is "safe"

Terraform is powerful — `terraform destroy` against the wrong state file can wipe a whole environment. To prevent that, this module is intentionally tiny and decoupled from the live deployment:

- It does **not** modify the running EC2 instance.
- It does **not** modify any GitHub Actions workflow.
- It only creates a single, free, tagged **Security Group** named `warm-order-hub-tf-demo`.
- That security group is **not attached** to any EC2 instance, so destroying it cannot affect a running server.
- It uses its own state file (`terraform.tfstate` inside this folder), separate from anything else.

You can `apply` and `destroy` this module any number of times without breaking the application or running up an AWS bill.

---

## What `main.tf` actually does

`main.tf` declares one real AWS resource: a **Security Group** with three inbound rules.

| Resource                                    | Purpose                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `aws_security_group.warm_order_hub_demo`    | Tagged SG with ingress on **22 / 80 / 8080** and full egress.           |

**Tags written on the SG (so it's findable in the console):**

```
Name        = "warm-order-hub-tf-demo"
Project     = "warm-order-hub"
Course      = "SE202L"
ManagedBy   = "terraform"
Environment = "demo"
```

**Outputs** (printed after `terraform apply`, great for screenshots):

- `demo_security_group_id` — the AWS resource ID.
- `demo_security_group_name` — the human-readable name.
- `aws_region` — the region it landed in.

A **commented-out** block at the bottom of `main.tf` shows how the same module could *also* provision a full EC2 instance with Docker pre-installed. It's left commented so the demo doesn't accidentally spin up (and bill) a second server. Uncomment it only if you want to demo a Terraform-managed EC2 host as well.

---

## First-Time Setup (do this once before the demo)

### Prerequisites

- An AWS account with **IAM access keys** (Console → IAM → Users → *your user* → Security credentials → Create access key).
- A working terminal (Linux / macOS / WSL).

### 1. Install Terraform

**Linux (Ubuntu / Debian):**

```bash
sudo apt update
sudo apt install -y gnupg software-properties-common wget
wget -O- https://apt.releases.hashicorp.com/gpg | \
  sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
  https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install -y terraform
terraform -version          # confirm install
```

**macOS (Homebrew):**

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
terraform -version
```

### 2. Install AWS CLI and configure credentials

```bash
sudo apt install -y awscli      # or `brew install awscli` on macOS
aws configure
```

When prompted, enter:

- **AWS Access Key ID** — from IAM.
- **AWS Secret Access Key** — from IAM.
- **Default region name** — `ap-south-1` (this matches the `aws_region` default in `main.tf`). Change it if you prefer another region, *and* update the variable accordingly.
- **Default output format** — `json`.

> Sanity check: `aws sts get-caller-identity` should print your account number without errors.

---

## Running the Demo (four commands)

Run all of these from inside the `terraform/` folder.

### 1. `terraform init` — download the AWS provider

```bash
cd terraform
terraform init
```

**What it does:** Downloads the `hashicorp/aws` provider plugin (`~> 5.0`) into `.terraform/`, and creates a lock file (`.terraform.lock.hcl`) pinning the provider version.
**What to look for:** The line *"Terraform has been successfully initialized!"* near the end of the output.

### 2. `terraform plan` — preview the changes

```bash
terraform plan
```

**What it does:** Compares your `.tf` files to the current state and prints exactly what would change in AWS. Nothing is created yet.
**What to look for:** A `+ resource "aws_security_group" "warm_order_hub_demo"` block followed by *"Plan: 1 to add, 0 to change, 0 to destroy."*.

### 3. `terraform apply` — actually create the resource

```bash
terraform apply -auto-approve
```

**What it does:** Calls AWS APIs to create the Security Group and writes the result into `terraform.tfstate`.
**What to look for:**

- *"Apply complete! Resources: 1 added, 0 changed, 0 destroyed."*
- The `Outputs:` block at the very end with the SG id, name, and region.

### 4. Verify in the AWS Console

Go to **EC2 → Network & Security → Security Groups** and search for `warm-order-hub-tf-demo`. You should see:

- The SG with the **tags** listed above.
- Inbound rules for **22**, **80**, **8080** open to `0.0.0.0/0`.
- An "All outbound traffic" egress rule.

This is your proof that Terraform created real infrastructure.

### 5. `terraform destroy` — clean up

```bash
terraform destroy -auto-approve
```

**What it does:** Deletes everything Terraform created, in the right dependency order.
**What to look for:** *"Destroy complete! Resources: 1 destroyed."* — refresh the AWS Console and the SG is gone.

---

## Other Useful Commands

```bash
terraform fmt -recursive       # auto-format .tf files (run before commit)
terraform validate             # syntactic + provider-level validation
terraform show                 # human-readable view of current state
terraform state list           # list every resource in state
terraform output               # re-print just the Outputs block
terraform refresh              # reconcile state with actual AWS
```

If you need to change something:

```bash
# Edit main.tf, then:
terraform plan
terraform apply -auto-approve
```

If you need to **rename** without re-creating (rarely needed here):

```bash
terraform state mv aws_security_group.old_name aws_security_group.new_name
```

---

## Files in this Folder

| File                       | What it is                                                           | Commit it? |
| -------------------------- | -------------------------------------------------------------------- | ---------- |
| `main.tf`                  | The Terraform configuration (all resources, variables, outputs).      | yes        |
| `README.md`                | This file.                                                            | yes        |
| `.terraform/`              | Provider plugin cache created by `terraform init`.                    | **no** (gitignore) |
| `.terraform.lock.hcl`      | Pins the exact provider version for reproducibility.                  | yes        |
| `terraform.tfstate`        | The current state of your real AWS resources.                         | **no** in real teams (use a remote backend); fine to commit for this demo. |
| `terraform.tfstate.backup` | Auto-created backup of the previous state.                            | **no** (gitignore in real teams). |

---

## How to Explain the Demo to the Instructor

> *"For the Terraform requirement I defined my AWS infrastructure as code in*
> *`terraform/main.tf`. It currently provisions a tagged Security Group, but the same*
> *pattern scales to EC2 instances, VPCs, IAM roles — I left an example of EC2 provisioning*
> *commented out in the same file.*
>
> *When I run `terraform plan`, Terraform compares the code to the current AWS state and shows*
> *me exactly what would change — nothing is touched yet. When I run `terraform apply`, it calls*
> *the AWS APIs to create the resource, and I can see it appear in the AWS Console under EC2 →*
> *Security Groups, tagged with `ManagedBy=terraform`. When I run `terraform destroy`, it cleans*
> *everything up. The whole infrastructure is reproducible — anyone with my IAM keys can recreate*
> *the exact same setup in any AWS account by running the same four commands."*

---

## Screenshots to Capture for the Report

After `terraform apply -auto-approve`, take screenshots of:

1. The terminal showing **"Apply complete! Resources: 1 added"** plus the `Outputs:` block.
2. The **AWS Console** Security Groups page filtered to `warm-order-hub-tf-demo`, with tags and inbound rules visible.
3. The terminal after `terraform destroy -auto-approve` showing **"Destroy complete!"**.

These three frames are enough to prove the full IaC lifecycle (`init → plan → apply → destroy`).

---

## Why This Doesn't Affect the Live App

- The Security Group is named `warm-order-hub-tf-demo` (deliberately different from any SG attached to your real EC2 instance).
- It is **not attached** to any EC2 instance.
- It uses its own state file (`terraform.tfstate`) inside this folder.
- The CI/CD pipeline (`.github/workflows/ci-cd.yml`) does **not** run any Terraform commands — it only does `docker compose pull && up -d` over SSH.

So whether or not Terraform has been applied, the live application keeps deploying and serving traffic exactly the same way.
