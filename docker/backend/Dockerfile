FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

RUN apt-get update && apt-get install make

RUN useradd -d /app -r app

WORKDIR /app

COPY ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip

RUN pip install -r /app/backend/requirements.txt

COPY  ./docker /app/docker

COPY ./backend /app/backend

EXPOSE 8000
