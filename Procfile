web: bundle exec puma -C config/puma.rb
js: yarn build --watch

release: rails db:migrate
sidekiq_process: bundle exec sidekiq -c 2