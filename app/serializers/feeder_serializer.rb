class FeederSerializer < ActiveModel::Serializer
  attributes :id, :name, :refill_freq, :neighborhood, :average_rating, :num_reviews
  

  
end
