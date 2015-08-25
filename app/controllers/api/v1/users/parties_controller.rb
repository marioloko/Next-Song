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

	def accepted
		@user = User.find params[:user_id]
		@accepted_parties = @user.get_accepted_parties
		json_format @accepted_parties
	end

	def not_accepted
		@user = User.find params[:user_id]
		@not_accepted_parties = @user.get_accepted_parties(false)
		json_format  @not_accepted_parties
	end

	private
	def json_format parties 
		Party.current_user  User.find(params[:user_id])
		render :json => parties.to_json(:only => [:id, :name], 
			:methods => [:owner, :accepted])
	end
end
