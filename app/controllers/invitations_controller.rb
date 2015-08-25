class InvitationsController < ApplicationController
	before_action :authenticate_user!

	def create
		@invitation = Invitation.new(party_id: params[:party_id], 
			user_id: params[:user_id], accepted: false)
		status = 200
		unless @invitation.save
			status = 400
		end
		render :json => @invitation, :status => status
	end

	def update
		@invitation = Invitation.find_by(party_id: params[:party_id], 
			user_id: params[:user_id])
		status = 200

		if params[:vote]
			@invitation.update_attribute(:vote, params[:vote])
		elsif params[:accepted]
			@invitation.update_attribute(:accepted, params[:accepted])
		end

		unless @invitation.save
			status = 400	
		end
		render :json => @invitation, :status => status
	end

end
