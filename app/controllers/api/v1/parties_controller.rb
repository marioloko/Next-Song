class API::V1::PartiesController < ApplicationController
	def index
		@parties = Party.all
		json_format @parties	
	end

	def show
		@party = Party.find params[:id]
		json_format @party	
	end

	private
	def json_format parties
		render :json => parties.to_json(:only => [:id, :name],
			:methods => [:owner])
	end
end
