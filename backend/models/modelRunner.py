import numpy as np
import sys
from keras.utils import load_img, img_to_array
from keras.models import load_model

imagePath =  sys.argv[1]

model = load_model("/home/arjun/Code/Projects/DappV1-NORSA/backend/models/model.h5")

image = load_img(imagePath, target_size=(224, 224))  # Load the image
xtest_image = img_to_array(image)  # Convert image to array
xtest_image = np.expand_dims(xtest_image, axis=0)  # Add an extra dimension
results = (model.predict(xtest_image) > 0.5).astype("int32")

if results[0][0] == 0:
    prediction = 0
else:
    prediction = 1

print(prediction)