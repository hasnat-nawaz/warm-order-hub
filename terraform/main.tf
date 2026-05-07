###############################################################################
# Warm Order Hub — Infrastructure as Code (Terraform)
#
# Purpose: Demonstrate the "Terraform" component of the SE202L DevOps project.
#
# What this file does (safely):
#   - Provisions a tagged Security Group in AWS named "warm-order-hub-tf-demo".
#   - This SG is NOT attached to any running instance, so applying/destroying
#     this Terraform code does NOT affect the live EC2 deployment in any way.
#
# How to demo:
#   1) cd terraform
#   2) terraform init
#   3) terraform plan
#   4) terraform apply -auto-approve
#   5) Show the new SG in AWS Console (EC2 -> Security Groups)
#   6) terraform destroy -auto-approve   (cleans up)
#
# Optional EC2 provisioning code is included BELOW (commented out) to show
# how the full server could also be defined as code. Leave it commented for
# the demo to avoid creating duplicate instances or extra AWS charges.
###############################################################################

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ─── Variables ───
variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "ap-south-1"
}

# ─── Demo Security Group (the only thing we actually create) ───
# Free, visible in AWS Console, and not attached to anything.
resource "aws_security_group" "warm_order_hub_demo" {
  name        = "warm-order-hub-tf-demo"
  description = "Terraform-managed demo SG for SE202L project"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend API"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "warm-order-hub-tf-demo"
    Project     = "warm-order-hub"
    Course      = "SE202L"
    ManagedBy   = "terraform"
    Environment = "demo"
  }
}

# ─── Outputs ───
# These print to the terminal after `terraform apply`. Great for screenshots.
output "demo_security_group_id" {
  description = "ID of the Terraform-managed demo security group"
  value       = aws_security_group.warm_order_hub_demo.id
}

output "demo_security_group_name" {
  description = "Name of the demo security group"
  value       = aws_security_group.warm_order_hub_demo.name
}

output "aws_region" {
  description = "AWS region the resources are deployed in"
  value       = var.aws_region
}

###############################################################################
# OPTIONAL — Full EC2 provisioning (commented out)
#
# Uncomment the block below to also let Terraform launch a fresh EC2 instance
# with Docker pre-installed. NOTE: This will create a SECOND server (not your
# current one), which costs money outside the AWS Free Tier window. Keep it
# commented for the basic demo.
###############################################################################
#
# data "aws_ami" "ubuntu" {
#   most_recent = true
#   owners      = ["099720109477"] # Canonical
#
#   filter {
#     name   = "name"
#     values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
#   }
# }
#
# resource "aws_instance" "warm_order_hub" {
#   ami                    = data.aws_ami.ubuntu.id
#   instance_type          = "t2.micro"
#   vpc_security_group_ids = [aws_security_group.warm_order_hub_demo.id]
#
#   user_data = <<-EOF
#     #!/bin/bash
#     set -e
#     apt-get update -y
#     apt-get install -y docker.io docker-compose-plugin git
#     systemctl enable --now docker
#     usermod -aG docker ubuntu
#   EOF
#
#   tags = {
#     Name      = "warm-order-hub-tf-server"
#     Project   = "warm-order-hub"
#     ManagedBy = "terraform"
#   }
# }
#
# output "instance_public_ip" {
#   value = aws_instance.warm_order_hub.public_ip
# }
