class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
	has_one :party
	has_many :invitations
	has_many :parties, :through => :invitations

	validates :name, :username, presence: true
	validates :username, uniqueness: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

#	TO-DO
#	def self.online_now
#		where("last_online > ?", 7.minutes.ago)
#	end
end
