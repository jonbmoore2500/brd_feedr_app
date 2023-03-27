class SessionsController < ApplicationController

    def create
        user = Bird.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user, status: :created, include: ['reviews', 'reviews.feeder']
        else 
            render json: {error: "invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end