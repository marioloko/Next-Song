class Track < ActiveRecord::Base
	has_many :plays
	has_many :parties, :through => :plays

	has_attached_file :audio
	validates_attachment_content_type :audio, :content_type => ['audio/mp3', 'audio/mpeg', 'audio/ogg']

	validates :title, :artist, :audio, presence: true
	validates :title, uniqueness: true

	def audio_url
		audio.url
	end

	def self.search search_params
		where("title like ? OR artist like ?", "%#{search_params}%", 
			"%#{search_params}%")
	end

	def self.search_in_party party_id, search_params
		@party_tracks = Party.find(party_id).tracks	
		@tracks = @party_tracks.search search_params
	end

	def self.search_excluded party_id, search_params
		@excluded_tracks = all.search(search_params) - Party.find(party_id).tracks
	end
end
