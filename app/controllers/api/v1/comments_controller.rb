module Api
    module V1
      class CommentsController < ApplicationController
        before_action :authenticate_user!
  
        # Add a comment to a task
        def create
          task = Task.find(params[:task_id])
          comment = task.comments.new(comment_params)
          comment.user = current_user
  
          if comment.save
            render json: comment, status: :created
          else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        private
  
        def comment_params
          params.require(:comment).permit(:content)
        end
      end
    end
  end
  