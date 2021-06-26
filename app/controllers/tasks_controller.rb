class TasksController < ApplicationController
    def index
        tasks = Task.all
        render status: :ok, json: { tasks: tasks }
    end

    before_action :load_task, only: [:show]

    def show
      render status: :ok, json: { task: @task }
    end

    def create
      @task = Task.new(task_params)
      if @task.save
        render status: :ok, json: { notice:  t('successfully_created') }
      else
        errors = @task.errors.full_messages
        render status: :unprocessable_entity, json: { errors: errors  }
      end
    rescue ActiveRecord::RecordNotUnique => e
      render status: :unprocessable_entity, json: { errors: e.message }
    end  

    private

    def load_task
      @task = Task.find_by_slug!(params[:slug])
      rescue ActiveRecord::RecordNotFound => errors
        render json: {errors: errors}
    end

    def task_params
      params.require(:task).permit(:title)
    end
end
