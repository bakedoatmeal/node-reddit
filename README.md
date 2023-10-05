# Reddit Clone Node App

This is a simple Reddit clone Node.js application that uses MongoDB for data storage. [Deployed on CapRover](https://reddit-clone.devops.berrybakedoatmeal.com/)

## Getting Started

### Prerequisites
- Docker

### Status Page
![Uptime Robot status](https://img.shields.io/uptimerobot/status/m795416254-0db1cb9d239b1b030774bef4) ![Website](https://img.shields.io/website?url=https%3A%2F%2Freddit-clone.devops.berrybakedoatmeal.com)


[Check Status Here](https://stats.uptimerobot.com/DD69Afj3Nm)

### Installation

1. Clone this repository:

   git clone https://github.com/your/repo.git
   cd repo

2. Docker deployment

   docker build -t reddit-clone-app .
   docker run -p 3000:3000 reddit-clone-app
   docker-compose build
   docker-compose up

Access the app in your browser at http://localhost:3000.