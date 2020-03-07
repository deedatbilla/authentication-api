var whitelist = ['https://ghana-market-association.firebaseapp.com']
export var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: true } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }