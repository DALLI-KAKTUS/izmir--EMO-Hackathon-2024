from ultralytics import YOLO
model=YOLO("/ultralytics/denemeler/best.pt")
model.predict("http://0.0.0.0:8080/stream?topic=/auv/auv/camerafront_right/camera_image", show=True)
