class PlaysController < WebsocketRails::BaseController
	before_action :authenticate_user!

	def create
		@play = Play.new party_id: message[:party_id], track_id: message[:track_id]
		status = 400
		if @play.save
			status = 200
		end
		WebsocketRails[:new_plays].trigger(:new_play, @play)
	end

	def destroy
		@party = Party.find message[:party_id]
		@play = Play.find_by party_id: message[:party_id], 
			track_id: message[:track_id]
		status = 400
		@track_id = @play.track_id
		if @play.destroy
			status = 200
		end	
		@party.reset_votes_with @track_id
		WebsocketRails[:destroyed_plays].trigger(:destroyed_play, @track_id)
	end
end
