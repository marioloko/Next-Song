class API::V1::Users::PartiesController < ApplicationController
	def index
		@parties = User.find(params[:user_id]).parties
		render :json => @parties.to_json(:only => [:id, :name], 
			:methods => [:owner])
	end

	def excluded
		@parties = Party.all - User.find(params[:user_id]).parties
		render :json => @parties.to_json(:only => [:id, :name], 
			:methods => [:owner])
	end
end
