class BirdSerializer < ActiveModel::Serializer
  attributes :id, :username, :species, :neighborhood, :img_url, :fun_fact, :password_digest
end
