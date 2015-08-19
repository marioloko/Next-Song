class API::V1::PartiesController < ApplicationController
	def index
		@parties = Party.all
		render :json => @parties.to_json(:only => [:id, :name], 
			:methods => [:owner])
	end

	def show
		@party = Party.find params[:id]
		render :json => @party.to_json(:only => [:id, :name],
			:methods => [:owner])
	end
end
