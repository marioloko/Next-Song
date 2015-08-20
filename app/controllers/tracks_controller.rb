class TracksController < ApplicationController
	before_action :authenticate_user!

	def create
		@track = Track.new track_params
		respond_to do |format|
			if @track.save
				@play = Play.create party_id: params[:party_id], track_id: @track.id
				format.js {}
				format.json { render json: @track, status: :created, location: @track }
			else
				format.json { render json: @track.errors, status: :unprocessable_entity}
			end
		end
	end

	private
	def track_params
		params.require(:track).permit(:title, :artist, :audio)
	end
end
