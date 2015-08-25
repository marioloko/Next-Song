class API::V1::Parties::UsersController < ApplicationController
	def accepted
		@party = Party.find(params[:party_id])
		@accepted_users = @party.get_accepted_users 
		json_format @accepted_users
	end
		
	def not_accepted
		@party = Party.find(params[:party_id])
		@not_accepted_users = @party.get_accepted_users(false)
		json_format @not_accepted_users
	end

	private
	def json_format users
		render :json => users.to_json(:only => [:id, :name, :username])
	end
end
