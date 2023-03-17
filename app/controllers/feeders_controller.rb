class FeedersController < ApplicationController

    def index
        feeders = Feeder.all
        render json: feeders 
    end

end
