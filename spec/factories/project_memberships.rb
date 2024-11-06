FactoryBot.define do
  factory :project_membership do
    project { nil }
    user { nil }
    role { "MyString" }
  end
end
