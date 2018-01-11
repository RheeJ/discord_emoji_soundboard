FROM ubuntu:trusty

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y software-properties-common

COPY package*.json ./

RUN apt-add-repository ppa:mc3man/trusty-media
RUN apt-get update && apt-get install -y ffmpeg

RUN apt-get update && apt-get install -y \
  apt-transport-https \
  curl

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN apt-get install -y yarn
RUN apt-get install -y git
RUN yarn install

COPY . .

EXPOSE 8000

CMD ["node","bot.js"]