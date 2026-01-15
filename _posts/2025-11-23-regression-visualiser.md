---
layout: post
author: "Ayush Patne"
title: "Making Regression Actually Make Sense: Building an Interactive Visualizer"
date: 2025-11-23
excerpt: Ever wondered how social media algorithms know you so well? I built one from scratch to find out, everything from basic scoring to embeddings, FAISS indexing, and the exploitation-exploration tradeoff. A deep dive into the math and code behind your For You page.
tags:
  - Machine Learning
  - Algorithms
  - Embeddings
  - FAISS
  - Recommendation Systems
featured: false
featured_type: Technical
read_time: 15 min
---
## TL;DR

Built an interactive regression visualiser to help students actually *see* what's happening when we fit a line or curve to data. The tool lets you play with linear regression using L1 error (think: how far are the points from the line?) and non-linear regression using L2 error with gradient descent (think: machine learning magic). You can tweak everything - slope, intercept, polynomial order, learning rate - and watch the math happen in real-time.

> **Here is the live demo if you wanna have a look: [Live Demo](https://regression-visualisation.onrender.com/visualize).**  
> It's hosted on Render Free Server - so yeah the instance might take a while to spin up. Be patient with it.

> **You can check out the chaotic code here: [GitHub](https://github.com/ayushxpatne/regression-visualisation)**

**Tech Stack:** Python, Flask, NumPy, Matplotlib, HTML/CSS/JavaScript

## Introduction

As an ML student, one of the first topics covered is always regression. Linear regression to be specific - you know, the classic "predict housing prices based on square footage" problem. Or "predict student grades based on study hours." These beginner-friendly examples are everywhere for a reason: regression is fundamental.

So when we were revisiting regression models in my master's program, I noticed my professor was trying really hard to make us *visualize* how regression actually works. How do you know if an equation is a good fit or not? She was using draw.io to manually plot points, draw a line, and then roughly sketch perpendicular lines to show the distance between the line and the points. 

It worked, like yeag she explained it very well but it made me think there had to be a better way. A more interactive way to help students understand regression, especially for those "aha!" moments when abstract concepts click into place.

Hence, I made a **Regression Visualiser**.

You can check it out here: [https://regression-visualisation.onrender.com/visualize](https://regression-visualisation.onrender.com/visualize)

**Be aware:** It's hosted on Render's free tier, so you may get a cold start page if you're trying to access it. Give it a minute.

## Linear Regression: The Basics

Let's start simple. Linear regression is all about finding the best straight line through your data points. 

The equation is straightforward:  
**y = mx + c**

Where:
- **m** is the slope (how steep the line is)
- **c** is the y-intercept (where the line crosses the y-axis)
- **x** is your input
- **y** is your output

Easy enough, right? But here's the real question: **How do we know if our line is actually good?**

### How to Check if the Line is a Good Fit: L1 Error

This is where the **L1 error** (also called L1 norm or Least Absolute Deviations) comes in.

The L1 error is calculated as:
$$
\text{L1 Error}= \sum \mid y_i - (mx_i + c) \mid

$$
In plain English: for each point in your dataset, you calculate the absolute difference between the actual y value and what your line predicts. Then you add up all those differences.

The smaller this number, the better your line fits the data. Simple as that.

**Why L1?** The L1 error is robust to outliers. If you have a few data points that are way off, L1 won't overreact to them like some other methods might. It treats all errors equally in terms of penalty - a small error and a large error both contribute their absolute value.

In my visualizer, you can manually adjust the slope (m) and intercept (c) using sliders and watch the L1 penalty update in realtime. The perpendicular lines show you exactly how far each point is from your line, and you can literally see the error shrink as you dial in better values.

## Non-Linear Regression: When Straight Lines Won't Cut It

Real world data is messy. Sometimes a straight line just doesn't work your data might follow a curve, a wave pattern, or something more complex.

This is where **polynomial regression** and **sine wave fitting** come in. Instead of just y = mx + c, we're now dealing with equations like:

$$ y = w_0 + w_1x + w_2x^2 + w_3x^3 \cdots w_nx^n $$

Or for sine waves:
$$y = \sin(2\pi x) $$

Initially I tried using random values as weights but that didn't work... The problem? You can't just guess the **weights** (w₀, w₁, w₂, etc.) like you might with m and c. There are too many of them, and they interact in complex ways.
### Enter: Gradient Descent

This is where machine learning actually earns its name. We use an algorithm called **Gradient Descent** to find the best weights automatically.

Here's how it works:

1. Start with random weights
2. Calculate how wrong your predictions are (using an error function)
3. Figure out which direction to adjust each weight to reduce the error
4. Take a small step in that direction
5. Repeat until the error is as small as possible

Think of it like being blindfolded on a hill and trying to find the bottom. You feel around with your feet to figure out which way is downhill, then take a small step. Do this enough times, and eventually you'll reach the valley.

### How to Check if the Curve is a Good Fit: L2 Error

For non-linear regression, we use the **L2 error** (also called L2 norm or Least Squares Error).

The L2 error is calculated as:

**L2 Error = ½ Σ (yᵢ - ŷᵢ)²**

Where:
- **yᵢ** is the actual value
- **ŷᵢ** is the predicted value (from your polynomial or sine wave)
- We square the differences (making them all positive and penalizing larger errors more)
- We multiply by ½ just to make the math cleaner when we take derivatives

**Why L2?** The L2 error penalizes larger mistakes more heavily than smaller ones (because we're squaring the differences). This makes it great for smooth, continuous optimization - which is exactly what gradient descent needs.

### What Even Are Weights?

If you're new to ML, **weights** (often written as w or θ) are just the coefficients in your equation that determine the shape of your curve. In linear regression, m and c are weights. In polynomial regression, you have multiple weights - one for each power of x.

The whole point of training a model is to find the best values for these weights. That's what gradient descent does.

### Making It Interactive

In my visualizer, you can play with three key parameters for the gradient descent algorithm:

1. **Order**: How complex should the polynomial be? Order 1 = linear, Order 2 = quadratic, Order 3 = cubic, and so on.

2. **Learning Rate**: How big should each step be? This is set on a logarithmic scale from 10⁰ to 10⁻¹⁰. 
   - Too big? The algorithm overshoots and might never settle down.
   - Too small? It takes forever to reach the answer.
   - Just right? *Chef's kiss* - smooth convergence.

3. **Training Rounds**: How many iterations should gradient descent run? More rounds = more opportunities to find the optimal weights, but also more computation time.

You can watch the curve fit itself to the data in real-time, see the L2 error drop with each training round, and really understand what's happening under the hood.

## How I Built This

The core logic was all Python - NumPy for the calculations, Matplotlib for the plots. I wanted to focus on getting the regression math right and making sure the gradient descent actually worked as expected.

I'll be honest here: the frontend (HTML, CSS, Flask routing, and the JavaScript for real-time updates) was developed with help from Claude Sonnet 4.5. Building web UIs isn't my strongest skill, and Claude helped me iterate quickly on the interactive sliders and dynamic plot updates. The regression logic, gradient descent implementation, and educational design? That was all me figuring it out through trial and error.

The comments in my code tell the story - you can see where I initially tried to modify weights randomly (spoiler: didn't work), then discovered gradient descent and had that lightbulb moment when I understood why we need to calculate gradients. That's the kind of learning journey I wanted to preserve and share.

## Why This Matters

Machine learning can feel like black magic if you can't see what's happening inside the algorithms. Professors can explain the math on a whiteboard, but there's something different about *playing* with the parameters yourself and watching the results change in real-time.

Want to see what happens when your learning rate is too high? Crank it up and watch the algorithm go haywire.

Curious about the difference between L1 and L2 penalties? Fit a linear model with outliers using L1, then try the same data with a polynomial model using L2.

This tool is for anyone who learns by doing - which, let's be real, is most of us.

## Final Thoughts

If you're learning machine learning, regression is your foundation. Understanding how to fit curves to data, what error functions mean, and how gradient descent actually works will serve you well as you tackle more complex algorithms.

And if you're teaching machine learning, tools like this can help bridge the gap between abstract equations and intuitive understanding.

Check out the [live demo](https://regression-visualisation.onrender.com/visualize) or [grab the code](https://github.com/ayushxpatne/regression-visualisation) and run it locally for the best experience.

Now go forth and fit some curves. 