class Party < ActiveRecord::Base
	belongs_to :user
	has_many :plays
	has_many :tracks, :through => :plays
	has_many :invitations
	has_many :users, :through => :invitations

	validates :name, :user_id, presence: true
	validates :name, uniqueness: true

	def owner
		user.name	
	end

	def self.search search_params
		where("name like ?", "%#{search_params}%")	
	end
end
