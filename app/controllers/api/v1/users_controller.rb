module Api
    module V1
      class UsersController < BaseController
        before_action :authenticate_user!
  
        def profile
          render json: {
            user: {
              id: current_user.id,
              email: current_user.email,
              first_name: current_user.first_name,
              last_name: current_user.last_name,
              created_at: current_user.created_at,
              updated_at: current_user.updated_at
            }
          }, status: :ok
        end
      end
    end
  end
  