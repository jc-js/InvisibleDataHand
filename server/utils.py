from decimal import Decimal

def convert_floats_to_decimal(data):
        if isinstance(data, float):  
            return Decimal(str(data))
        elif isinstance(data, dict):  
            return {k: convert_floats_to_decimal(v) for k, v in data.items()}
        elif isinstance(data, list):  
            return [convert_floats_to_decimal(i) for i in data]
        else:
            return data  