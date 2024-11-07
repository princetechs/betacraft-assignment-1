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
FactoryBot.define do
  factory :token do
    
  end
end
