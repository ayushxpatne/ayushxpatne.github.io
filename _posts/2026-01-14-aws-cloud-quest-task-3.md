---
layout: post
title: "AWS Cloud Quest Task 3: Picking The Right EC2 Instance (it matters)"
date: 2026-01-14
excerpt: Learning about AWS Systems Manager, using EC2 Instance Connect to access servers without SSH keys, and optimizing instance types for better performance
tags:
  - AWS
  - Cloud-Computing
  - EC2
  - "#Systems-Manager"
featured: false
featured_type: Technical
read_time: 6 min
---
Hey hey hey! We are back, and this time we have a school with class scheduling problems. Very interesting. 

> btw this is part 3 of my AWS Cloud Quest series where i'm learning AWS and writing about it in sort of informal way, but i promise there are learnings in the blogs. if you missed previous tasks, you can check that out on the archives section of website.
## The Problem

So the school is already hosting the scheduling software on Amazon EC2 but its using too much compute power and memory, and this is slowing down the scheduling system. So we will be re-evaluating the computational needs and host it on a more suitable EC2 instance. Time to help!

After a quick brief of EC2 and what it is, we are introduced to AWS System Manager, and Session Manager. 

> TLDR: Session manager is a capability of AWS Systems Manager, which helps manage nodes better without the need of inbound ports and SSH key management. 

## AWS System Manager
AWS System Manager is a collection of features to help us manage our IT Infrastructure and simplifying managing applications and IT Inventory. (The name gives it away)

 **There are 4 core features:**
- Operations Management: The "System Manager OpsCenter "gives the central location where the engineers can view, investigate and resolve issues affecting the infra.
- Change Management: "System Manager Documents" can be used to automate common and repetitive maintenance, deployment, password resets etc. 
- Application Management: With the help of "System manager Application Manager", we can describe our Application components by  importing our metadata such as Cloud Formation Stacks, EC Service, Kubernetes Service, etc. to do operations management and change management. 
- Node Management: "AWS "Systems Manager Fleet Manager" helps us streamline management of servers running in the cloud or on premise. We have remote management capabilities which helps us configure and troubleshoot. 

### Use Cases:
- Centralised Operations: We can view Ops data in a single console itself, allowing to get insights from CloudWatch, AWS Cloud Train, Config, Third Party Tools, etc. 
- Implementing Best Practices such as automation for proactive processes (such as patching, maintenance, etc) at scale and reactive processes (such as diagnose and remediate operational processes) quickly. 
- Remediate security issue: We can enhance our security and compliance by analysing security incidents and prevent reoccurrence. 
- Auto resolve issues : We can automatically resolve issues using Ops Data. 

## SSH Connectivity & IAM
SSH connectivity through local terminal is the traditional access method, but it requires management and distribution of key-pairs. EC2 instance Connect implements AWS IAM policies and principles for SSH access control, eliminating the need of SSH Key-Pair management. 

## Instance Metadata
Instance metadata details (such as instance ID and type) become accessible through a web browser by configuring the instance metadata service and implementing user-data commands.

## Scaling Compute Performance
We can simply modify the EC2 instance type to a larger instance. 

![[Screenshot 2026-01-14 at 7.48.40 PM.png]]


## The Task
This task is similar to the task we did in last time, comparing EC2 instances, but then we have to use EC2 instance connect to view the instance metadata using the public IP.

1. We start of by going the EC2 page and comparing the types, and compare prices and stuff. 
2. Now, go back to instance page (not instance types), copy the public IP of the provided instance, and paste it on the website to see the metadata. 
3. Going back to the instance page, we will now use EC2 instance connect. 
4. For this, we select the instance and click on connect. Now we are taken to page with 4 options; EC2 Instance connect, SSH Client, Session Manager and EC2 Serial Console. 
5. As an exploratory step, we start of with reviewing the SSH Client Tab. We discover that this specific instance was created without an SSH Key Pair, so we cannot use SSH Client. 
6. We click on the Instance Connect and click on "Connect using Public IP". Click connect button. 
7. A terminal opens in new tab, and we have to check the sample app. 

>story time:  i've seen this terminal before.. back in my bachelors i had to work with AWS to set up a CI/CD pipeline and Jenkins. don't remember any of it now, but i do remember seeing this bird and going "oh lesgo we reached this step f\*\*\*\*ing finally". good times.

> Checking out the sample app. 

```
   ,     #_
   ~\_  ####_        Amazon Linux 2023
  ~~  \_#####\
  ~~     \###|
  ~~       \#/ ___   https://aws.amazon.com/linux/amazon-linux-2023
   ~~       V~' '->
    ~~~         /
      ~~._.   _/
         _/ _/
       _/m/'
[ec2-user@ip-10-10-0-10 ~]$ cd sample_app
[ec2-user@ip-10-10-0-10 sample_app]$ ls
__pycache__  app.py  aws_compute_solutions.log  requirements.txt  templates
[ec2-user@ip-10-10-0-10 sample_app]$ tail -f aws_compute_solutions.log
INFO:root:Instance Type is t3.micro
INFO:root:Instance Id is i-0ceaf982906f8f1cb
INFO:root:Availability Zone is us-east-1a
INFO:werkzeug:204.76.203.219 - - [14/Jan/2026 19:37:36] "GET / HTTP/1.1" 200 -
INFO:root:Instance Family is t3
INFO:root:Instance Type is t3.micro
INFO:root:Instance Id is i-0ceaf982906f8f1cb
INFO:root:Availability Zone is us-east-1a
INFO:werkzeug:31.205.40.143 - - [14/Jan/2026 19:54:12] "GET / HTTP/1.1" 200 -
INFO:werkzeug:31.205.40.143 - - [14/Jan/2026 19:54:13] "GET /favicon.ico HTTP/1.1" 404 -
```

> `"tail -f aws_compute_solutions.log"` is used to see the logfile.

8. After this, we close the terminal and stop the instance. 

### DIY Section
Then we are taken to the DIY Section of the Task, where our task was to change the instance type to `m4.large`. For this:
1. Make sure instance is stopped.
2. We go to Instance Settings, click on "Change instance type". 
3. We are taken to a new page, here we click on the drop down and choose our desired Instance type, in our case, `m4.large.` 
4. Scroll down and Click on "Change instance type".

AND DONEEE! WE SOLVED THE PROBLEM and in return we got basketball court. COOL. This one was really short i know, but hey, we learnt something didnt we?

See you in next task! :)