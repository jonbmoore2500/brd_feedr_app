# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding brd_feedr tables..."

neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
species = ['American Goldfinch', 'Chickadee', 'Blue Jay', 'Piping Plover', 'Great Blue Heron', 'Northern Cardinal', 'Osprey', 'Peregrine Falcon', 'Raven', 'Woodpecker']


Bird.create(
    username: "Charlie123", species: species[1], neighborhood: "Uptown", img_url: "https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg", 
    fun_fact: "Loves Mexican food", password: "Testing", password_confirmation: "Testing"
)
Bird.create(
    username: "Hypebeast", species: species[3], neighborhood: "Edgewater", img_url: "https://www.allaboutbirds.org/guide/assets/photo/301219051-720px.jpg", 
    fun_fact: "Swagged out", password: "Testing", password_confirmation: "Testing"
)
Bird.create(
    username: "Billiam", species: species[5], neighborhood: "The Loop", img_url: "http://extension.msstate.edu/sites/default/files/styles/slide_show/public/blog/Screen%20Shot%202023-01-03%20at%209.05.28%20AM.png?itok=fTOchP9b", 
    fun_fact: "Hates birdseed", password: "Testing", password_confirmation: "Testing"
)
Bird.create(
    username: "RogerRoger", species: species[8], neighborhood: "Ravenswood", img_url: "https://www.marylandzoo.org/wp-content/uploads/2017/10/Commonravenheader.jpg", 
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
Review.create(bird_id: birds[1].id, feeder_id: feeders[6].id, rating: 4, text: "Great date spot")
Review.create(bird_id: birds[2].id, feeder_id: feeders[6].id, rating: 4, text: "Quite nice, enjoyed myself")
Review.create(bird_id: birds[3].id, feeder_id: feeders[6].id, rating: 5, text: "Phenomenal, the absolute best")
Review.create(bird_id: birds[0].id, feeder_id: feeders[3].id, rating: 5, text: "Always empty")
Review.create(bird_id: birds[1].id, feeder_id: feeders[3].id, rating: 5, text: "Always empty")
Review.create(bird_id: birds[2].id, feeder_id: feeders[3].id, rating: 1, text: "Miserably bad")
Review.create(bird_id: birds[3].id, feeder_id: feeders[3].id, rating: 1, text: "Never going back")
Review.create(bird_id: birds[0].id, feeder_id: feeders[8].id, rating: 1, text: "Abhorent")
Review.create(bird_id: birds[1].id, feeder_id: feeders[8].id, rating: 3, text: "Reasonable, could have a better selection")
Review.create(bird_id: birds[2].id, feeder_id: feeders[8].id, rating: 3, text: "Had to wait so long!")
Review.create(bird_id: birds[3].id, feeder_id: feeders[8].id, rating: 2, text: "Bleh, my friend shouldn't have recommended it")
Review.create(bird_id: birds[0].id, feeder_id: feeders[9].id, rating: 2, text: "Mid. Absolutely mid")
Review.create(bird_id: birds[1].id, feeder_id: feeders[9].id, rating: 4, text: "Dope! Almost perfect")
Review.create(bird_id: birds[2].id, feeder_id: feeders[9].id, rating: 2, text: "Blah blah blah")
Review.create(bird_id: birds[3].id, feeder_id: feeders[9].id, rating: 2, text: "Awful desserts")
Review.create(bird_id: birds[0].id, feeder_id: feeders[4].id, rating: 2, text: "Awful appetizers")
Review.create(bird_id: birds[0].id, feeder_id: feeders[2].id, rating: 2, text: "You call that a salad??")






puts "✅ Done seeding!"
