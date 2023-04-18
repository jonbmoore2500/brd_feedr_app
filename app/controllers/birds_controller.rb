class BirdsController < ApplicationController
    wrap_parameters format: []
    before_action :authorize, only: [:update, :show]
    # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

    def create
        bird = Bird.create(bird_params)
        if bird.valid?
            session[:user_id] = bird.id
            render json: bird, status: :created
        else
            render json: {errors: bird.errors.full_messages}, status: :unprocessable_entity
        end
    end
   
    ## for dev purposes
    # def index 
    #     birds = Bird.all 
    #     render json: birds
    # end

    def show
        render json: @current_user, include: ['reviews', 'reviews.feeder']
    end

    def update
        bird = Bird.find_by(id: params[:id])
        if bird.id == @current_user.id
            if params.include? :old_password 
                response_array = bird.update_pw(password_params, params[:old_password])
                render json: response_array[0], status: response_array[1]
            else
                if bird.update(update_params)
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

    # def render_unprocessable(invalid)
    #     # byebug
    #     render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    # def

end
