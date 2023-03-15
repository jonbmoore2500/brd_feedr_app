class BirdsController < ApplicationController

    def create
        bird = Bird.create(bird_params)
        if bird.valid?
            session[:user_id] = bird.id
            render json: bird, status: :created
        else
            render json: {errors: bird.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        bird = Bird.find_by(id: session[:user_id])
        if bird
            render json: bird
        else
            render json: {error: "no user logged in"}, status: :unauthorized
        end
    end

    private

    def bird_params
        params.permit(:username, :species, :img_url, :neighborhood, :fun_fact, :password, :password_confirmation)
    end
end
