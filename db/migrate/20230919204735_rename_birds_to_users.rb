class RenameBirdsToUsers < ActiveRecord::Migration[6.1]
  def change
    rename_table :birds, :users 
  end
end
