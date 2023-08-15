

# ommit authentication step to connect to the X Server; allow anyone to connect
xhost +

# INTERACTIVE CYPRESS
# To start in the interactive mode we need to pass both filenames to the docker

# docker-compose -f docker-compose.yml -f cy-open.yml up --exit-code-from cypress

docker-compose -f e2e/docker-compose.yml -f e2e/cy-open.yml up --exit-code-from cypress

xhost -
