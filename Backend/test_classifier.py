from app.model import SpeechClassifier
import torch

# warm-up
classifier = SpeechClassifier("model/yolo11n-best.pt")

# create dummy spectrogram
dummy_spec = torch.randn(1, 3, 224, 224)

# test predict
pred = classifier.predict(dummy_spec)
print("Prediction:", pred)
