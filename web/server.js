var Boom = require("boom");
var Hapi = require('hapi');
var Hoek = require('hoek');
var Path = require('path');

var fs = require("fs");
var skeletonHTML = fs.readFileSync("./public/index.html").toString("utf-8");

// make sure we understand "jsx" files:
require('node-jsx').install();
var routes = require(Path.join(__dirname, '../templates/lib/routes.jsx'));

module.exports = function(options) {
  var server = new Hapi.Server({
    debug: options.debug
  });
  server.connection({
    host: options.host,
    port: options.port
  });

  var account = require("../lib/account")({
    loginAPI: options.loginAPI
  });


  var ReactHandler = function(route) {
    return function(request, reply) {
      routes.generateStatic("/" + route, function(html) {
        console.log("received callback with data:", html);
        reply(skeletonHTML.replace('  <script src="/app.bundle.js"></script>', html));
      });
    };
  };

  server.route([
    {
        method: 'GET',
        path: '/login',
        handler: ReactHandler("login")
    }, {
        method: 'GET',
        path: '/reset-password',
        handler: ReactHandler("reset-password")
    }, {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
              path: Path.join(__dirname, '../public')
            }
        }
    }, {
      method: 'GET',
      path: '/login/oauth/authorize',
      handler: function(request, reply) {
        reply('ok');
      }
    }, {
      method: 'POST',
      path: '/login/oauth/authorize',
      handler: function(request, reply) {
        account.verifyPassword(request, function(err, user) {
          if ( err ) {
            return reply(Boom.badImplementation(err));
          }
          if ( !user ) {
            return reply(Boom.unauthorized("Invalid username/email or password"));
          }
          reply(user);
        });
      }
    }, {
      method: 'POST',
      path: '/login/oauth/access_token',
      handler: function(request, reply) {
        reply('ok');
      }
    }
  ]);

  return server;
};
