import torch
from matplotlib import pyplot as plt
import numpy as np
import cv2

# Part 1 : Loading the Model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
# loading the pre trained model of ultralytics from PyTorch hub

# Part 2 : Real-time detections

# accessing the WebCam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    # reading capture while its open, and getting the return value and frame
    ret, frame = cap.read()

    # Make detections
    results = model(frame)
    # showing the popup window
    cv2.imshow('HCI', np.squeeze(results.render()))
    # if "q" key is pressed we break out
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()


# # Part 3 : Training from scratch
#
# import uuid   # Unique identifier
# import os
# import time
#
# IMAGES_PATH = os.path.join('data', 'images')  # /data/images
# labels = ['awake', 'drowsy']
# number_imgs = 5
#
#
# cap = cv2.VideoCapture(0)
# # Loop through labels
# for label in labels:
#     print('Collecting images for {}'.format(label))
#     time.sleep(5)
#
#     # Loop through image range
#     for img_num in range(number_imgs):
#         print('Collecting images for {}, image number {}'.format(label, img_num))
#
#         # Webcam feed
#         ret, frame = cap.read()
#
#         # Naming out image path
#         imgname = os.path.join(IMAGES_PATH, label + '.' + str(uuid.uuid1()) + '.jpg')
#
#         # Writes out image to file
#         cv2.imwrite(imgname, frame)
#
#         # Render to the screen
#         cv2.imshow('Image Collection', frame)
#
#         # 2 second delay between captures
#         time.sleep(2)
#
#         if cv2.waitKey(10) & 0xFF == ord('q'):
#             break
# cap.release()
# cv2.destroyAllWindows()

# print(os.path.join(IMAGES_PATH, labels[0]+'.'+str(uuid.uuid1())+'.jpg'))
#
# for label in labels:
#     print('Collecting images for {}'.format(label))
#     for img_num in range(number_imgs):
#         print('Collecting images for {}, image number {}'.format(label, img_num))
#         imgname = os.path.join(IMAGES_PATH, label+'.'+str(uuid.uuid1())+'.jpg')
#         print(imgname)
#
#
# model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5/runs/train/exp15/weights/last.pt', force_reload=True)
# img = os.path.join('data', 'images', 'awake.c9a24d48-e1f6-11eb-bbef-5cf3709bbcc6.jpg')
# results = model(img)
# results.print()