class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :bird_id
      t.integer :feeder_id
      t.integer :rating
      t.string :text

      t.timestamps
    end
  end
end
