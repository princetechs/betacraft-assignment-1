# Kulu Assignment

A comprehensive project management system built with Ruby on Rails and React, enabling efficient task management, user collaboration, and project organization.

> **Note:** All features are implemented. Only Test-Driven Development (TDD) implementation remains to be completed.

## Features

- 🔐 User authentication with Google OAuth2
- 📋 Task creation and management
- 💬 Real-time commenting system
- 📊 Project organization and tracking

## Tech Stack

### Backend
- Ruby on Rails 7.2
- PostgreSQL
- Devise for authentication
- RSpec for testing

### Frontend
- React 18
- Esbuild for asset bundling
- TailwindCSS for styling



## Prerequisites

Ensure you have the following installed:

- Ruby >= 3.x (`rvm` or `rbenv` recommended for Ruby version management)
- Node.js >= 16.x
- Yarn package manager
- PostgreSQL >= 13
- Redis >= 6.0
- Docker & Docker Compose (optional)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd kulu-assignment
```

### 2. Install Dependencies

```bash
# Install Ruby dependencies
bundle install

# Install Node.js dependencies
yarn install
```

### 3. Database Setup

```bash
# Create and setup the database
rails db:create db:migrate

# (Optional) Load sample data
rails db:seed
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash

# Google OAuth2 credentials
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret


### 5. Start the Development Server

```bash
# Start Rails server
rails server

# In a separate terminal, start webpack dev server
yarn build --watch

# Start Sidekiq for background jobs
bundle exec sidekiq
```

Visit `http://localhost:3000` to access the application.


## Deployment

### Production Build

```bash
# Precompile assets
rails assets:precompile

# Build production frontend
yarn build:production
```

### Environment Variables for Production

Ensure these additional environment variables are set in production:

```bash
RAILS_MASTER_KEY=<your-master-key>
```
## Credit

This project was built using the beta-rails boilerplate to streamline the initial Rails setup.




