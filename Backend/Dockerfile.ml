# Backend/Dockerfile.ml
FROM python:3.10-slim

WORKDIR /app

# install OS dependencies
RUN apt-get update && apt-get install -y gcc portaudio19-dev libsndfile1 libgl1 libglib2.0-0 curl

# Copy requirements and install Python dependencies
COPY requirements.txt .

# Use regular pip for simplicity in Docker (or uv if configured)
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install "llvmlite>=0.43.0" "numba>=0.59.0"

# Copy the rest of the application code
COPY . .

# Expose Port
EXPOSE 8000

# run Server
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]