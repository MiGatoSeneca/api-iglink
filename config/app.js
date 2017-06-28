var appconfig = {
    port: process.env.PORT || 8080,
    version: "2.12.23.1",
    debug: "on",
    enviroment: process.env.NODE_ENV,
    appPath: "http://localhost:3000/",
    stripeKey: "sk_test_t3PXrkD8MpXL8LC184FWUBwa",
    pug : {
      pretty : true
    },
    test : ""
};

if(appconfig.enviroment == "local"){
  appconfig.appPath = "http://localhost:3000/";
  appconfig.debug = "on";
}else if(appconfig.enviroment == "develop"){
  appconfig.appPath = "http://dev.conver.fit/";
  appconfig.debug = "off";
}else if(appconfig.enviroment == "beta"){
  appconfig.appPath = "http://beta.conver.fit/";
  appconfig.debug = "off";
}else if(appconfig.enviroment == "hotfix"){
  appconfig.appPath = "http://13.94.141.31:3000/";
  appconfig.debug = "off";
}else if(appconfig.enviroment == "production"){
  appconfig.appPath = "https://conver.fit/";
  appconfig.stripeKey = "sk_live_c4lUphuzmv6hghDtscsSxFir";
  appconfig.debug = "off";
}
module.exports = appconfig;
