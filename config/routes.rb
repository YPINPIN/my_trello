Rails.application.routes.draw do
  devise_for :users

  resources :cards
  resources :lists do 
    member do
      # /lists/2/move
      put :move 
    end
  end

  root 'lists#index'
end
