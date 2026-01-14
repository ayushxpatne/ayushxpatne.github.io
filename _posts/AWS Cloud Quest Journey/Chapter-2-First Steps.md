Alright folks, we are back on it. Next task, Cloud First Steps. Here we will learn about EC2 and regions n stuff.. 

I think i was supposed to this first- but i accidentally did the cloud computing essentials before this. Well in my defence,  in the game there is no particular order of tasks specified. 

### Task 
There is a problem with city's stabilisation system. The system currently runs on just one server, and it is failing, the company had ordered more hard drives but they wont arrive for couple of days.. and we don't have time cos the system is failing again and again. Solution? EC2 servers. 

## What is EC2?
AWS EC2 is service which provides virtual servers in the cloud. Its flexible and can be setup in minutes. So like for example, in this case, there is hardware failure and we need to wait for days for new resources to come.. in EC2 that is not the case. We can create new servers in minutes. 

And the best part? we can make servers with specifications as per our needs. So like if we need a server with say 16 GB RAM and 2 vCPU, we can, but if we need another server with 32 GB ram, we can set it up within minutes. 

We can even run servers on different regions, so incase if one is not working, the other will. 

Our task is to set up 2 EC2 Servers. 

but before we do it, we have to learn more about it, starting off with AWS global infrastructure. 

## AWS Global Infrastructure
In this section we are briefed about how the AWS infrastructure and Data centers are located worldwide. 

- Amazon Regions : These are regions in which servers are available across geographical locations, basically regions with clusters of multiple data centres. 
- Availability Zones (AZ): Each region has multiple isolated data centres, called Availability Zones. 
	- Each Region has at least 2 AZs, most have 3 and can go upto 6. 
	- Each AZ have multiple discrete Data Centres, at least 1, typically 3. 
	- Each of these data centres have separate facilities and redundant power.
- Amazon Cloud Front : This is a global CDN service, allowing one to deliver content to end users with low latency and high transfer speeds, thanks to its many many PoPs ie Points of Presence.
- Partitioning : We can store/host/partition our app in multiple AZs, so that application is protected in case of natural disasters. 
	- We can use **AWS Elastic Load Balancer** to route data to another AZ incase one AZ faces outage. 

## EC2 - Detailed 
- EC2 stands for Elastic Compute Cloud.
- Its a service which provides virtual servers. 

### Advantages: 
- Eliminates the need of upfront hardware investment.
- Can be setup in minutes, as per our needs. 
- Easily resizable (resource wise), and easily scalable as per traffic, eliminating need of forecasting traffic. 
- Complete control on the resource. 
- Amazon provides 99.99% availablity and keeps security on top. 

#### Basics
- **Instance :** Instance is basically a virtual server in the cloud. 
	- There are multiple Instance Types, which allow you to select/customise instance as per your memory, cpu, gpu, storage and networking requirements. 
	- There are general purpose instance type, compute optimised instance type,  memory optimised instance type, etc depending on your need. 
	- Ex: 
		1. General Purpose : Balanced CPU, Memory & Network - Web Servers. 
		2. Compute Optimised : High CPU Utilisation - Game Servers
		3. Memory Optimised : High Storage Need - Big Data Analytics
		4. Storage Optimised : Sequential read & write access - Data warehousing. 
		5. Accelerated Computing : Hardware Accelerators - ML/DL
		6. HPC Optimised : High Performance processors needed - Complex simulations. 
- **Amazon Machine Intelligence (AMI)** : AMI provides information to launch an instance. Basically a template which has info like software configuration (say OS, Apps , Server, etc). We can launch single instance or multiple instance from an AMI. 
- **Amason Elastic Block Store (EBS):** Its a service providing block level storage volumes to use with EC2 Instances. 
	- They behave like raw unformatted external block device in cloud. 
	- Each EBS can be attached to only 1 EC2 instance at a time. 
	- Multiple EBS cab be attached to 1 EC2 instance. 
	- Since they are mounted to EC2, we get single digit millisecond latency- basically very very low latency. 
	- EBS are designed for high throughput and transaction intensive needs. 
	- EBS has data persistence. Data remains available even if EC2 instance is terminated. 
	- There are two types of storage provided. SSD and HDD. 
		- SSD : Frequent read write operations and small I/O. Ex: Databases. 
			- Two types of SSDs are offered: 
				1. Provisional IOPS SSD, for latency sensitive tasks like transactions. 
				2. General Purpose SSD, which provide price to usage balance.
		- HDD : These are for throughput intensive tasks. Ex: Map Reduce, data warehouse and log processing. 
			- Two Types of HDD:
				1. Throughput Optimised HDD, for tasks which are throughput intensive and frequently accessed. 
				2. Cold HDD, for data which is less frequently accessed. These have lower cost. 

aight now to the task. Launch EC2 instance and configure user data script to display instance details in browser. 

I did the following steps to host the website, as guided by the tutorial:

1. Search S3, Make sure the region is as specfied, North Virginia. 
2. On S3 page, select a bucket named "cloud first steps".
3. That bucket contained a txt file named user-data which basically is a web script that installs a web server to display the details on port 80.
4. Save/download the file, and search for EC2. Launch instance, name it, select Amazon Linux. 
5. Now to the instance types, we are asked to check out the available instance types, and then choose t3.micro which has 1GiB memory and 2 vCPUs, and network performance upto 5 GiB. 
6. We then proceed without having a key-pair, which is used to encrypt and decrypt data. We have a public key that encrypts the data and a private key which is used to decrypt the data. Together, since these are 2 keys, its called key-pair.  
7. Then in the network section we are asked to choose a vpc, ie Virtual Private Cloud, which is a virtual network in AWS. VPC Exists in a region, while subnets, each reside in a single AZ. 
8. Then we name the security group. The security group acts as a firewall and controls traffic for instance. Each instance can have multiple security groups and rules. 
9. Then we go to advanced settings, scroll all the way down to upload data, upload the saved file, and click launch. 
10. Then we click on "view all instances", and wait for the status to change to running. 
11. Once done, we copy the DNS link, and paste it on the web.. and... VOILAA!! we can see the instance is running and displaying the details. 

![[Screenshot 2026-01-13 at 2.28.46 PM.png]]

Then, in the DIY Section, we had to spin up another EC2 instance, but in a different availability zone. 

So I did the exact same steps to do it, but i think at first I selected the same availability zone- so it didnt pass the test. Then I checked if i can change, turns out I cant. I had to terminate this instance and spun up another. 

And thats it! We completed the task. The mayor gifted us a private island, and now neighbourhood is level 2... and now we have a pet. V COOL. 

Overall, its fun to learn AWS this way honestly. 

 I had Cloud Computing module in Bachelors, and will have it in my masters next semester, but it was not fun- it was theory and then assignments.. kinda boring.. but with the cloud quest, I am learning cloud the way i like; Aim, Learn what need to achieve aim, Achieve aim. The way the lessons are structured, X is facing Y problem, then telling us how we can solve it using AWS, then teaching us the components of solution and then finally implementing solution, I feel is a very nice way of teaching and works really well for me. 