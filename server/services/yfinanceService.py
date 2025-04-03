import yfinance as yf
from server.schemas.yfinanceSchema import StockInfoSchema
class YFinanceService:
    def get_info(self, ticker: str) -> StockInfoSchema:
        dat = yf.Ticker(ticker)
        info = dat.info

        return StockInfoSchema(
            symbol=info.get("symbol", ""),
            shortName=info.get("shortName", ""),
            recommendationKey=info.get("recommendationKey", ""),
            country=info.get("country", ""),
            sector=info.get("sector", ""),
            industry=info.get("industry", ""),
            website=info.get("website", ""),
            overallRisk=info.get("overallRisk", 0),
            currentPrice=info.get("currentPrice", 0.0),
            marketCap=info.get("marketCap", 0.0),
            enterpriseValue=info.get("enterpriseValue", 0.0),
            priceToSalesTrail12Months=info.get("priceToSalesTrailing12Months", 0.0),
            priceToBook=info.get("priceToBook", 0.0),
            trailingPE=info.get("trailingPE", 0.0),
            forwardPE=info.get("forwardPE", 0.0),
            beta=info.get("beta", 0.0),
            dividendYield=info.get("dividendYield", 0.0),
            dividendRate=info.get("dividendRate", 0.0),
            payoutRatio=info.get("payoutRatio", 0.0),
            earningsGrowth=info.get("earningsGrowth", 0.0),
            revenueGrowth=info.get("revenueGrowth", 0.0),
            profitMargins=info.get("profitMargins", 0.0),
            grossMargins=info.get("grossMargins", 0.0),
            operatingMargins=info.get("operatingMargins", 0.0),
            trailingPEs=info.get("trailingPE", 0.0),
            forwardPEs=info.get("forwardPE", 0.0),
            targetMeanPrice=info.get("targetMeanPrice", 0.0),
            recommendationMean=info.get("recommendationMean", 0.0),
            totalCash=info.get("totalCash", 0.0),
            totalDebt=info.get("totalDebt", 0.0),
            freeCashFlow=info.get("freeCashflow", 0.0),
        )
