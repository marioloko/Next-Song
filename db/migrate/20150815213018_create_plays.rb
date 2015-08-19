class CreatePlays < ActiveRecord::Migration
  def change
    create_table :plays do |t|
      t.belongs_to :party, index: true, foreign_key: true
      t.belongs_to :track, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
