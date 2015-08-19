class Invitation < ActiveRecord::Base
  belongs_to :user
  belongs_to :party

	def self.get_votes party_id
		where(party_id: party_id).pluck(:vote).compact
	end
end
