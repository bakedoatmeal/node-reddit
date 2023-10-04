# Reddit Clone Node App

This is a simple Reddit clone Node.js application that uses MongoDB for data storage. Note it has not yet been styled.

## Getting Started

### Prerequisites

- Node.js (v20.2.0 or higher)
- Docker

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