class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def google_oauth2
    handle_auth('Google')
  end

  def github
    handle_auth('Github')
  end

  private

  def handle_auth(kind)
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.persisted?
      token = Token.token_for_user(@user)
      redirect_to "http://localhost:3000/auth/callback?token=#{token}"

    else
      render json: {
        success: false,
        error: @user.errors.full_messages.join("\n")
      }, status: :bad_request
    end
  end
end