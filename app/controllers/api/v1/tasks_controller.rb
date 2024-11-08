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
        assigned_user = @project.members.find_by(id: task_params[:user_id])
        
        if assigned_user.nil?
          render json: { error: "User not found or not a project member" }, status: :not_found and return
        end

        task = @project.tasks.new(task_params.merge(user: assigned_user))

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

        if @task.update(completed: true)
          render json: { message: 'Task marked as completed', task: @task }, status: :ok
        else
          render json: { error: 'Unable to complete task' }, status: :unprocessable_entity
        end
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
        @project = Project.find_by(id: params[:project_id])
        render json: { error: 'Project not found' }, status: :not_found if @project.nil?
      end

      def set_task
        @task = @project.tasks.find_by(id: params[:id])
        render json: { error: 'Task not found' }, status: :not_found if @task.nil?
      end

      def task_params
        params.require(:task).permit(:title, :description, :completed, :user_id)
      end
    end
  end
end