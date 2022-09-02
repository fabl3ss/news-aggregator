from typing import Optional
from analysis import *

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
import nltk
nltk.download('punkt')

class Input(BaseModel):
    text: Optional[str]
    language: Optional[str]
    sentences: Optional[int]


app = FastAPI()

@app.post("/summarize")
def ai_root(request: Input):
    input = jsonable_encoder(request)
    return {"response": summarize(input['text'], input['language'], input['sentences'])}
