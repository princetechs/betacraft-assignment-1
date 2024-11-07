class HomeController < ApplicationController
  def index
    @user = current_user
    if @user
      @token = Token.token_for_user(@user)
    else
      # Handle the case where the user is not logged in
      # redirect_to new_user_session_path
    end
  end
end