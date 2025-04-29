from fastapi import APIRouter
from ..services import yfinanceService
from ..schemas import yfinanceSchema


router = APIRouter()
stockService = yfinanceService.YFinanceService()


@router.get("/stock/{ticker}", response_model=yfinanceSchema.StockInfoSchema)
def get_stock_info(ticker: str):
    return stockService.get_info(ticker)
