Rails.application.routes.draw do
	root :to => redirect('/users/profile')

	devise_for :users

	resources :tracks, only: [:index, :show, :new, :create]

	resources :parties, only: [:create,:edit]
	get '/parties/:id/vote' => 'parties#vote', as: 'party_vote'

	resources :plays, only: [:create]
	delete '/plays' => 'plays#destroy'

	resources :invitations, only: [:create]
	patch '/invitations' => 'invitations#update'

	get '/users/profile' => 'users#profile', as: 'profile'	

	namespace :api do
		namespace :v1 do
			namespace :parties do
				get '/:party_id/tracks' => 'tracks#index'
				get '/:party_id/tracks_excluded' => 'tracks#excluded'
				get '/:party_id/invitations' => 'invitations#index'
			end

			namespace :users do
				get '/:user_id/parties' => 'parties#index'
				get '/:user_id/parties_excluded' => 'parties#excluded'
			end

			resources :parties, only: [:index, :show]
			resources :tracks, only: [:index, :show]
		end
	end

	get '*path' => redirect('/users/profile')

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
