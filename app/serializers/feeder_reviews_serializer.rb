class FeederReviewsSerializer < ActiveModel::Serializer
    attributes :id, :bird_id, :rating
    
    belongs_to :reviews
  end
  