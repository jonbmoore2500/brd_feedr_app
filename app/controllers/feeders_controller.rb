class FeedersController < ApplicationController
    wrap_parameters format: []
    
    def index
        feeders = Feeder.all
        render json: feeders, include: [:average_rating, :num_reviews]
    end

    def show
        feeder = Feeder.find_by(id: params[:id])
        if feeder
            render json: feeder, include: ['average_rating', 'num_reviews']
        else
            render json: {error: "incorrect feeder id"}
        end
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
