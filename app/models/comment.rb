# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  content           :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  parent_comment_id :bigint
#  task_id           :bigint           not null
#  user_id           :bigint           not null
#
# Indexes
#
#  index_comments_on_parent_comment_id  (parent_comment_id)
#  index_comments_on_task_id            (task_id)
#  index_comments_on_user_id            (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (task_id => tasks.id)
#  fk_rails_...  (user_id => users.id)
#

class Comment < ApplicationRecord
  # Validations
  validates :content, presence: true

  # Associations
  belongs_to :task
  belongs_to :user
  belongs_to :parent_comment, class_name: 'Comment', optional: true
  has_many :child_comments, class_name: 'Comment', foreign_key: 'parent_comment_id', dependent: :destroy

  # Scopes
  scope :root_comments, -> { where(parent_comment_id: nil) } 
  scope :ordered, -> { order(created_at: :asc) }            

  # Check if a comment has any replies (child comments)
  def has_replies?
    child_comments.exists?
  end


  # Fetches the complete comment thread for a specific task
  def self.thread_for_task(task_id)
    where(task_id: task_id).includes(:user, :parent_comment).ordered
  end
end
