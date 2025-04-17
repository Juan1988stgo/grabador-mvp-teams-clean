FROM node:18-slim

RUN apt-get update && apt-get install -y     ffmpeg     xvfb     chromium     && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN npm install

CMD ["bash", "start.sh"]