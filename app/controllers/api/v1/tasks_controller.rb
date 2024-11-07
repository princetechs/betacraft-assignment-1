module Api
  module V1
    class TasksController < BaseController
      before_action :set_project
      before_action :set_task, only: [:show, :update, :destroy, :complete]

      # GET /api/v1/projects/:project_id/tasks
      def index
        tasks = @project.tasks
        render json: tasks, status: :ok
      end
      # Create a task for a project
      def create
        assigned_user = @project.members.find_by(id: params[:task][:user_id])
        
        if assigned_user.nil?
          render json: { error: "User not found or not a project member" }, status: :not_found and return
        end

        task = @project.tasks.new(task_params)
        task.user = assigned_user

        if task.save
          render json: task, status: :created
        else
          render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # Mark a task as completed
      def complete
        if @task.user != current_user
          return render json: { error: 'You can only complete your own tasks' }, status: :forbidden
        end

        @task.update(completed: true)
        render json: { message: 'Task marked as completed', task: @task }, status: :ok
      end

      # Update a task
      def update
        if @task.update(task_params)
          render json: @task, status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # Delete a task
      def destroy
        @task.destroy
        head :no_content
      end

      private

      def set_project
        @project = Project.find(params[:project_id])
      end

      def set_task
        @task = @project.tasks.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Task not found' }, status: :not_found
      end

      def task_params
        params.require(:task).permit(:title, :description, :completed)
      end
    end
  end
end
