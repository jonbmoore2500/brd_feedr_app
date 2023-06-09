class FeederSerializer < ActiveModel::Serializer
  attributes :id, :name, :refill_freq, :neighborhood, :average_rating, :num_reviews
  
  has_many :reviews, serializer: FeederReviewsSerializer
end
