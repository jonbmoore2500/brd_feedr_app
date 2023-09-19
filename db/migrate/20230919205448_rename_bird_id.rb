class RenameBirdId < ActiveRecord::Migration[6.1]
  def change
    change_table :reviews do |t|
      t.rename :bird_id, :user_id
    end
  end
end
