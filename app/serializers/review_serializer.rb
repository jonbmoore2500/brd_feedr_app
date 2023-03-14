class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :bird_id, :feeder_id, :rating, :text
end
