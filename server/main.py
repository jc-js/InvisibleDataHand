import logging


from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from enum import Enum
from server.routes.yfinancceRoute import router as yfinanceRouter



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

@app.get("/", tags=[Tags.test])
async def read_root():
    return {"message": "Hello World"}

@app.get("/hello", tags=[Tags.test])
async def root():
    return {"message": "Hello World"}

@app.get("/test_1", tags=[Tags.test])
async def root():
    return {"message": "Testing mesage"}

app.include_router(yfinanceRouter, prefix="/api/v1", tags=[Tags.trading])
