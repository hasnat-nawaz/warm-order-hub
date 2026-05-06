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
  default     = "ap-southeast-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the SSH key pair in AWS"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH into the instance"
  type        = string
  default     = "0.0.0.0/0"
}

# ─── Security Group ───
resource "aws_security_group" "warm_order_hub_sg" {
  name        = "warm-order-hub-sg"
  description = "Security group for Warm Order Hub"

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # HTTP (frontend via nginx)
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend API
  ingress {
    description = "Backend API"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # All outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "warm-order-hub-sg"
    Project = "SE202L"
  }
}

# ─── AMI Lookup (Ubuntu 22.04 LTS) ───
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ─── EC2 Instance ───
resource "aws_instance" "warm_order_hub" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.warm_order_hub_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    set -e

    # Update system
    apt-get update -y
    apt-get upgrade -y

    # Install Docker
    apt-get install -y docker.io docker-compose-plugin
    systemctl enable docker
    systemctl start docker
    usermod -aG docker ubuntu

    # Install Git
    apt-get install -y git
  EOF

  tags = {
    Name    = "warm-order-hub-server"
    Project = "SE202L"
  }
}

# ─── Outputs ───
output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.warm_order_hub.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of the EC2 instance"
  value       = aws_instance.warm_order_hub.public_dns
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i <your-key>.pem ubuntu@${aws_instance.warm_order_hub.public_ip}"
}

output "app_url" {
  description = "URL to access the application"
  value       = "http://${aws_instance.warm_order_hub.public_ip}"
}
