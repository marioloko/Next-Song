class Invitation < ActiveRecord::Base
  belongs_to :user
  belongs_to :party
	validates :user, :party, presence: true
	validates :accepted, inclusion: { :in => [true, false] }

	def self.get_votes party_id
		where(party_id: party_id).pluck(:vote).compact
	end

	def self.get_accepted_parties_id user_id, accepted=true
		where(user_id: user_id, accepted: accepted).pluck(:party_id)
	end
end
