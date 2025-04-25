import logging

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi import UploadFile, File
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from enum import Enum
from server.routes.yfinancceRoute import router as yfinanceRouter
from server.aws.s3_client import s3_client

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("Initializing database...")
    yield
    logging.info("Deleting table...")


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Tags(Enum):
    test = "server"
    trading = "trading"


BUCKET_NAME = "invisible-data-hand-data-lake"


@app.get("/", tags=[Tags.test])
async def read_root():
    return {"message": "Hello World"}


@app.get("/list-buckets", tags=[Tags.test])
async def hello():
    buckets = s3_client.list_buckets()
    return {"buckets": [bucket["Name"] for bucket in buckets["Buckets"]]}


@app.post("/upload", tags=[Tags.test])
async def upload_file_to_s3(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        file_name = file.filename
        
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file_name,
            Body=contents,
            ContentType='text/plain'
        )

        return {"message": f"'{file_name}' uploaded successfully to {BUCKET_NAME}"}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/list-objects", tags=[Tags.test])
async def list_buckets():
    try:
        response = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
        if 'Contents' in response:
            objects = [obj['Key'] for obj in response['Contents']]
            return {"objects": objects}
        else:
            return {"message": "No objects found."}
    except Exception as e:
        return {"error": str(e)}

@app.get("/get-object/{object_key}", tags=[Tags.test])
async def get_object(object_key: str):
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=object_key)
        data = response['Body'].read().decode('utf-8')
        return {"data": data}
    except Exception as e:
        return {"error": str(e)}

app.include_router(yfinanceRouter, prefix="/api/v1", tags=[Tags.trading])
