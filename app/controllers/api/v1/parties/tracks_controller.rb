class API::V1::Parties::TracksController < ApplicationController
	def index
		@tracks = Party.find(params[:party_id]).tracks
		json_format @tracks
	end

	def excluded
		@tracks = Track.all - Party.find(params[:party_id]).tracks
		json_format @tracks	
	end

	def search
		@tracks = Track.search_in_party params[:party_id], params[:search]
		json_format @tracks	
	end

	def search_excluded
		@tracks = Track.search_excluded params[:party_id], params[:search]
		json_format @tracks	
	end

	private
	def json_format tracks
		render :json => tracks.to_json(:only => [:id, :title, :artist],
			:methods => [:audio_url])
	end
end
