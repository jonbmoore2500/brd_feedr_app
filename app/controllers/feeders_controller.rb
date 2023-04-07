class FeedersController < ApplicationController
    wrap_parameters format: []
    before_action :authorize
    
    def index
        feeders = Feeder.all
        render json: feeders, include: [:average_rating, :num_reviews]
    end

    def create
        feeder = Feeder.create(feeder_params)
        if feeder.valid?
            render json: feeder, status: :created, include: [:average_rating, :num_reviews]
        else
            render json: {errors: feeder.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private 

    def feeder_params
        params.permit(:name, :refill_freq, :neighborhood)
    end

end
