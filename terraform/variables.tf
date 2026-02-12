variable "instance_name" {
  description = "Learn terraform"
  type = string
  default = "learn-terraform"
}

variable "instance_type" {
    description = "The EC2 instance's type"
    type = string
    default = "t2.micro"
}

variable "keypair" {
  description = "Key pair for ssh"
  type = string
  default = "learn-ansible-terraform"
}