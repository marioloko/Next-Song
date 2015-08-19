class PartiesController < ApplicationController
	before_action :authenticate_user!

	def create
		@party = Party.new party_params
		if @party.save
			redirect_to edit_party_path(@party.id)
		else
			render 'users/profile'
		end
	end

	def edit
		@party = Party.find params[:id]
		@track = Track.new
		unless @party.user_id == current_user.id	
			redirect_to party_vote_path
		end
	end

	def vote
		@party = Party.find params[:id]
		@tracks = @party.tracks
	end

	private
	def party_params
		params.require(:party).permit(:name, :user_id)
	end
end
