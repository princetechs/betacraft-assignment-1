class ProjectsController < InheritedResources::Base

  private

    def project_params
      params.require(:project).permit(:name, :description, :user_id)
    end

end
