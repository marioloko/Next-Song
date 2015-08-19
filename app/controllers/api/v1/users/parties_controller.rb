class API::V1::Users::PartiesController < ApplicationController
	def index
		@parties = User.find(params[:user_id]).parties
		json_format @parties
	end

	def excluded
		@parties = Party.all - User.find(params[:user_id]).parties
		json_format @parties
	end

	def search
		@parties = Party.search params[:search]
		json_format @parties
	end

	def search_excluded
		@parties = Party.search(params[:search]) - 
			User.find(params[:user_id]).parties
		json_format @parties
	end

	private
	def json_format parties 
		render :json => parties.to_json(:only => [:id, :name], 
			:methods => [:owner])
	end
end
