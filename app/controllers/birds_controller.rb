class BirdsController < ApplicationController
    wrap_parameters format: []

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
        if bird.id == session[:user_id]
            if params.include? :old_password 
                if bird.authenticate(params[:old_password])
                    bird.update(password_params)
                    if bird.valid?
                        render json: bird, status: :created
                    else
                        render json: {errors: bird.errors.full_messages}, status: :unprocessable_entity
                    end
                else
                    render json: { errors: ["Incorrect old password"] }, status: :unauthorized
                end
            else
                # byebug
                bird.update(update_params)
                if bird.valid?
                    render json: bird, status: :created
                else
                    render json: {errors: bird.errors.full_messages}, status: :unprocessable_entity
                end
            end
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized 
        end
    end

    private

    def bird_params
        params.permit(:username, :species, :img_url, :neighborhood, :fun_fact, :password, :password_confirmation)
    end

    def update_params
        params.permit(:id, :neighborhood, :fun_fact)
    end

    def password_params
        params.permit(:id, :password, :password_confirmation)
    end
end
