module Helpers
  def headline(&block)
    if defined?(::Rails)
      # In Rails we have to use capture!
      "<h1>#{capture(&block)}</h1>"
    else
      # If we are using Slim without a framework (Plain Tilt),
      # this works directly.
      "<h1>#{yield}</h1>"
    end
  end
end
