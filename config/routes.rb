require "sidekiq/web"
require "sidekiq-scheduler/web"

Rails.application.routes.draw do
  # Devise and Admin routes
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  # Sidekiq Web UI - accessible only by authenticated admin users
  authenticate :admin_user do
    mount Sidekiq::Web => '/sidekiq'
  end
# config/routes.rb
get 'meta', to: 'meta#show', defaults: { format: :json }
post '/users/google_oauth2', to: 'sessions#google_token_auth'
  get 'users/auth/failure', to: 'sessions#failure'

  # Resource routes
  resources :projects
  resources :tasks
  resources :comments

  # Root and static routes
  root 'home#index'
  get 'up', to: 'rails/health#show', as: :rails_health_check

  # API namespace


  # Catch-all route for unmatched paths
  get '*path', to: 'home#index', via: :all
end
