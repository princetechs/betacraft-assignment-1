# app/controllers/sessions_controller.rb
require 'googleauth'

class SessionsController < ApplicationController
    def google_token_auth
      token = params[:token]
  
      # Verify the token with Google
      client = Google::Auth::IDTokens.verify_oidc(token, aud: ENV['GOOGLE_CLIENT_ID'])
      user_info = client.payload
  
      # Find or create a user based on the verified info
      user = User.find_or_create_by(email: user_info['email']) do |u|
        u.name = user_info['name']
        u.image_url = user_info['picture']
      end
  
      # Set session or return a token as per your app’s needs
      session[:user_id] = user.id  # If using sessions
  
      # Respond with user data
      render json: { email: user.email, name: user.name }
    rescue Google::Auth::IDTokens::AudienceMismatchError, Google::Auth::IDTokens::ExpiredTokenError, Google::Auth::IDTokens::SignatureError => e
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
  
