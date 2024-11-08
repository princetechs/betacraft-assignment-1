# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_projects_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy
  has_many :project_memberships, dependent: :destroy
  has_many :members, through: :project_memberships, source: :user

  # Validations
  validates :name, presence: true
  validates :description, presence: true

  # Method to fetch member details (id, first_name, last_name, email)
  def member_details
    members.select(:id, :first_name, :last_name, :email)
  end

  # Invite a user to the project (add user to project_memberships with default role)
  def invite_user(user)
    return false if members.include?(user)

    # Add user to the project with 'member' role
    project_memberships.create(user: user, role: 'member')
  end
end