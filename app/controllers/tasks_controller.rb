class TasksController < ApplicationController
    def index
        render
        @tasks = Task.all
      end
end
