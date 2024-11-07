class AuthenticateTokenService

    attr_reader :request
  
    def initialize(request)
      @request = request
    end
  
    def call
      raise 'Not Authenticated' unless user_id_in_token?
  
      validate_token
      get_response(true)
    rescue JWT::VerificationError, JWT::DecodeError, ActiveRecord::RecordNotFound
      get_response(false, 'Not Authenticated')
  
      #   rescue => msg
      #     get_response(false, msg)
    end
  
    private
  
    def get_response(success, message = nil)
      user = (token.user if success)
      {
        success:,
        message:,
        user:
      }
    end
  
    def token
      @token ||= Token.active.where(content: http_token, user_id: auth_token[:user_id]).last
    end
  
    def user_id_in_token?
      http_token && auth_token && auth_token[:user_id].to_i
    end
  
    def http_token
      @http_token ||= (request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?)
    end
  
    def auth_token
      @auth_token ||= decode_token
    end
  
    def decode_token
      JsonWebToken.decode(http_token)
    end
  
    def validate_token
      return if token
  
      raise 'Invalid token'
  
      # Not required as of now
      # if token.updated_at < Rails.application.credentials.jwt[:SESSION_TIMEOUT].to_i.seconds.ago
      #   raise 'Session expired'
      # end
      # if token.created_at < Rails.application.credentials.jwt[:FORCE_TIMEOUT].to_i.seconds.ago
      #   raise 'Session force expired'
      # end
    end
  end