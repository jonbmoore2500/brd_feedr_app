class Bird < ApplicationRecord
    has_many :reviews
    has_many :feeders, through: :reviews

    has_secure_password

    
end
