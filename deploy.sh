docker stop queue_be
docker rm queue_be
docker rmi gentri_be

docker build -t gentri_be .
docker run -d -p 9000:9000 --name queue_be gentri_be
docker image prune -f