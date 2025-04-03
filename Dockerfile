FROM python:3.11-slim

WORKDIR /invisibledatahand

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/invisibledatahand

EXPOSE 8000

CMD ["fastapi", "run", "server/main.py", "--port", "8000" , "--reload"]
