class ApplicationController < ActionController::Base

  before_action :set_sentry_context
  protect_from_forgery with: :null_session

  private

  def set_sentry_context
    Sentry.set_user(id: session[:current_user_id]) # or any other relevant user information
    Sentry.set_extras(params: params.to_unsafe_h, url: request.url)
  end

  def set_format
    request.format = :json
  end
end