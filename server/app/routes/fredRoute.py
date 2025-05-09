from fastapi import APIRouter, Query
from typing import Optional
from ..services.fredService import FredService

router = APIRouter(prefix="/fred", tags=["fred"])

@router.get("/observations/{series_id}")
async def get_series_observations(
    series_id: str,
    limit: Optional[int] = Query(None, description="Limit number of observations"),
    observation_start: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    observation_end: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    sort_order: Optional[str] = Query("asc", description="Sort order (asc or desc)"),
    units: Optional[str] = Query(None, description="Units transformation")
):
    """
    Get observations for a specific FRED series.
    """
    fred_service = FredService()
    observations = await fred_service.get_observations(
        series_id=series_id,
        limit=limit,
        observation_start=observation_start,
        observation_end=observation_end,
        sort_order=sort_order,
        units=units
    )
    return observations

