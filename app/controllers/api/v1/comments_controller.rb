module Api
  module V1
    class CommentsController < BaseController
      before_action :authenticate_user!

      def index
        task = Task.find(params[:task_id])
        comments = task.comments.includes(:user, :parent_comment).order(created_at: :asc)

        render json: comments, include: [:user, :parent_comment], status: :ok
      end

      # Action to create a new comment for a task
      def create
        task = Task.find(params[:task_id])
        parent_comment = Comment.find_by(id: params[:parent_comment_id]) 
        comment = task.comments.new(comment_params)
        comment.user = current_user
        comment.parent_comment = parent_comment 
        if comment.save
          render json: comment, status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      # Strong parameters for comment creation
      def comment_params
        params.require(:comment).permit(:content)
      end
    end
  end
end