# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string           default(""), not null
#  last_name              :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :omniauthable, 
         omniauth_providers: [:google_oauth2]

  # Associations
  has_many :tokens
  has_many :projects
  has_many :tasks
  has_many :comments
  has_many :project_memberships
  has_many :joined_projects, through: :project_memberships, source: :project

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  # Method to check if a user is a member of a project
  def member_of?(project)
    project.members.include?(self)
  end

  # OmniAuth method to create or find user from Google OAuth
  def self.from_omniauth(access_token)
    user = User.where(email: access_token.info.email).first_or_initialize
    user.password ||= Devise.friendly_token[0, 20]
    user.first_name = access_token.info.first_name
    user.last_name = access_token.info.last_name
    user.image = access_token.info.image
    user.uid = access_token.uid
    user.provider = access_token.provider
    user.save
    user
  end
end