# InvisibleDataHand

## How to Run the Project

1. **Install Docker**  
   Ensure that Docker is installed on your machine and running.
2. **Set up environment variables**  
   Copy the example `.env copy` file to `.env`; no need to add any keys for local development. 
3. **Build and run the project using Docker Compose**  
    Start the project
    ```bash
    docker-compose up --build
     ```
     Stop the project
     ```bash
    docker-compose down
     ```

## Stack 

* Frontend: React — running at http://localhost:5173

* Backend: FastAPI — running at http://localhost:8000/docs


## Run Frontend Only

Set the directory:
```bash
cd client
```
Install libraries:
```bash
npm i 
```
Run the project:
```bash
npm run dev
```


## Libraries

### Fred graphs

- Consumer Price Index for All Urban Consumers: CPIAUCSL
- Inflation: FPCPITOTLZGUSA
- Unemployment Rate: UNRATE
- Federal Funds Effective Rate: FEDFUNDS