class FeedersController < ApplicationController
    wrap_parameters format: []
    before_action :authorize
    
    def index
        feeders = Feeder.all
        render json: feeders
    end

    def show 
        feeder = Feeder.find_by(id: params[:id])
        render json: feeder
    end 

    def create
        feeder = Feeder.create(feeder_params)
        if feeder.valid?
            render json: feeder, status: :created
        else
            render json: {errors: feeder.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def xmany
        feeders = Feeder.all.select {|f| f.reviews.length >= params[:num].to_i}
        render json: feeders
    end

    private 

    def feeder_params
        params.permit(:name, :refill_freq, :neighborhood)
    end

end
