# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.precompile += %w( parties_controller.js )
Rails.application.config.assets.precompile += %w( tracks_controller.js )
Rails.application.config.assets.precompile += %w( searcher.js )
Rails.application.config.assets.precompile += %w( handlebars-v3.0.3.js )
Rails.application.config.assets.precompile += %w( button-generator.js )
Rails.application.config.assets.precompile += %w( vote_controller.js )
Rails.application.config.assets.precompile += %w( tracks_model.js )
Rails.application.config.assets.precompile += %w( parties_model.js )
Rails.application.config.assets.precompile += %w( vote_model.js )

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
