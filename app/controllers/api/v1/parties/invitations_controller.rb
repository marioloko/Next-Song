class API::V1::Parties::InvitationsController < ApplicationController
	def index
		@votes = Invitation.get_votes params[:party_id]

		unless @votes.present?
			@votes = [1] # If there is no votes the first song is reproduced
		end

		render :json => @votes.to_json
	end
end
