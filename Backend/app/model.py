from ultralytics import YOLO
import torch

class SpeechClassifier:
    def __init__(self, model_path: str, warmup: bool = True):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = YOLO(model_path)
        self.model.fuse()
        self.model.to(self.device)  # send model to device
        if warmup:
            self._warmup()


    def _warmup(self):
        """
        Warming up the model to load weights onto GPU/CPU
        """
        print("Warming up the model...")
        # Assume the model accepts spectrogram input of size (1, 3, 224, 224)
        dummy_input = torch.randn(1, 3, 224, 224)
        with torch.no_grad():
            _ = self.model(dummy_input)
        print("Model warm-up complete")
    
    def predict(self, image):
        """
        Returns:
            dict: {class_name: probability}
        """
        results = self.model(
            image,
            device=self.device,
            verbose=False
        )

        probs = results[0].probs  # ultralytics.engine.results.Probs
        class_names = results[0].names

        return {
            class_names[i]: float(probs.data[i])
            for i in range(len(class_names))
        }
