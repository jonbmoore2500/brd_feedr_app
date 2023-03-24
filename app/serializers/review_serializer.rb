class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :bird_id, :feeder_id, :rating, :text
 
  belongs_to :feeder, serializer: FeederSerializer
end
