module Api
    module V1
      class ProjectMembershipsController < BaseController
        before_action :authenticate_user!
  
        # Invite a user to a project
        def create
          project = Project.find(params[:project_id])
          user_to_invite = User.find_by(email: params[:email])
  
          if user_to_invite.nil?
            return render json: { error: 'User not found' }, status: :not_found
          end
  
          # Check if the user is already a member of the project
          if project.members.exists?(user_to_invite.id)
            return render json: { error: 'User is already a member of the project' }, status: :unprocessable_entity
          end
  
          project.memberships.create(user: user_to_invite, role: params[:role])
  
          render json: { message: 'User invited successfully' }, status: :created
        end
      end
    end
  end
  