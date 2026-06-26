import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).parent.parent / "data" / "engineering_colleges.csv"

def load_colleges():
    df = pd.read_csv(DATA_PATH)
    return df


def get_college_details(college_name):
    df = load_colleges()

    result = df[
        df["College Name"].str.contains(
            college_name,
            case=False,
            na=False
        )
    ]

    if result.empty:
        return None

    return result.iloc[0]