---
layout: post
title: "Task 1 - AWS Cloud Quest: City Building, Gorillas, and S3 Static Hosting"
date: 2026-01-12
excerpt: My first impressions of an AWS learning game that feels more like a town-builder than a technical course. Follow along as I create a questionable avatar, dodge a rogue gorilla, and help a mayor fix his city's wave forecast website using Amazon S3. A hands-on dive into bucket policies, versioning, and static hosting.
tags:
  - AWS
  - Amazon S3
  - Cloud Computing
  - Gamified Learning
  - Static Web Hosting
  - Cloud Quest
featured: false
featured_type: Technical
read_time: 8 min
---
first impressions, "did i accidentally open some online game?". The welcome screen looks like some town building game and fun music, immediately impressed. turns out, it is a city building game where i have to fix "city's problem" using aws.. so freaking cool.. 

man the music is catchy af 

anyways, we are given a map of city and buildings– and each building have some problems they are facing / task assigned to us for each problem. 

so, we are gonna start with the obvious task, "Cloud Computing Essentials".

but first, we had to create an avatar and you know, obviously, i went with.. that's right.. Suit with shorts. *PEAK FORMAL ATTIRE INNIT*

![][aws-cloud-quest-task-1-img-1.png]

anyways.. as soon as the tutorial starts– yo why tf was there a gorilla? and why he started running behind this dude? wtf? and guess what... this is not the strangest part apparently. 

![][aws-cloud-quest-task-1-img-3.png]

Mrs. Gorilla.. is not wearing a hat.. yeah thats totally strange dude... her attacking the dude is completely normal.

anyways so we then meet with the city's mayor and he describes the problem, it takes months to setup new resources and infra for the data centres. The residents they use some website to get wave forecasts, but it keeps breaking down 

so we recommend them to migrate to AWS and suggest if the website is static we can use S3 to host it. 

> Amazon S3 can be used to store and host static web pages. 
> It is a fully managed service and S3 handles all the server work for you; it also automatically   copies of data to multiple data centers to keep it safe. 

Learning Objectives:
1. Use bucket policy to secure an S3 bucket.
2. Enable static website hosting on S3. 
3. Test access to theh hosted webpage. 


![][aws-cloud-quest-task-1-img-2.png]


# What is S3?

- S3 is used for storage and retrieval of data. 
- The data is stored as objects (including the metadeta) and the container in which they are stored are called buckets. 
- When configured for website hosting, the s3 will have a dedicated URL. Requests to this URL, will serve the bucket's root object, in this case html file. 
- Access to bucket controlled through permissions, defined in Bucket Policy, which is written in JSON file.

### More Info:
- There are multiple storage classes of S3 depending on data profile and use cases. 
- AWS also provides a management tool for granular data control, called **S3 Storage Class Analysis** in which based on access patterns it will tell adequate Storage class, help with data transfer and S3 lifecycle policy (ie when to transfer to another storage class?, when does objects expire?, etc). This enables us to be cost efficient. 
- S3 supports batch operations, where with a single api request we can perform operations like copy, object tag sets, modify access controls, retrieve archived objects from S3 glacier (which is another storage class used to keep objects which dont need frequent or immediate access) on billions of objects. 
- S3 works with AWS Lambda, which enables us to log activities, set up alerts and automations. 
- We also have Query in place services which allow us to do big data analytics without the need to copy it seperately. 
- S3 also has CRR ie cross region replication and SRR that ie Same region replication. 
- S3 is also compatible with AWS's analytical services like Amazon Athena & Amazon Redshift. 
- Athena is used to execute SQL expressions to query data, but Redshift is more suitable for complex queries against data at rest and for larger data bases upto exabytes. 
- S3 Select is used to retrieve object subsets instead of whole objects (which can go upto 5 TB). This increases query performance by 400% and reduce query costs by 80%. 
- Versioning allows to keep multiple variants for objects. **The default is Unversioned.** Versioning-Suspended will stop creation of version IDs for new objects, but will keep existing object versions. This is done via Bucket Key & Version ID.  
- Once versioning is turned on, it cannot be set back to unversioned. One can implement "Version-suspending"
- Versioning allows us to recover accidentally deletion or overwrites. if versioning is enabled, incase of deletion it wont delete the object, but just put delete marker. Incase of overwrite, new version of object is created. Allowing us to preserve, retrieve and restore every version of object stored in S3. 

### Access Management 
- by default, the S3 buckets are privates. Only resource owner can access the records. 
- Owner can give access to others with the help of access policies. 
- There are two types, 
	- Resource based policies: Access policies attached resources. Ex: Bucket Policies, Access control lists (ACLs). Time limited access can be given with the help of query string authentication
	- User policies: Access policies attached to user. Ex: AWS IAM policies. 
- AWS recommends using bucket policies and IAM policies. 

#### Resource Based Policies 
1. ACL - Each bucket and object has ACL. It uses XML sequence which defines accounts and groups which have access to the attached resource and what kind of access. By Default, ACL gives full control to owner. 
2. Bucket Policy - Written in JSON. Defines access for all objects in said bucket. 

#### User Policies
User policies are also written in json. It defines who has access to S3 resources. You can use AWS IAM to control access and permissions, create groups and users, etc. 


---

This was step 1 of the task where we learned the above, now its time to practice. We are taken to AWS dashboard. Where we will now setup the website. 

I did the following steps to host the website, as guided by the tutorial:
1. Search for S3. Open S3 Page. 
2. There was a bucket existing already, with the website files in it. 
3. After few exploratory steps, check for permissions. Make sure public access is turned on. 
4. By default, AWS encrypts stuff and decrypts, but one can toy around with it i think for proper production database. 
5. Go to properties section and turn on static website hosting, an URL is generated. 
6. Thats it! If you now visit that URL you can access website. 

I am not attaching the URL, cos i think its temporary URL so yeah it will be deleted later ig. 

After this we had a DIY section, where I had to rename index.html to waves.html and validate it. 

Overall It was Very Cool! 10/10 Really enjoyed the experience. 

See you in next Task!

