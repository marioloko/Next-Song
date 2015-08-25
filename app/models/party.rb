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
