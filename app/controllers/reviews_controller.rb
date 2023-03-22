class ReviewsController < ApplicationController
    wrap_parameters format: []

    def create
        review = Review.create(review_params)
        if review.valid?
            render json: review, status: :created
        else
            render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        review = Review.find_by(id: params[:id])
        if review.bird_id == session[:user_id]
            review.update(update_params)
            if review.valid?
                render json: review, status: :created
            else
                render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: { error: "Not authorized" }, status: :unauthorized 
        end
    end

    def destroy
        review = Review.find_by(id: params[:id])
        if review.bird_id == session[:user_id]
            review.destroy
            render json: {status: "deleted"}
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    private

    def review_params
        params.permit(:bird_id, :feeder_id, :rating, :text)
    end

    def update_params
        params.permit(:rating, :text, :id)
    end

end
