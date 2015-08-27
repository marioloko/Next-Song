class Party < ActiveRecord::Base
	belongs_to :user
	has_many :plays
	has_many :tracks, :through => :plays
	has_many :invitations
	has_many :users, :through => :invitations

	validates :name, :user_id, presence: true
	validates :name, uniqueness: true

	def self.current_user current_user
		@@current_user = current_user	
	end

	def owner
		user.name	
	end

	def get_votes
		invitations.pluck(:vote).compact
	end

	def get_counted_votes votes=get_votes, unit=1
		counted_votes = Hash.new(0)
		votes.each do |vote|
			counted_votes[vote] += unit
		end
		counted_votes
	end

	def get_percentage_votes
		votes = get_votes
		percentage_unit = ( 1.0 / votes.length ) * 100
		get_counted_votes votes, percentage_unit
	end

	def self.search search_params
		where("name like ?", "%#{search_params}%")	
	end

	def accepted user=nil
		user ||= @@current_user
		Invitation.where(party_id: id, user_id: user.id, accepted: true).present?
	end

	def get_accepted_users accepted=true
		users.references(:invitations).where(invitations: { accepted: accepted })
	end
end
