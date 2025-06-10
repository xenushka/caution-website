FROM ruby:3.2.2-alpine AS builder
LABEL stage=caution-co-builder
RUN apk update && apk add g++ make git git-lfs
RUN mkdir -p /home
COPY Gemfile /home
COPY Gemfile.lock /home
COPY _vendor /home/_vendor
WORKDIR /home
RUN bundle install
COPY . /home
RUN jekyll build

FROM debian:bookworm AS mime-types
RUN apt-get update && apt-get install -y media-types

RUN echo 'types {' > /tmp/mime.types
RUN sed -e '/^$/d' -e 's/$/;/' /etc/mime.types >> /tmp/mime.types
RUN echo '}' >> /tmp/mime.types

FROM nginx
COPY --from=builder /home/_site /usr/share/nginx/html
COPY --from=mime-types /tmp/mime.types /etc/nginx/mime.types
