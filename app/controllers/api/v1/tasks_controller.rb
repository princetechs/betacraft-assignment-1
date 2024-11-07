module Api
    module V1
      class TasksController < ApplicationController
        before_action :authenticate_user!
  
        def index
          @tasks = Task.all
          render json: @tasks
        end
  
        # PATCH /api/v1/tasks/:id/complete
        def complete
          task = Task.find(params[:id])
          task.update(completed: true)
          render json: task
        end
      end
    end
  end
  