# == Schema Information
#
# Table name: tokens
#
#  id            :bigint           not null, primary key
#  active_status :integer          default("active")
#  content       :string           default(""), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#
# Indexes
#
#  index_tokens_on_content  (content) UNIQUE
#  index_tokens_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'json_web_token'

class Token < ApplicationRecord

    belongs_to :user
  
    validates :user, :content, presence: true
  
    default_scope { order(created_at: :desc) }
  
    enum active_status: { active: 0, inactive: 1 }
  
    def self.token_for_user(user)
      last_token = user.tokens.active.first
      if last_token.present? && (Time.zone.now - last_token.created_at) < 2.seconds
        token_value = last_token.content
      else
        data = {
          user_id: user.id,
          generated_at: Time.zone.now,
          random: SecureRandom.base64
        }
  
        token_value = JsonWebToken.encode(data)
        user.tokens.create(content: token_value)
      end
      token_value
    end
  
    def self.invalidate_token_for_user(user, input_token)
      tokens = user.tokens.where(content: input_token)
      tokens.update_all(active_status: 'inactive', updated_at: Time.zone.now)
    end
  
    def self.invalidate_all_tokens_for_user(user)
      user.tokens.active.update_all(active_status: 'inactive')
    end
  end