# == Schema Information
#
# Table name: tasks
#
#  id          :bigint           not null, primary key
#  completed   :boolean
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  project_id  :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_tasks_on_project_id  (project_id)
#  index_tasks_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (user_id => users.id)
#
class Task < ApplicationRecord
  belongs_to :project
  belongs_to :user
  has_many :comments, dependent: :destroy

  # Scopes
  scope :recent, -> { order(created_at: :desc) }  
  scope :due_soon, -> { where('due_date < ?', 1.week.from_now) } 

  # Method to check if a task has any comments
  def has_comments?
    comments.exists?
  end

  # Method to get all comments for a task, with their associated user and parent comments
  def all_comments
    comments.includes(:user, :parent_comment).ordered
  end
end
