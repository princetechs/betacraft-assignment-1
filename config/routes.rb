require "sidekiq/web"
require "sidekiq-scheduler/web"

Rails.application.routes.draw do
  # Devise routes for user authentication
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  # Sidekiq Web UI - accessible only by authenticated admin users
  authenticate :admin_user do
    mount Sidekiq::Web => '/sidekiq'
  end

  # Meta route for CSRF token
  get 'meta', to: 'meta#show', defaults: { format: :json }

  # Authentication routes for Google OAuth
  post '/users/google_oauth2', to: 'sessions#google_token_auth'
  get 'users/auth/failure', to: 'sessions#failure'

  # API namespace for profile and project-related actions
  namespace :api do
    namespace :v1 do
      get 'profile', to: 'users#profile'      # User profile data
      resources :projects, only: [:index, :show, :create, :update, :destroy]  # Project actions (CRUD)
      resources :tasks, only: [:create, :update, :destroy]                      # Task actions (CRUD)
      resources :comments, only: [:create, :update, :destroy]                   # Comment actions (CRUD)
    end
  end

  # Root route for React (redirect to React app's entry point)
  root 'home#index'

  # Health check route (used for monitoring)
  get 'up', to: 'rails/health#show', as: :rails_health_check

  # Catch-all route for unmatched paths
  # This should point to the React frontend, which will handle routing
  get '*path', to: 'home#index', via: :all
end
