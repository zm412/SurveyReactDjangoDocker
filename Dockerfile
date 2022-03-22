
FROM python:3
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
RUN apt-get update 
COPY requirements.txt requirements.txt
COPY . . 
COPY manage.py manage.py
RUN pip install -r requirements.txt --upgrade pip
