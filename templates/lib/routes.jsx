var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var urls = [];

var routes = (
  <Route>
    <Route name="reset-password" path="/reset-password" handler={require('../pages/reset-password.jsx')}/>
    <Route name="login"          path="/login"          handler={require('../pages/login.jsx')}/>
    <DefaultRoute handler={require('../pages/login.jsx')}/>
  </Route>
);

// TODO: come up with a better solution for nested route if we will ever have that.
React.Children.forEach(routes.props.children, function(item) {
  urls.push(item.props.path || '/');
});

module.exports = {
  URLS: urls,
  routes: routes,
  run: function(location, el) {
    Router.run(routes, location, function(Handler, state) {
      React.renderToString(<Handler/>, el);
    });
  },
  generateStatic: function(url, processString) {
    Router.run(routes, url, function(Handler) {
      processString(React.renderToString(React.createElement(Handler, null)));
    });
  }
};
