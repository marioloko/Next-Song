class PlaysController < ApplicationController
	before_action :authenticate_user!

	def destroy
		@play = Play.where party_id: params[:party_id], track_id: params[:track_id]
		status = 400
		if Play.destroy(@play)
			status = 200
		end	
		render :json => @play, :status => status
	end

	def create
		@play = Play.new party_id: params[:party_id], track_id: params[:track_id]
		status = 400
		if @play.save
			status = 200
		end
		render :json => @play, :status => status
	end
end
