class Feeder < ApplicationRecord
    has_many :reviews
    has_many :birds, through: :reviews
end
