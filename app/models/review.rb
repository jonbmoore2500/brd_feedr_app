class Review < ApplicationRecord
    belongs_to :user 
    belongs_to :feeder 

    validates :rating, presence: true, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
    validates :text, length: {maximum: 200}
    validates :feeder_id, uniqueness: {scope: :user_id, message: "Must be unique for the same bird"}
end
