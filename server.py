from typing import Optional
from analysis import *

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel


class Input(BaseModel):
    text: Optional[str]
    language: Optional[str]
    sentences: Optional[int]


app = FastAPI()


@app.post("/ai")
async def ai_root(request: Input):
    input = jsonable_encoder(request)
    print(input, type(input))
    return {"responce": summarize(input['text'], input['language'], input['sentences'])}
