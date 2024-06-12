# Food Spinner

This project is a food spinner wheel that randomly selects a fast food place within a desired radius from the input location. It consists of a frontend built with Svelte and a backend server built with Node, which is containerized using Docker.

## Getting Started

To run the frontend, navigate to the projects frontend directory and run the following command:

```bash
npm run dev
```

This will start the development server and you can access the application in your browser at the location specified by Vite after the command is executed.

To run the backend server, make sure you have Docker installed and then run the following command from the projects server directory:

```bash
docker-compose up --build
```

This will build and start the Docker container for the Node server.

## Usage

Once the application is running, you can enter your desired location and radius in the input fields. Clicking the "Spin the Wheel!" button will randomly select a fast food place within the specified radius from the input location.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Authors

- **Camila** - Project construction and initial work - [camila314](https://github.com/camila314)
- **Brendon Newton** - Further development and backend implementation - [brendonnewt](https://github.com/brendonnewt)

See also the list of [contributors](https://github.com/brendonnewt/food-spinner/graphs/contributors) who participated in this project.
