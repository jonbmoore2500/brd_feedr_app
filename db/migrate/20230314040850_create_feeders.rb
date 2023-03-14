class CreateFeeders < ActiveRecord::Migration[6.1]
  def change
    create_table :feeders do |t|
      t.string :name
      t.integer :refill_freq
      t.string :neighborhood

      t.timestamps
    end
  end
end
