# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding messages..."

neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]

Bird.create(
    username: "Charlie123", species: "Chickadee", neighborhood: "Uptown", img_url: "https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg", 
    fun_fact: "Loves Mexican food", password: "Testing", password_confirmation: "Testing"
)
Bird.create(
    username: "Hypebeast", species: "Piping Plover", neighborhood: "Edgewater", img_url: "", 
    fun_fact: "Swagged out", password: "Testing", password_confirmation: "Testing"
)
Bird.create(
    username: "Billiam", species: "Eagle", neighborhood: "The Loop", img_url: "https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg", 
    fun_fact: "Hates birdseed", password: "Testing", password_confirmation: "Testing"
)
Bird.create(
    username: "RogerRoger", species: "Raven", neighborhood: "Ravenswood", img_url: "https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg", 
    fun_fact: "Chose his neighborhood for a reason", password: "Testing", password_confirmation: "Testing"
)
birds = Bird.all 

Feeder.create(name: "Morton's", refill_freq: 5, neighborhood: neighborhoods[0])
Feeder.create(name: "Sweetgreen", refill_freq: 3, neighborhood: neighborhoods[1])
Feeder.create(name: "Corridor", refill_freq: 8, neighborhood: neighborhoods[0])
Feeder.create(name: "Au Cheval", refill_freq: 5, neighborhood: neighborhoods[2])
Feeder.create(name: "Small Cheval", refill_freq: 3, neighborhood: neighborhoods[3])
Feeder.create(name: "Tweet", refill_freq: 4, neighborhood: neighborhoods[3])
Feeder.create(name: "Gaijin", refill_freq: 9, neighborhood: neighborhoods[4])
Feeder.create(name: "Aba", refill_freq: 2, neighborhood: neighborhoods[5])
Feeder.create(name: "Ema", refill_freq: 4, neighborhood: neighborhoods[7])
Feeder.create(name: "Potbelly", refill_freq: 5, neighborhood: neighborhoods[0])
feeders = Feeder.all 

Review.create(bird_id: birds[0].id, feeder_id: feeders[0].id, rating: 3, text: "Pretty good")
Review.create(bird_id: birds[2].id, feeder_id: feeders[1].id, rating: 5, text: "Top tier")
Review.create(bird_id: birds[3].id, feeder_id: feeders[2].id, rating: 1, text: "The worst")
Review.create(bird_id: birds[0].id, feeder_id: feeders[1].id, rating: 2, text: "Pass on this")
Review.create(bird_id: birds[1].id, feeder_id: feeders[1].id, rating: 4, text: "Quite nice, would go again")
Review.create(bird_id: birds[1].id, feeder_id: feeders[5].id, rating: 5, text: "My favorite by far")
Review.create(bird_id: birds[0].id, feeder_id: feeders[6].id, rating: 2, text: "Always empty")






puts "✅ Done seeding!"
