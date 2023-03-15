class Bird < ApplicationRecord
    has_many :reviews
    has_many :feeders, through: :reviews

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :species, presence: true 
    # validates url?
    validates :neighborhood, presence: true
    validates :fun_fact, presence: true, length: {maximum: 100}
    validates :password, presence: true
    validates :password_confirmation, presence: true
end
