class Invitation < ActiveRecord::Base
  belongs_to :user
  belongs_to :party
	validates :user, :party, presence: true
	validates :accepted, inclusion: { :in => [true, false] }
end
