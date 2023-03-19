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
        review.update(update_params)
        if review.valid?
            render json: review, status: :created
        else
            render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        review = Review.find_by(id: params[:id])
        render json: review
        review.destroy
    end

    private

    def review_params
        params.permit(:bird_id, :feeder_id, :rating, :text)
    end

    def update_params
        params.permit(:rating, :text, :id)
    end

end
