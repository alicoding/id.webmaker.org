var React = require('react');

var IndexState = React.createClass({

  render: function() {
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Webmaker Login V4</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/assets/styles.css" />
        </head>
        <body>
          {this.props.content}
          <script src="/assets/app.bundle.js"></script>
        </body>
      </html>
    );
  }

});

module.exports = IndexState;
