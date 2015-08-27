class API::V1::Parties::InvitationsController < ApplicationController
	def index
		@party = Party.find params[:party_id]	
		@votes = @party.get_votes

		unless @votes.present?
			@votes = [1] # If there is no votes the first song is reproduced
		end

		render :json => @votes.to_json
	end
end
