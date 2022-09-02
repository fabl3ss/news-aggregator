FROM python:3.9-slim-buster

RUN pip install -U nltk

WORKDIR /neural

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["pip install git+git://github.com/miso-belica/sumy.git"]

EXPOSE 5010

CMD ["uvicorn", "server:app", "--host=0.0.0.0", "--port=5010"]
