var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var urls = [];

var routes = (
  <Route>
    <Route name="reset-password" path="/reset-password/?" handler={require('../pages/reset-password.jsx')}/>
    <Route name="login"          path="/login/?"          handler={require('../pages/login.jsx')}/>
    <DefaultRoute handler={require('../pages/login.jsx')}/>
    <NotFoundRoute handler={require('../pages/404.jsx')}/>
  </Route>
);

// TODO: come up with a better solution for nested route if we will ever have that.
React.Children.forEach(routes.props.children, function(item) {
  urls.push(item.props.path || '/');
});

module.exports = {
  URLS: urls,
  routes: routes,
  run: function(location, el) {console.log(location,'here')
    Router.run(routes, location, function(Handler, state) {console.log(Handler, 'here')
      React.render(<Handler/>, el);
    });
  }
};
