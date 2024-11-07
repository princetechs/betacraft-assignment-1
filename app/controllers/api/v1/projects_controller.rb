class Api::V1::ProjectsController < Api::V1::BaseController
    skip_before_action :verify_authenticity_token
  
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
    def invite_member
      user = User.find_by(email: params[:email])
      if user && @project.members << user
        render json: { message: "User invited successfully" }, status: :ok
      else
        render json: { error: "Unable to invite user" }, status: :unprocessable_entity
      end
    end
  
    rescue_from ActionController::ParameterMissing do |e|
        render json: { error: e.message }, status: :bad_request
      end
    
      private
  
    def set_user
      # Replace this with the actual method of retrieving the user; for now, we're using a user_id parameter.
      @user = User.find(params[:user_id])
    end
  
    def set_project
      # Replace `@user` here with `User` to find projects without relying on current_user
      @project = Project.find(params[:id])
    end
  
    def project_params
      params.require(:project).permit(:name, :description)
    end
  end
  