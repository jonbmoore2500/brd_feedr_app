class FeedersController < ApplicationController
    wrap_parameters format: []
    
    def index
        feeders = Feeder.all
        render json: feeders 
    end

    def create
        feeder = Feeder.create(feeder_params)
        if feeder.valid?
            render json: feeder, status: :created
        else
            render json: {errors: feeder.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private 

    def feeder_params
        params.permit(:name, :refill_freq, :neighborhood)
    end

end
