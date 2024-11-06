class TasksController < InheritedResources::Base

  private

    def task_params
      params.require(:task).permit(:title, :description, :completed, :project_id, :user_id)
    end

end
