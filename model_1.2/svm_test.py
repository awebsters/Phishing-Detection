import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn import metrics
from matplotlib import pyplot as plt

dirname = os.path.dirname(__file__)

# import dataset
data = pd.read_csv(os.path.join(dirname,"../data/Model_1.2Dataset.csv"), index_col="Unnamed: 0")
data = data.drop("URL", axis=1)
data = data.drop("Label",axis=1)

data = data.sample(frac=0.05)

labels = data['Target']
data = data.drop("Target", axis=1)

data = data.to_numpy()
labels = labels.to_numpy()

# split dataset
trainX, testX, trainY, testY = train_test_split(data, labels, test_size=0.3)


model = svm.SVC(kernel= "linear")

print("model training started")
model.fit(trainX, trainY)
print("predicting...")
pred = model.predict(testX)

print("Accuracy", metrics.accuracy_score(testY, pred))
