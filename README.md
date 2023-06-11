# TaskTracker
[![Demo](https://i.imgur.com/VEtS8TO.jpg)](https://i.imgur.com/VEtS8TO.jpg)

## Dependencies

- [Docker](https://www.docker.com/) **(Required)** - Used for building, shipping, and running the microservices using containers. Docker-compose and a NGINX proxy is used for scalability and container management.

## Installation Guide

To install the application, follow the instructions and run the appropriate file below based on your setup:

| Setup       | Command        |
|-------------|----------------|
| Docker + Linux    | `./docker-start.sh` |
| Docker + Windows  | `docker-start.bat` |

When using Docker, make sure Docker is installed and the daemon is running on your system before running the appropriate start file based on your operating system. The `docker-start.sh` and `docker-start.bat` scripts will build the Docker images and start the containers for you. If you rerun the start file it will first stop any existing containers and then rebuild and rerun the containers.

Once the application is started, you can access it by navigating to `http://localhost` in your web browser.
