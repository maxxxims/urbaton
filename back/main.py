from fastapi import FastAPI
import uvicorn
from dependencies import SessionLocal, engine, Base, CONFIG
from fastapi.responses import RedirectResponse
import routes.park
import routes
import database.park
import pandas as pd


def get_application() -> FastAPI:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    df_parking = pd.read_excel(CONFIG.get('PATH_TO_PARKS'))
    column_names = ['latitude', 'longitude', 'description', 'signature']
    df_parking.drop(columns=[col for col in df_parking.columns
                              if col not in column_names], inplace=True)
    df_parking['adress'] = df_parking.apply(
        lambda row: row['description'].replace('\n', '').split('</br>')[-1], axis=1
    )
    df_parking['photo_url'] = 'https://www.mostribuna.ru/images/718.jpg'
    # print(df_parking)
    # print(df_parking['description'][0].replace('\n', ''))
    database.park.add_parks(SessionLocal(), df_parking.to_dict('records'))

    app = FastAPI()
    app.include_router(routes.park)
    app.include_router(routes.user)
    return app

app = get_application()


@app.get("/", deprecated=True)
async def root():
    return RedirectResponse('/docs')

if __name__ == "__main__":
    uvicorn.run(app, host=CONFIG.get('HOST'), port=CONFIG.get('PORT'))