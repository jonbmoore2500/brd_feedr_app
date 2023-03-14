class CreateBirds < ActiveRecord::Migration[6.1]
  def change
    create_table :birds do |t|
      t.string :username
      t.string :species
      t.string :neighborhood
      t.string :img_url
      t.string :fun_fact
      t.string :password_digest

      t.timestamps
    end
  end
end
