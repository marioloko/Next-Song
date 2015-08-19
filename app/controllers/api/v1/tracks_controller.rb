class API::V1::TracksController < ApplicationController
	def index
		@tracks = Track.all
		render :json => @tracks.to_json(:only => [:id, :title, :artist], 
			:methods => [:audio_url])
	end

	def show
		@track = Track.find params[:id]
		render :json => @track.to_json(:only => [:id, :title, :artist],
			:methods => [:audio_url])
	end

	def search
		@tracks = Track.where "title like ?", "%#{params[:search]}%"
	end
end
