module Api
  module V1
    class ProjectsController < BaseController
    before_action :set_user, only: [:index, :create]
    before_action :set_project, only: [:show, :update, :destroy, :invite_member]
  
    # GET /api/v1/projects
    def index
      @projects = @user.projects
      render json: @projects
    end
  
    # POST /api/v1/projects
    def create
      @project = @user.projects.build(project_params)
      if @project.save
        render json: @project, status: :created
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  
    # GET /api/v1/projects/:id
    def show
      render json: @project
    end
  
    # PATCH/PUT /api/v1/projects/:id
    def update
      if @project.update(project_params)
        render json: @project
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /api/v1/projects/:id
    def destroy
      @project.destroy
      head :no_content
    end
  
    # POST /api/v1/projects/:id/invite
    def invite
      if @project.nil?
        render json: { error: "Project not found" }, status: :not_found and return
      end
  
      user = User.find_by(email: params[:email])
  
      if user && @project.members << user
        render json: { message: "User invited successfully" }, status: :ok
      else
        render json: { error: "Unable to invite user" }, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_user
      @user = current_user
    end
  
    def set_project
      @project = Project.find_by(id: params[:id])  # Use `find_by` to prevent an exception
      # If the project is not found, we can return a 404 response
      render json: { error: "Project not found" }, status: :not_found if @project.nil?
    end
  
    def project_params
      params.require(:project).permit(:name, :description)
    end
  end
end
end