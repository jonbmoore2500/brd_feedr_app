class Feeder < ApplicationRecord
    has_many :reviews
    has_many :birds, through: :reviews

    validates :name, presence: true, uniqueness: true
    validates :neighborhood, presence: true
    validates :refill_freq, presence: true, numericality: { greater_than_or_equal_to: 1 }

    def average_rating
        if self.reviews.length == 0 then
            return nil 
        end
        average = self.reviews.sum { |rev| rev[:rating] } / self.reviews.size
    end

    def num_reviews
        total_reviews = self.reviews
        total_reviews.length()
    end

end
