class Invitation < ActiveRecord::Base
  belongs_to :user
  belongs_to :party
	validates :user, :party, presence: true
	validates :accepted, inclusion: { :in => [true, false] }

	def self.reset_votes_with track_id
		Invitation.where(vote: track_id).update_all(:vote => nil)
	end
end
