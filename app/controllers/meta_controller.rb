# app/controllers/meta_controller.rb
class MetaController < ApplicationController
    def show
      respond_to do |format|
        format.json { render json: { message: 'Meta information' } }
      end
    end
  end
  