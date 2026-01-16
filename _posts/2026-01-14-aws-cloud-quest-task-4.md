---
layout: post
author: "Ayush Patne"
title: "AWS Cloud Quest Task 4: AWS Pricing (Spoiler: It Adds Up Fast)"
date: 2026-01-14
excerpt: Using AWS Price Calculator to estimate costs for a surf shop's cloud migration. Played around with instance types, scaling, and discovered that cloud bills can get wild real quick
tags:
  - AWS
  - Cloud-Computing
  - Pricing
  - "Cost-Optimization"
featured: false
featured_type: Technical
read_time: 4 min
---

Heya folks! Welcome back. This time we're helping a surf shop owner migrate to the cloud.

> btw this is part 4 of my AWS Cloud Quest series where i'm learning AWS and writing about it in sort of informal way, but i promise there are learnings in the blogs. if you missed previous tasks, you can check that out on the archives section of website.


## The Problem

So this guy has his servers set up on-premise (not on cloud.. pfft! imagine that?) and he wants to migrate to AWS (good move), but he's concerned about costs.

He noticed that his website is way more active during the day compared to night, so he was thinking..is there a way to make the servers flexible?

that's where we come in...put hand on his shoulder and tell him the solution. Whats the solution you may ask? That's right, AWS. 

## The Solution

The thing with AWS is you only pay for what you use. If you don't need servers running at night, you can shut down instances.

And the best part? AWS can match his exact hardware specifications on cloud.

But what if traffic increases? well guess what folks, AWS scales up as per the traffic and scales down when it reduces (v cool imo)

## AWS Pricing Calculator
So to figure out how much this whole setup will cost, we use the **AWS Pricing Calculator**.

> Vsit https://calculator.aws to check it out.

The calculator helps us estimate the "no-commitment" cost for our requirements. Basically, you select the region, pick the services you're gonna use, configure them, and it gives out the price. doesn't get simpler than this.

## The Task

Our main task was to estimate how much it'll cost to build a system for a website hosted on EC2 that has high traffic during the day and fairly low at night.

Here's what we had to estimate:

- 2 EC2 instances running all the time
- During peak hours, it can scale up to 4 instances
- Max 8 hours of peak scaling to prevent extra costs
- Calculate for both Mon-Fri and all 7 days scenarios

## Performing The Tasks

1. Create a new estimate group in the calculator
2. Compare EC2 instance types - went with **t3.micro** cos that was what the surf shop owner needed
3. Played around with EBS storage options and network-related stuff
4. Then we got introduced to different pricing models:
    - **On-Demand**: basically pay per hour/second for what you use
    - **Reserved Instances**: Commit for 1-3 years, get discounts
    - **Spot Instances**: Bid for unused capacity, way cheaper but can be interrupted

more or less just playing around with the calculator to see how things change.

5. Configured the scaling setup; 2 instances baseline, scaling to 4 during peak
6. Hit calculate and...

The price came out to be **over $1000 USD**??? that is mad expensive.. but hey, the surf shop owner was happy with it so yeah.

The good thing is for solving this, the surf shop owner gifted me a bike so now instead of skateboarding to client sites, i'm biking around. that's cool, makes getting around the city faster. 

(I mean if he can gift me a bike, he can afford 1000$ or more per month eh?)

## Final Thoughts

Yeah this was a short task but honestly very useful. Learning how to estimate cloud costs before actually spinning up resources is pretty important.. you don't want to get hit with a surprise bill at the end of the month... right?..

Anyways folks, See yalll in the next one :) 