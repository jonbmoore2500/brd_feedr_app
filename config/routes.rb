Rails.application.routes.draw do
  
  resources :reviews, only: [:create, :update, :destroy, :index, :show]
  resources :feeders, only: [:create, :index, :show]
  resources :birds, only: [:create, :index, :show]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  post "/signup", to: "birds#create"
  get "/me", to: "birds#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
