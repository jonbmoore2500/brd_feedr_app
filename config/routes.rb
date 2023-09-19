Rails.application.routes.draw do
  
  get "/many_reviews/:num", to: "feeders#xmany"
  resources :reviews, only: [:create, :update, :destroy, :index, :show]
  resources :feeders, only: [:create, :index, :show]
  resources :users, only: [:create, :index, :show, :update]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end

# pro tip - write new routes - put at top to make sure it gets caught