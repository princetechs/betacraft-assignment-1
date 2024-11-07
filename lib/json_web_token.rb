# lib/json_web_token.rb
require 'jwt'

class JsonWebToken

  SECRET_KEY = ENV['JWT_SECRET_KEY'] || 'fallback_secret_key'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    body = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(body)
  rescue JWT::ExpiredSignature, JWT::VerificationError => e
    raise e
  end
end
