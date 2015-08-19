class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :party, index: true, foreign_key: true
      t.integer :vote

      t.timestamps null: false
    end
  end
end
