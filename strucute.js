
validator.var_type(vars);

controller.function(vars)
  .then(response){
    res.status(response.status).jsonp(response);
  }.catch(err){
    res.status(err.status).jsonp(err);
  }
});
