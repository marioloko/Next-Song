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
end
