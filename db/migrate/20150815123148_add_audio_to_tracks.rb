class AddAudioToTracks < ActiveRecord::Migration
  def change
		def self.up
			add_attachment :tracks, :audio
		end

		def self.down
			remove_attachment :tracks, :audio
		end
  end
end
