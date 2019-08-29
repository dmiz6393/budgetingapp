class Api::V1::UsersController < ApplicationController
    skip_before_action :set_current_user, only: [:create]

    def index 
        render json: User.all, each_serializer: UserSerializer, include: '*.*.*'
    end

    def profile
        render json: { user: UserSerializer.new(current_user) }, status: :accepted
    end

    def show
        user=User.find params[:id]
        render json: user 
    end 

    def edit 
        @user=User.find params[:id]
        render json: user 
    end 

    def update 
        @user= User.find params[:id]
        if @user.update(budget: params[:budget].to_i)
            render json: @user
        end
    end 

    
    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token({ user_id: @user.id })
            # needed to correctly namespace serializer ...
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
            render json: { error: 'failed to create user' }, status: :not_acceptable
        end
    end
    
    private    
    def user_params
        params.require(:user).permit(:email, :password, :first_name,:last_name, :income, :budget)
    end
end

