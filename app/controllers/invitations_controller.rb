class InvitationsController < WebsocketRails::BaseController
	before_action :authenticate_user!

	def create
		@invitation = Invitation.new(party_id: message[:party_id], 
			user_id: message[:user_id], accepted: false)
		status = 200
		unless @invitation.save
			status = 400
		end
		WebsocketRails[:new_invitations].trigger(:new_invitation, @invitation)
	end

	def accept
		@invitation = Invitation.find_by(party_id: message[:party_id], 
			user_id: message[:user_id])
		status = 200

		@invitation.update_attribute(:accepted, message[:accepted])

		unless @invitation.save
			status = 400	
		end
		WebsocketRails[:accepted_invitations].trigger(:accepted_invitation, 
			@invitation)
	end

	def vote
		@party = Party.find message[:party_id]
		@invitation = Invitation.find_by(party_id: @party.id, 
			user_id: message[:user_id])
		status = 200

		@invitation.update_attribute(:vote, message[:vote])

		unless @invitation.save
			status = 400	
		end
		@percentage_votes = @party.get_percentage_votes
		WebsocketRails[:votes].trigger(:new_vote, @percentage_votes)
	end
end
