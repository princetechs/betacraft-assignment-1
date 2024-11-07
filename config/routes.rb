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

  # API namespace for user profile and project-related actions
  namespace :api do
    namespace :v1 do
      # User profile data route
      get 'profile', to: 'users#profile'

      # Project routes (CRUD), invites, and nested tasks/memberships
      resources :projects, only: [:index, :show, :create, :update, :destroy] do
        member do
          post :invite # Custom route to invite users to a project
        end

        # Nested resources for tasks and project memberships
        resources :tasks, only: [:show, :create] do
          member do
            patch :complete # Mark a task as completed
          end
        end

        resources :project_memberships, only: [:create] # Invite a user to the project
      end

      # Task routes (CRUD) with nested comments
      resources :tasks, only: [:create, :update, :destroy] do
        resources :comments, only: [:create, :update, :destroy] # Comment actions for tasks
      end
    end
  end

  # Root route for React (redirect to React app's entry point)
  root 'home#index'

  # Health check route
  get 'up', to: 'rails/health#show', as: :rails_health_check

  # Catch-all route for unmatched paths - for React frontend routing
  get '*path', to: 'home#index', via: :all
end
