FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app/

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
