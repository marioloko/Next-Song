class UsersController < ApplicationController
	before_action :authenticate_user!
	def profile
		@current_user = current_user
		@party = Party.new
	end
end
