FROM alpine:latest

# Install nginx
RUN apk add --update nginx && rm -rf /var/cache/apk/*
# copy nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./build/ /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
