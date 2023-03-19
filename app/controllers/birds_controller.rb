class BirdsController < ApplicationController
    wrap_parameters format: []
    before_action :authorize, only: [:update]

    def create
        bird = Bird.create(bird_params)
        if bird.valid?
            session[:user_id] = bird.id
            render json: bird, status: :created, include: [:num_reviews]
        else
            render json: {errors: bird.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def index 
        birds = Bird.all 
        render json: birds
    end

    def show
        bird = Bird.find_by(id: session[:user_id])
        if bird
            render json: bird, include: ['reviews', 'reviews.feeder']
        else
            render json: {error: "no user logged in"}, status: :unauthorized
        end
    end

    def update
        bird = Bird.find_by(id: params[:id])
        # byebug
        bird.update(update_params)
        if bird.valid?
            render json: bird, status: :created
            # , include: ['reviews', 'reviews.feeder']
        else
            render json: {errors: bird.errors.full_messages}, status: :unprocessable_entity
        end
    # rescue ActiveRecord::RecordInvalid => invalid
    #     # byebug
    #     render json: { errors: invalid.record.errors }, status: :unprocessable_entity
    end

    private

    def bird_params
        params.permit(:username, :species, :img_url, :neighborhood, :fun_fact, :password, :password_confirmation)
    end

    def update_params
        params.permit(:id, :neighborhood, :fun_fact)
    end
    
    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
