class PartiesController < ApplicationController
	before_action :authenticate_user!

	def create
		@party = Party.new party_params
		if @party.save
			Invitation.create(user_id: @party.user_id, party_id: @party.id,
				accepted: true)
			redirect_to edit_party_path(@party.id)
		else
			render 'users/profile'
		end
	end

	def edit
		@party = Party.find params[:id]
		@track = Track.new
		unless current_user.owner? @party
			redirect_to party_vote_path
		end
	end

	def vote
		@party = Party.find params[:id]
		@tracks = @party.tracks
		unless current_user.invited? @party
			redirect_to profile_path
		end
	end

	private
	def party_params
		params.require(:party).permit(:name, :user_id)
	end
end
