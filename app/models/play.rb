class Play < ActiveRecord::Base
  belongs_to :party
  belongs_to :track
end
