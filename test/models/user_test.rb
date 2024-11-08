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

require "test_helper"
require 'ostruct'
class UserTest < ActiveSupport::TestCase
  # Validation Tests
  test "should not save user without first_name" do
    user = User.new(last_name: "Doe", email: "user@example.com", password: "password")
    assert_not user.save, "Saved the user without a first_name"
  end

  test "should not save user without last_name" do
    user = User.new(first_name: "John", email: "user@example.com", password: "password")
    assert_not user.save, "Saved the user without a last_name"
  end

  test "should not save user without email" do
    user = User.new(first_name: "John", last_name: "Doe", password: "password")
    assert_not user.save, "Saved the user without an email"
  end

  test "should save user with valid attributes" do
    user = User.new(first_name: "John", last_name: "Doe", email: "user@example.com", password: "password")
    assert user.save, "Could not save the user with valid attributes"
  end

  test "should not allow duplicate emails" do
    user1 = User.create(first_name: "John", last_name: "Doe", email: "user@example.com", password: "password")
    user2 = User.new(first_name: "Jane", last_name: "Smith", email: "user@example.com", password: "password")
    assert_not user2.save, "Saved a user with a duplicate email"
  end

  # Association Tests
  test "should have many tokens" do
    assert_equal :has_many, User.reflect_on_association(:tokens).macro
  end

  test "should have many projects" do
    assert_equal :has_many, User.reflect_on_association(:projects).macro
  end

  test "should have many tasks" do
    assert_equal :has_many, User.reflect_on_association(:tasks).macro
  end

  test "should have many comments" do
    assert_equal :has_many, User.reflect_on_association(:comments).macro
  end

  test "should have many joined projects through project memberships" do
    assert_equal :has_many, User.reflect_on_association(:joined_projects).macro
  end

  # Method Tests
  test "should create or find user from omniauth" do
    access_token = OpenStruct.new(info: OpenStruct.new(email: "new_user@example.com"))
    user = User.from_omniauth(access_token)
    assert_equal "new_user@example.com", user.email
  end
end