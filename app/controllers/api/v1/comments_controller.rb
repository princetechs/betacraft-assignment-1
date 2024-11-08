module Api
  module V1
    class CommentsController < BaseController
      before_action :authenticate_user!
      before_action :set_task

      def index
        comments = @task.all_comments
        render json: comments, include: [:user, :parent_comment], status: :ok
      end

      def create
        parent_comment = Comment.find_by(id: params[:parent_comment_id])
        comment = @task.comments.new(comment_params)
        comment.user = current_user
        comment.parent_comment = parent_comment 

        if comment.save
          render json: comment, status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_task
        @task = Task.find(params[:task_id])
      end

      def comment_params
        params.require(:comment).permit(:content)
      end
    end
  end
end