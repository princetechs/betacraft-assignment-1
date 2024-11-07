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
FactoryBot.define do
  factory :task do
    title { "MyString" }
    description { "MyText" }
    completed { false }
    project { nil }
    user { nil }
  end
end
