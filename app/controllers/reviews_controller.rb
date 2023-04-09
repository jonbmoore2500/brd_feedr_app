class ReviewsController < ApplicationController
    wrap_parameters format: []
    before_action :authorize

    def create
        review = @current_user.reviews.create(review_params)
        if review.valid?
            render json: review, status: :created
        else
            render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        review = @current_user.reviews.find_by(id: params[:id])
        if review   
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
        review = @current_user.reviews.find_by(id: params[:id])
        if review
            review.destroy
            head :no_content
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    private

    def review_params
        params.permit(:feeder_id, :rating, :text)
    end

    def update_params
        params.permit(:rating, :text, :id)
    end

end
