class CommentsController < InheritedResources::Base

  private

    def comment_params
      params.require(:comment).permit(:content, :task_id, :user_id)
    end

end
