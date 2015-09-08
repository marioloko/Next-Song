class API::V1::Parties::InvitationsController < ApplicationController
	def index
		@party = Party.find params[:party_id]	
		@votes = @party.get_votes

		render :json => @votes.to_json
	end
end
