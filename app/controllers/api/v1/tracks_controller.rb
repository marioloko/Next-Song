class API::V1::TracksController < ApplicationController
	def index
		@tracks = Track.all
		json_format @tracks
	end

	def show
		@track = Track.find params[:id]
		json_format @track
	end

	def search
		@track = Track.search params[:search]
		json_format @tracks
	end

	private
	def json_format tracks
		render :json => tracks.to_json(:only => [:id, :title, :artist],
			:methods => [:audio_url])
	end
end
