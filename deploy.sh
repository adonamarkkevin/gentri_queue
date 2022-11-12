docker stop gentri_be_queue_container
docker rm gentri_be_queue_container
docker rmi gentri_be_queue_img

docker build -t gentri_be_queue_img .
docker run -d -p 9000:9000 --name gentri_be_queue_container gentri_be_queue_img
docker image prune -f