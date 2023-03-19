class Feeder < ApplicationRecord
    has_many :reviews
    has_many :birds, through: :reviews

    validates :name, presence: true
    validates :neighborhood, presence: true
    validates :refill_freq, presence: true, numericality: { greater_than_or_equal_to: 1 }
end
