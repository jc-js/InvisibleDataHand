from pydantic import BaseModel


class StockInfoSchema(BaseModel):
    symbol: str
    shortName: str
    recommendationKey: str
    country: str
    sector: str
    industry: str
    website: str
    overallRisk: int
    currentPrice: float
    marketCap: float
    enterpriseValue: float
    priceToSalesTrail12Months: float
    priceToBook: float
    trailingPE: float
    forwardPE: float
    beta: float
    dividendYield: float
    dividendRate: float
    payoutRatio: float
    earningsGrowth: float
    revenueGrowth: float
    profitMargins: float
    grossMargins: float
    operatingMargins: float
    trailingPEs: float
    forwardPEs: float
    targetMeanPrice: float
    recommendationMean: float
    totalCash: float
    totalDebt: float
    freeCashFlow: float
