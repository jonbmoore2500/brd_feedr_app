class Bird < ApplicationRecord
    has_many :reviews
    has_many :feeders, through: :reviews

    has_secure_password

    @allowed_hoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]


    validates :username, presence: true, uniqueness: true
    validates :species, presence: true 
    # validates url?
    validates :neighborhood, presence: true, inclusion: {in: @allowed_hoods}
    validates :fun_fact, presence: true, length: {maximum: 100}
    validates :password, length: {minimum: 5, maximum: 15}, on: :create

    def num_reviews
        total_reviews = self.reviews
        total_reviews.length()
    end

end
