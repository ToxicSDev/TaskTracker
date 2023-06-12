# TaskTracker
[![Demo](https://i.imgur.com/VEtS8TO.jpg)](https://i.imgur.com/VEtS8TO.jpg)

TaskTracker is a robust and comprehensive project management tool designed to significantly enhance task tracking efficiency, both at an individual level and within team-based settings. Its primary objective is to simplify and automate task management processes, consequently increasing productivity and improving project outcomes. One of the standout features of TaskTracker is its intuitive web application interface, which has been crafted with the end user in mind.

The categorization feature of TaskTracker is boundless, allowing for the creation of unlimited categories. This means that users have the freedom to break down their projects into as many sections as they deem necessary. TaskTracker also allows for an infinite number of tasks to be assigned to each category, ensuring that no task, regardless of how minor, is left out. This means that every aspect of a project, from the smallest detail to the biggest component, can be tracked and managed effectively.

One of the most convenient features of TaskTracker is the ability to easily move tasks around by dragging and dropping them into different categories. This is extremely useful for adjusting task priorities, reassigning tasks, or changing task categories as the project evolves. This flexibility empowers teams and individuals to adapt swiftly to project changes and maintain effective task management despite any unforeseen shifts in project dynamics.

## Architecture

[![Architecture](https://i.imgur.com/yHKmu4y.jpg)](https://i.imgur.com/yHKmu4y.jpg)

## Dependencies

- [Docker](https://www.docker.com/) **(Required)** - Used for building, shipping, and running the microservices using containers. Docker-compose and a NGINX proxy is used for scalability and container management.

#### NPM Packages

- [react](https://www.npmjs.com/package/react) - Enables us to build our user interface with reusable components.

- [react-dnd](https://www.npmjs.com/package/react-dnd) - Facilitates drag-and-drop capabilities for a more engaging user experience.

- [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend) - Provides HTML5 drag-and-drop support for our React DnD implementation.

- [react-dom](https://www.npmjs.com/package/react-dom) - Bridges the gap between React and the DOM, allowing us to render our user interface in the browser.

- [react-redux](https://www.npmjs.com/package/react-redux) - Ensures efficient and consistent data flow by integrating Redux with React.

- [redux](https://www.npmjs.com/package/redux) - Predictable state container for JavaScript, ensuring the management of application state is consistent and maintainable.

- [localforage](https://www.npmjs.com/package/localforage) - Boosts web application performance by leveraging the browser's indexedDB and WebSQL storage for offline use.

- [prop-types](https://www.npmjs.com/package/prop-types) - Helps document and verify the types of properties in our React components.

- [uuid](https://www.npmjs.com/package/uuid) - Generates unique identifiers.

## Installation Guide

To install the application, follow the instructions and run the appropriate file below based on your setup:

| Setup       | Command        |
|-------------|----------------|
| Docker + Linux    | `./docker-start.sh` |
| Docker + Windows  | `docker-start.bat` |

When using Docker, make sure Docker is installed and the daemon is running on your system before running the appropriate start file based on your operating system. The `docker-start.sh` and `docker-start.bat` scripts will build the Docker images and start the containers for you. If you rerun the start file it will first stop any existing containers and then rebuild and rerun the containers.

Once the application is started, you can access it by navigating to `http://localhost` in your web browser.

## License

This project is licensed under the MIT License. This implies that you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, given that you include the original copyright notice and the permission notice in all copies or substantial portions of the software. For more information, please see the [LICENSE](LICENSE) file in our project repository or visit the Open Source Initiative website.
