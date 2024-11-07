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
FactoryBot.define do
  factory :comment do
    content { "MyText" }
    task { nil }
    user { nil }
  end
end
