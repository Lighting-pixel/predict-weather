import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns

# Step 1: Load the dataset
df = pd.read_csv('seattle-weather.csv')

df.info() #summary of the DataFrame

# histogram for 'temp_max'
plt.figure(figsize=(8, 6))
sns.histplot(df['temp_max'], bins=20, kde=True, color='blue')
plt.title('Distribution of Maximum Temperature')
plt.xlabel('Temperature')
plt.ylabel('Count')
plt.show()

# Assuming 'date' column exists and is in datetime format
df['date'] = pd.to_datetime(df['date'])

# Sort data by date if not already sorted
df = df.sort_values(by='date')

# Plotting temp_max and temp_min over time
plt.figure(figsize=(12, 8))
plt.plot(df['date'], df['temp_max'], label='Max Temperature', marker='o', linestyle='-')
plt.plot(df['date'], df['temp_min'], label='Min Temperature', marker='o', linestyle='-')

plt.title('Temperature Variation Over Time')
plt.xlabel('Date')
plt.ylabel('Temperature')
plt.xticks(rotation=45)
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()

label_encoder = LabelEncoder()
df['weather'] = label_encoder.fit_transform(df['weather'])

df = df.drop('date', axis=1)  # Drop the 'date'

# Step 3: Split data into features (X) and target variable (y)
X = df[['temp_max', 'temp_min', 'precipitation', 'wind']]  # Features
y = df['weather']  # Target variable

# Step 4: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Initialize and train the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Make predictions
y_pred = model.predict(X_test)

# Step 7: Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')

# Optionally, print a classification report for more detailed metrics
print(classification_report(y_test, y_pred))

from sklearn.metrics import confusion_matrix

#confusion matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.xticks(ticks=np.arange(len(label_encoder.classes_)), labels=label_encoder.classes_, rotation=45)
plt.yticks(ticks=np.arange(len(label_encoder.classes_)), labels=label_encoder.classes_, rotation=0)
plt.show()

#feature importance
feature_importance = model.feature_importances_
plt.figure(figsize=(8, 6))
sns.barplot(x=feature_importance, y=X.columns)
plt.title('Feature Importance')
plt.xlabel('Importance')
plt.ylabel('Feature')
plt.show()

import joblib

# Save the trained model to a file
joblib.dump(model, 'weather.pkl')

