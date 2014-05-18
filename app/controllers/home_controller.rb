class HomeController < ApplicationController
  def index
  end

  def login
  	render :layout => false
  end
end
