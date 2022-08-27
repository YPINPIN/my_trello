Rails.application.routes.draw do
  devise_for :users

  resources :cards, only: [:create, :update, :destroy] do
    member do
      # /cards/2/move
      put :move 
    end
  end

  resources :lists, only: [:index, :create, :update, :destroy] do 
    member do
      # /lists/2/move
      put :move 
    end
  end

  root 'lists#index'
end
