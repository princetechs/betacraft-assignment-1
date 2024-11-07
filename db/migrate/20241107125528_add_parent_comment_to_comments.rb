class AddParentCommentToComments < ActiveRecord::Migration[7.2]
  disable_ddl_transaction!  

  def change
    add_column :comments, :parent_comment_id, :bigint
    add_index :comments, :parent_comment_id, algorithm: :concurrently  # Create index concurrently
  end
end