from ultralytics import YOLO
from app.utils import audio_to_spectrogram 
import numpy as np
import os
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
        print("Starting system warm-up...")
        
        # 1. Warmup YOLO
        dummy_input = torch.randn(1, 3, 224, 224)
        with torch.no_grad():
            _ = self.model(dummy_input)
            
        # 2. Warmup Spectrogram Generator 
        try:
            from scipy.io.wavfile import write
            dummy_wav = "warmup_temp.wav"
            sampling_rate = 16000
            any_sound = np.zeros(sampling_rate // 10) # 0.1 sec of silence
            write(dummy_wav, sampling_rate, any_sound.astype(np.float32))
            _ = audio_to_spectrogram(dummy_wav)
            
            if os.path.exists(dummy_wav):
                os.remove(dummy_wav)
            print("✔️ Complete system warm-up (Model & Audio Processor)")
        except Exception as e:
            print(f"Audio warm-up skipped: {e}")

    
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
