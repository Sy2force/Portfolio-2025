#!/bin/bash

# Portfolio Deployment Script
# This script handles the deployment of both frontend and backend

set -e

echo "🚀 Starting Portfolio Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if environment files exist
if [ ! -f "./backend/.env" ]; then
    print_warning "Backend .env file not found. Creating from .env.example..."
    cp ./backend/.env.example ./backend/.env
    print_warning "Please update ./backend/.env with your actual configuration."
fi

if [ ! -f "./frontend/.env.local" ]; then
    print_warning "Frontend .env.local file not found. Creating from .env.example..."
    cp ./frontend/.env.example ./frontend/.env.local
    print_warning "Please update ./frontend/.env.local with your actual configuration."
fi

# Build and start services
print_status "Building and starting services with Docker Compose..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_success "Services are running!"
    
    # Display service URLs
    echo ""
    echo "📊 Service URLs:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:5001"
    echo "   Health:   http://localhost:5001/health"
    echo ""
    
    # Test backend health
    if curl -f http://localhost:5001/health > /dev/null 2>&1; then
        print_success "Backend health check passed!"
    else
        print_warning "Backend health check failed. Check logs with: docker-compose logs backend"
    fi
    
    print_success "Deployment completed successfully! 🎉"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Visit http://localhost:3000 to see your portfolio"
    echo "   2. Seed the database: docker-compose exec backend npm run seed"
    echo "   3. Check logs: docker-compose logs -f"
    echo "   4. Stop services: docker-compose down"
    
else
    print_error "Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi
