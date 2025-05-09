import httpx
import os
from typing import Optional, Dict, Any

class FredService:
    base_url = "https://api.stlouisfed.org/fred"
    fred_key = os.getenv("FRED_KEY")
    
    async def get_observations(
        self,
        series_id: str,
        limit: Optional[int] = None,
        observation_start: Optional[str] = None,
        observation_end: Optional[str] = None,
        sort_order: Optional[str] = "asc",
        units: Optional[str] = None
    ) -> Dict[str, Any]:
        params = {
            "series_id": series_id,
            "api_key": self.fred_key,
            "file_type": "json"
        }
        if limit:
            params["limit"] = limit
        if observation_start:
            params["observation_start"] = observation_start
        if observation_end:
            params["observation_end"] = observation_end
        if sort_order:
            params["sort_order"] = sort_order
        if units:
            params["units"] = units
        
        url = f"{self.base_url}/series/observations"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
