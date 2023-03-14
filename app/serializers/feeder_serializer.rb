class FeederSerializer < ActiveModel::Serializer
  attributes :id, :name, :refill_freq, :neighborhood
end
