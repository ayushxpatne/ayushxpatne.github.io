---
layout: post
author: Ayush Patne
title: The ML Fundamentals Handbook
date: 2026-01-16
excerpt: Fundamental ML concepts with examples and explanations that feel like a conversation, not a lecture. An ongoing guide for building your machine learning foundation.
tags:
  - ML
  - Machine-Learning
  - Tutorial
featured: false
featured_type: Technical
read_time: 9 min
---
Hey Everyone! I hope you are doing good. This blog is going to cover some fundamentals of machine learning, some must knows before getting deeper. 

## Cross Validation
Imagine this, you are already a ML Engineer and you have to train a ML model. Umm.. say you have to train a machine learning model for classifying if a car is Sports Car or SUV based on the features it have (ex: number of seats, ground clearance, etc). 

> btw, tasks/problems like these where we have to classify into different classes is called a **Classification Problem**.

To achieve this, we have multiple machine learning methods, such as Logistical Regression, k-Nearest Neighbours (kNN), Support Vector Machines (SVM), etc (don't worry if you dont know what these are right now).. and we have to pick one.. 

All these methods, for achieving the same goal.. how do we pick which one is the best? Introducing Cross Validation. 

**Cross Validation allows us to compare to different ML methods and get a sense of how well they will work in practice.** 

### Training & Testing
Machine Learning is nothing but using math to identify patterns in the data. These methods are nothing but different such mathematical methods / algorithms which are used to identify patterns in the data, which we can use to predict or classify (maybe generate?) new data based on the identified pattern. 

The process where we are applying ML method on a given data, to achieve a said goal, its called **Training**, ie we are **"Training the model"**. 

So we need to have dataset to train the model. 

Continuing on the example, say we have data of around 100 cars, each labelled as "SUV" or "Sports Car".

Example:

| **No. of Seats** | **Ground Clearance** | **Label**      |
| ---------------- | -------------------- | -------------- |
| 2                | 100 mm               | **Sports Car** |
| 2                | 115 mm               | **Sports Car** |
| 2                | 130 mm               | **Sports Car** |
| 4                | 120 mm               | **Sports Car** |
| 5                | 175 mm               | **SUV**        |
| 5                | 190 mm               | **SUV**        |
| 5                | 210 mm               | **SUV**        |
| 7                | 205 mm               | **SUV**        |
| 7                | 225 mm               | **SUV**        |
| 2                | 210 mm               | **SUV**        |

Now we used all of this data (all 100 examples) to train a Machine Learning Model using some **method X** and we want to see how well the model is classifying new example, 

| **No. of Seats** | **Ground Clearance** | **Label** |
| ---------------- | -------------------- | --------- |
| 2                | 150 mm               | **?**     |

We put this new data in, and it predicts, Sports Car. But do we know if it is actually a Sports Car or not? What if the model is wrong? Is the model wrong? 

That is why we don't use the entire dataset to train the model. We also need to see it, **evaluate** or **test** the model if it is predicting accurate/correct answers or not. 

**Hence we divide the dataset into 2 parts:**
1. Training Set : Using 75% of the data to train the model.
2. Testing Set : Using remaining 25% of data to test the model. 

**What do I mean by Testing?** 
Suppose, now we know what the correct label is, and we wanna see if the model is predicting correctly. I put in the features (no. of seats & ground clearance) of some car (say, c1) as input for the trained model, and the model predicts an output. 

If it predicted Super Car, and c1 was actually Sports Car, woohooo! our model predicted correctly! but if it had predicted c1 = SUV then it would have been wrong.

| **No. of Seats** | **Ground Clearance** | **Model Prediction** | **Actual Class** | **Predicted Correctly?** |
| ---------------- | -------------------- | -------------------- | ---------------- | ------------------------ |
| **2**            | 150 mm               | Sports Car           | Sports Car       | **Yes**                  |
| **5**            | 210 mm               | SUV                  | SUV              | **Yes**                  |
| **7**            | 190 mm               | SUV                  | SUV              | **Yes**                  |
| **4**            | 145 mm               | Sports Car           | Sports Car       | **Yes**                  |
| **2**            | 200 mm               | Sports Car           | SUV              | **No**                   |

So the **testing set** is used exactly like this, we see if the predicted label = actual label or not. 

### Novelty of Cross Validation

Now the question arises, how to decide which 75% of data should be training?

Say the dataset is divided into 4 blocks (P, Q, R, S), each with 25% of the data, i.e., P will have first 25%, Q will have next 25% of dataset, R will have next 25% of dataset and S will have last 25% of dataset. 

> **This is called Four-Fold-Cross Validation.** The number of blocks is arbitrary.
> In extreme cases, we would call each individual sample (data point/row) a block. This is called **"Leave One Out Cross Validation"**
> 
> In Practice, 10-Fold Cross Validation is common, ie dividing the dataset into 10 blocks, and using 9 to train and 1 to test at a time. 
> 
> In some machine learning models, if there is a "tuning parameter", basically some coefficient/element of the mathematical function that is guessed and not estimated, we can use 10-Fold Cross Validation to find the best value for that parameter. 

In Cross Validation we train and test a method on all combinations of blocks. 
So like, for example:
1. Cross validation will start by using P, Q, R for training and using S for testing. Keeping track how many we got correct. 
2. Then train the method again but using P, R, S for training and Q for testing. Keeping track how many we got correct. 
so on and so forth.. 

> **A More Used Approach**
> In a simpler approach, traditionally and generally or at least when I first learnt ML, we shuffle the dataset and pick the top 70% of the data for training set and remaining 30% for testing set, or as we say it, **70-30 split**. You can also make it an **80-20 split,** or **75-25 split,** upto you. 

This is done on all the methods we want to compare and then in the end, we see how well each method performed. 

So if we want to compare two methods, X and Y, we run cross validation on each of them and tally which method got higher number of correct answers. 

This brings us to...

## Confusion Matrix
Once we train the model, and test it using the **test set**, we need to see the results right? How many did it predict correctly? How many it predicted false?

One great way to summarise how well the model/method performed (ie the test results) is to use a **Confusion Matrix.** A Confusion Matrix will look like this:

|                        | **Actually Positive** | **Actually Negative** |
| ---------------------- | --------------------- | --------------------- |
| **Predicted Positive** | ::g::True Positive::  | ::r::False Positive:: |
| **Predicted Negative** | ::r::False Negative:: | ::g::True Negative::  |

To put it simply, 
- ::g::**True Positive**:: : The model **predicted** a thing as **X**, and it **was actually X**. 
- ::r::**False Positive**:: : The model **predicated** a thing as **X**, but it **was actually Not X**.
- ::g::**True Negative**:: : The model **predicted** a thing as **Not X**, and **was actually Not X.** 
- ::r::**False Negative**:: : The model **predicted** a thing as **Not X**, but it **was actually X**. 

For example, lets modify our earlier example, to classify if a given car is Sports car or SUV. 

Given these are the only two classes which we have to work with, or classify a given car into either of these two classes, Lets reframe the goal to **"Is the given car a SUV?"** 

This is a great time to introduce Binary Classification. 

### Introduction to Binary Classification

When the classification problem has only 2 possible outputs, ie classes, we call is **Binary Classification**. 
Ex: 
- Is given mail a spam? The mail can either be a "spam" or "not spam". The answer can either be "True" ie yes its a spam, or "False" ie its not a spam.

So, Is the given car a SUV? The car can either be a "SUV" or "not SUV". In our case, since we only have 2 labels, SUV and Sports car, its safe to say if its "not SUV" its sports car in other words the answer can either be "True" ie yes its a SUV, or "False" ie its not a SUV. 

A common way to represent true or false is 1 or 0. **1 if true, 0 if false.** 

### Using Confusion Matrix

So our earlier example dataset (from Cross Validation Section) for the aim "Classify given car as Sports Car or SUV" which we used to train the method X, this one:

| **No. of Seats** | **Ground Clearance** | **Label**      |
| ---------------- | -------------------- | -------------- |
| 2                | 100 mm               | **Sports Car** |
| 2                | 115 mm               | **Sports Car** |
| 2                | 130 mm               | **Sports Car** |
| 4                | 120 mm               | **Sports Car** |
| 5                | 175 mm               | **SUV**        |
| 5                | 190 mm               | **SUV**        |
| 5                | 210 mm               | **SUV**        |
| 7                | 205 mm               | **SUV**        |
| 7                | 225 mm               | **SUV**        |
| 2                | 210 mm               | **SUV**        |

Needs to be modified to fit our reframed question: Is given car a SUV? 

|**No. of Seats**|**Ground Clearance (mm)**|**Is SUV?**|
|---|---|---|
|2|100|0|
|2|115|0|
|2|130|0|
|4|120|0|
|5|175|1|
|5|190|1|
|5|210|1|
|7|205|1|
|7|225|1|
|2|210|1|

And now if train the model using above dataset, and test it using the test set, we may get the results something like:

|**No. of Seats**|**Ground Clearance**|**Predicted (Is SUV?)**|**Actual (Is SUV?)**|**Predicted Correctly?**|
|---|---|---|---|---|
|2|150 mm|0|0|**Yes** (TN)|
|5|210 mm|1|1|**Yes** (TP)|
|7|190 mm|1|1|**Yes** (TP)|
|4|145 mm|0|0|**Yes** (TN)|
|2|200 mm|0|1|**No** (FN)|
|2|110 mm|0|0|**Yes** (TN)|
|5|160 mm|1|0|**No** (FP)|
|7|220 mm|1|1|**Yes** (TP)|
|2|130 mm|0|0|**Yes** (TN)|
|5|185 mm|1|1|**Yes** (TP)|

And a much neater way to see is to use Confusion Matrix. So the confusion matrix for the above output will look like:

|                                     | **Actually Positive (is SUV)** | **Actually Negative (is Not SUV)** |
| ----------------------------------- | ------------------------------ | ---------------------------------- |
| **Predicted Positive (is SUV)**     | ::g::**4** (True Positives)::  | ::r::**1** (False Positive)::      |
| **Predicted Negative (is Not SUV)** | ::r::**1** (False Negative)::  | ::g::**4** (True Negatives)::      |

Much more concise and intuitive right?

### Using Confusion Matrix to Compare Methods
We can also compare methods to train model using Confusion Matrix.
Say for some Method X we got confusion matrix as:

|                                     | **Actually Positive (is SUV)** | **Actually Negative (is Not SUV)** |
| ----------------------------------- | ------------------------------ | ---------------------------------- |
| **Predicted Positive (is SUV)**     | ::g::**30** (True Positive)::  | ::r::**15** (False Positive)::     |
| **Predicted Negative (is Not SUV)** | ::r::**15** (False Negative):: | ::g::**40** (True Negative)::      |

**Total correct: 70/100**

and for some method Y we got confusion matrix as:

|                                     | **Actually Positive (is SUV)** | **Actually Negative (is Not SUV)** |
| ----------------------------------- | ------------------------------ | ---------------------------------- |
| **Predicted Positive (is SUV)**     | ::g::**42** (True Positive)::  | ::r::**5** (False Positive)::      |
| **Predicted Negative (is Not SUV)** | ::r::**5** (False Negative)::  | ::g::**48** (True Negative)::      |

**Total correct: 90/100**

which one do you think is better? Since method Y has more number of (True Positives + True negatives) and less number of (False Positives + False Negatives) compared to method X, method Y seems to be better. 

Obviously, there are more sophisticated metrics to see which model is better, or how well the model is performing, as a starting point the confusing matrix will help you gain the basic intuition to see if a model is performing well. 

### What If There Are More Than 2 classes?
Lets go back to our original question, Is a given car SUV or Sports car? 

Your boss, now wants to classify a cars as SUV, Sports car or Minivan?

We cannot transform this into 1s and 0s now. So what to do now? Well we train the model to classify into said classes as we did in a Classification Problem, and the confusion matrix will now look like:

|                         | **Predicted Sports Car** | **Predicted SUV** | **Predicted Minivan** |
| ----------------------- | ------------------------ | ----------------- | --------------------- |
| **Actually Sports Car** | ::g::**45**::            | ::r::4::          | ::r::1::              |
| **Actually SUV**        | ::r::3::                 | ::g::**42**::     | ::r::5::              |
| **Actually Minivan**    | ::r::0::                 | ::r::8::          | ::g::**42**::         |

So basically, size of confusion matrix depends on how many classes we have. 

### So why we used 1s and 0s?
If we can just train the model to classify into said classes, we didn't have to do the tedious task of converting data into 1s and 0s, and reframing goal into a true/false question right? We could have just trained the model using original dataset ie the one below, right?

| **No. of Seats** | **Ground Clearance** | **Label**      |
| ---------------- | -------------------- | -------------- |
| 2                | 100 mm               | **Sports Car** |
| 2                | 115 mm               | **Sports Car** |
| 2                | 130 mm               | **Sports Car** |
| 4                | 120 mm               | **Sports Car** |
| 5                | 175 mm               | **SUV**        |
| 5                | 190 mm               | **SUV**        |
| 5                | 210 mm               | **SUV**        |
| 7                | 205 mm               | **SUV**        |
| 7                | 225 mm               | **SUV**        |
| 2                | 210 mm               | **SUV**        |

Well... not exactly. 

## Introducing Label Encoding

You see, Machine Learning is just maths, and maths doesn't understand words... It want numbers. 

So when I said we need to reframe goal into a true/false question (Is given car a SUV?) in Binary Classification section, well I lied- sort of. What we were actually doing was assigning a number for each class, ie numerical representation of the class. 

When I said 1 means True, i.e., SUV and 0 means False, i.e., Not Suv, We were just replacing the classes with numerical representation. 

Okay wait, let me clear the confusion. 

Lets take another example, you have to classify students as 'Always on Time' and 'Always Late' based on their arrival patterns.

|**Days Late (per month)**|**Average Minutes Late**|**Label**|
|---|---|---|
|0|0|Always on Time|
|1|5|Always on Time|
|8|15|Always Late|
|12|25|Always Late|
|2|3|Always on Time|

Now, to train the model, we need numbers. So we do this:

|**Days Late (per month)**|**Average Minutes Late**|**Label (Encoded)**|
|---|---|---|
|0|0|0|
|1|5|0|
|8|15|1|
|12|25|1|
|2|3|0|

Where `0 = "Always on Time"` and `1 = "Always Late"`

See? We're just replacing the text labels with numbers. This is called **Label Encoding**.

Consider this situation, you're building a spam filter for emails. You want to classify if an email is "Spam" or "Not Spam" based on certain features.

|**Number of Links**|**Contains "Free"**|**Sender Known?**|**Label**|
|---|---|---|---|
|0|No|Yes|Not Spam|
|5|Yes|No|Spam|
|1|No|Yes|Not Spam|
|10|Yes|No|Spam|

But wait, we have "Yes" and "No" in our features too! ML algorithms can't understand these either. So we encode everything:

|**Number of Links**|**Contains "Free"**|**Sender Known?**|**Label (Encoded)**|
|---|---|---|---|
|0|0|1|0|
|5|1|0|1|
|1|0|1|0|
|10|1|0|1|

Where for Label: `0 = "Not Spam"` and `1 = "Spam"`

And for the features: `"Yes" = 1` and `"No" = 0`

So it's not just labels, even our features need to be numerical!

Consider another situation, you need to predict the weather. You have 3 classes: "Sunny", "Rainy", and "Windy".

| **Temperature (°C)** | **Humidity (%)** | **Wind Speed (km/h)** | **Weather** |
| -------------------- | ---------------- | --------------------- | ----------- |
| 30                   | 80               | 5                     | Sunny       |
| 15                   | 95               | 20                    | Rainy       |
| 5                    | 70               | 35                    | Windy       |
| 28                   | 75               | 8                     | Sunny       |
| 12                   | 90               | 25                    | Rainy       |

After encoding the labels:

|**Temperature (°C)**|**Humidity (%)**|**Wind Speed (km/h)**|**Weather (Encoded)**|
|---|---|---|---|
|30|80|5|0|
|15|95|20|1|
|5|70|35|2|
|28|75|8|0|
|12|90|25|1|

Where: `0 = "Sunny"`, `1 = "Rainy"`, `2 = "Windy"`

One last example! Consider this situation, you're working at a bank and need to predict loan approval. You want to classify if a loan application should be "Approved" or "Rejected".

|**Credit Score**|**Income ($1000s)**|**Existing Loans**|**Decision**|
|---|---|---|---|
|750|80|1|Approved|
|600|45|3|Rejected|
|720|65|2|Approved|
|550|35|4|Rejected|

After encoding:

|**Credit Score**|**Income ($1000s)**|**Existing Loans**|**Decision (Encoded)**|
|---|---|---|---|
|750|80|1|1|
|600|45|3|0|
|720|65|2|1|
|550|35|4|0|

Where: `1 = "Approved"` and `0 = "Rejected"`

### So What Actually Happened?

So when I said earlier that we need to reframe the goal into a true/false question (Is given car a SUV?) in the Binary Classification section, well I wasn't telling you the complete picture.

What we were **actually doing** was **Label Encoding** - assigning a numerical value to each class so that the machine learning algorithm can process it. When I said `1 = True (SUV)` and `0 = False (Not SUV)`, we were just replacing the text labels "SUV" and "Sports Car" with numbers `1` and `0`.

**This is a fundamental step in machine learning**; everything needs to be numbers. The algorithms work with mathematical functions, matrices, and calculations. They don't understand the word "SUV" or "Sports Car" or "Spam"... they only understand numbers.

So whether you have 2 classes (Binary Classification) or 100 classes (Multi-class Classification), you need to encode them into numbers. That's what Label Encoding is all about!

## Better Ways To Evaluate Model Performance

Remember when I said "there are more sophisticated metrics to see which model is better, or how well the model is performing"? Well, here we are!

The confusion matrix gives us a great overview, but sometimes we need to dig deeper and understand specific aspects of how our model is performing. That's where these metrics come in.

### Why Do We Need These Metrics?

Imagine you trained a model to detect cancer from medical scans. Your confusion matrix shows:

| |**Actually Has Cancer**|**Actually Healthy**|
|---|---|---|
|**Predicted Has Cancer**|85|10|
|**Predicted Healthy**|15|890|

Now, you might look at this and think "Hey! We got (85 + 890) = 975 correct out of 1000 total predictions! That's 97.5% accuracy! Amazing!"

But wait... we missed 15 people who actually had cancer. That's 15 people who will go home thinking they're healthy when they're not. That's pretty bad, right?

On the other hand, 10 healthy people were told they might have cancer. They'll be stressed and will need more tests, but at least they're not in danger.

So even though our accuracy is 97.5%, we need to ask:

- How good are we at catching people who actually have cancer? 
- How good are we at correctly identifying healthy people?
- When we tell someone they have cancer, how often are we right? 

**Different metrics tell us different things about our model's performance.** We used the word Accuracy.. Lets start with that. 

## What is Accuracy?

The simplest one. **Accuracy** tells us: "Out of all predictions, how many did we get right?"

**Formula:**

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$

Or in simple words:

$$\text{Accuracy} = \frac{\text{Total Correct Predictions}}{\text{Total Predictions}}$$

Using our SUV example:

| |**Actually Positive (is SUV)**|**Actually Negative (is Not SUV)**|
|---|---|---|
|**Predicted Positive (is SUV)**|**4** (TP)|**1** (FP)|
|**Predicted Negative (is Not SUV)**|**1** (FN)|**4** (TN)|

$$ \text{Accuracy} = \frac{4 + 4}{4 + 4 + 1 + 1} = \frac{8}{10} = 0.8 \text{ or } 80\%$$

**What does this tell us?** Overall, 80% of our predictions were correct. Simple!

### **When is Accuracy NOT enough?** 
Imagine you're building a fraud detection system for credit card transactions. Out of 1000 transactions, only 10 are fraudulent (1%) and 990 are legitimate (99%).

Now, if your model just predicts "Not Fraud" for every single transaction, you'll get 99% accuracy! But you didn't catch a single fraud. That's why we need more metrics.
## Introducing Precision

**Precision** tells us: "When we predict positive, how often are we actually right?"

In other words, out of all the times we said "Yes, this is positive", how many times were we correct?

**Formula:**

$$\text{Precision} = \frac{TP}{TP + FP}$$

Out of all things we predicted as positive, what fraction was actually positive? 

Using our SUV confusion matrix:

$$\text{Precision} = \frac{4}{4 + 1} = \frac{4}{5} = 0.8 \text{ or } 80\%$$

**What does this tell us?** When our model says "This is an SUV", it's correct 80% of the time. 

In more simpler words, what percentage of times we are correct when we say X is X. 

Another example can be building a spam filter. High precision means "When I mark an email as spam, I'm usually right."

You don't want to accidentally mark important emails (like job offers or emails from your boss) as spam.. right? That would be a False Positive cos you predicted spam but it was actually not spam. High precision means fewer False Positives.
## Recall (aka Sensitivity)

**Recall** (also called **Sensitivity**) tells us "Out of all the actual positive cases, how many did we catch?"

**Formula:**

$$\text{Recall} = \frac{TP}{TP + FN}$$

Translating to **Out of all things that are actually positive, what fraction did we identify?

Using our SUV confusion matrix:

$$\text{Recall} = \frac{4}{4 + 1} = \frac{4}{5} = 0.8 \text{ or } 80\%$$

**What does this tell us?** Out of all cars that were actually SUVs, we correctly identified 80% of them.

> **Why is it called "Recall"?**
> 
> → The word **"recall"** means **"to bring back"** or **"to retrieve"**.
> → So **Recall** asks: "Out of all the things I should have found (actual positives), how many did I successfully recall/retrieve/bring back?"
> 
> **Why is it also called Sensitivity?** 
> → Because it measures how "sensitive" your model is to detecting positive cases. A highly sensitive test won't miss many positive cases.

 Circling back to the cancer detection model. High recall basically means "Out of all people who actually have cancer, I'm catching most of them."

You don't want to miss people who have cancer! That would be a False Negative i.e., you predicted they're healthy but they actually have cancer. High recall means fewer False Negatives.

## Specificity

**Specificity** tells us: "Out of all the actual negative cases, how many did we correctly identify as negative?"

**Formula:**

$$\text{Specificity} = \frac{TN}{TN + FP}$$

Out of all things that are actually negative, what fraction did we correctly identify as negative?

Using our SUV confusion matrix:

$$\text{Specificity} = \frac{4}{4 + 1} = \frac{4}{5} = 0.8 \text{ or } 80\%$$

**What does this tell us?** Out of all cars that were actually NOT SUVs (i.e., Sports Cars), we correctly identified 80% of them.

Back to Cancer screening again. High specificity means "Out of all healthy people, I'm correctly identifying most of them as healthy."

You don't want to tell healthy people they might have cancer! That would cause unnecessary stress and additional testing. High specificity means fewer False Positives.

## The Precision-Recall Trade-off & Sensitivity-Specificity Trade-off

Here's the thing - you can't always have it all. There's usually a trade-off.

### Precision vs Recall Trade-off

Let's say you're building a spam filter:

**Scenario 1: You want HIGH Precision (fewer False Positives)**

- You make the filter super strict
- It only marks emails as spam when it's REALLY REALLY sure
- Result: Most emails marked as spam are actually spam (High Precision)
- But: You miss a lot of probable spam emails (Low Recall)

**Scenario 2: You want HIGH Recall (fewer False Negatives)**

- You make the filter more aggressive
- It marks emails as spam even with slight suspicion
- Result: You catch almost all spam emails (High Recall)
- But: You also mark some legitimate emails as spam (Low Precision)

### Sensitivity vs Specificity Trade-off

Similarly, in medical testing:

**Scenario 1: You want HIGH Sensitivity (catch all sick people)**

- You make the test super sensitive
- It flags people as sick even with minor symptoms
- Result: You rarely miss sick people (High Sensitivity)
- But: Many healthy people are incorrectly flagged as sick (Low Specificity) (imo this is better than flagging few sick people as healthy)

**Scenario 2: You want HIGH Specificity (don't scare healthy people)**

- You make the test very strict
- It only flags people as sick with clear symptoms
- Result: Healthy people are rarely incorrectly flagged (High Specificity)
- But: You might miss some sick people (Low Sensitivity )
## Metrics Quick Reference Guide

Here's a simple way to remember what each metric tells you:

|**Metric**|**Question It Answers**|**Formula**|
|---|---|---|
|**Accuracy**|Overall, how many predictions are correct?|$\frac{TP + TN}{TP + TN + FP + FN}$|
|**Precision**|When I predict positive, how often am I right?|$\frac{TP}{TP + FP}$|
|**Recall (Sensitivity)**|Out of all actual positives, how many did I catch?|$\frac{TP}{TP + FN}$|
|**Specificity**|Out of all actual negatives, how many did I correctly identify as negative?|$\frac{TN}{TN + FP}$|

### When To Use Which Metric?

Different problems need different metrics:

**Use Accuracy when:**

- Classes are balanced (roughly equal number of positives and negatives)
- False Positives and False Negatives are equally bad

**Focus on Recall/Sensitivity when:**

- False Negatives are really bad (like missing cancer patients)
- You can't afford to miss positive cases
- Examples: Disease detection, fraud detection, defective product detection

**Focus on Precision when:**

- False Positives are really bad (like marking important emails as spam)
- You want to be very sure when you predict positive
- Examples: Spam filters, legal document classification

**Focus on Specificity when:**

- You want to correctly identify negatives
- False Positives cause harm or unnecessary cost
- Examples: Medical screening (don't want to scare healthy people)

The metrics help us understand our model from different angles. The confusion matrix gives us the raw numbers, and these metrics help us interpret what those numbers actually mean for our specific problem.