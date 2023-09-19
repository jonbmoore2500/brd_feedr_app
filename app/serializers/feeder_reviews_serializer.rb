class FeederReviewsSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :rating
    
    belongs_to :reviews
  end
  