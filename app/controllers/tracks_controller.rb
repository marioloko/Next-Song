class TracksController < ApplicationController
	before_action :authenticate_user!

	def index
		@tracks = Track.all	
	end

	def show
		@track = Track.find params[:id]
	end
	
	def new
		@track = Track.new
	end

	def create
		@track = Track.new track_params
		if @track.save
			@play = Play.create party_id: params[:party_id], track_id: @track.id
			redirect_to track_path(@track.id)
		else
			render 'new'
		end
	end

	private
	def track_params
		params.require(:track).permit(:title, :artist, :audio)
	end
end
