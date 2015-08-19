class API::V1::Parties::TracksController < ApplicationController
	def index
		@party = Party.find params[:party_id]
		render :json => @party.tracks.to_json(:only => [:id, :title, :artist], 
				:methods => [:audio_url])
	end

	def excluded
		@tracks = Track.all - Party.find(params[:party_id]).tracks
		render :json => @tracks.to_json(:only => [:id, :title, :artist], 
				:methods => [:audio_url])
	end
end
