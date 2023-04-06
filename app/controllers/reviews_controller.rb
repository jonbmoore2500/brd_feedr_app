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
        review.update(update_params)
        if review.valid?
            render json: review, status: :created
        else
            render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        review = @current_user.reviews.find_by(id: params[:id])
        feeder = review.feeder
        review.destroy
        render json: feeder, status: :ok
        # better way to do this? need an updated feeder upon delete to update state,
        # don't want to wait and do a second fetch
        # reconfig to handle recalculate in front end
    end

    private

    def review_params
        params.permit(:feeder_id, :rating, :text)
    end

    def update_params
        params.permit(:rating, :text, :id)
    end

end
