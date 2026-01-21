Hey Everyone! I hope you are doing good. This blog is going to cover some fundamentals of machine learning, some must knows before getting deeper. 

## Cross Validation
Imagine this, you are already a ML Engineer and you have to train a ML model. Umm.. say you have to train a machine learning model for classifying if a particular is Sports Car or SUV based on the features it have (ex: number of seats, ground clearance, etc). 

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
