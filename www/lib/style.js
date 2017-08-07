var style;

// this is a wrapped function
(function () {

  // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
  var defaultColor = "white",
    highlightColor = "#FEFFD5";

  style = {
    navitem: {
      base: {
        fill: 'yellow',
        stroke: 'red',
        fontWeight: "bold",
        strokeThickness: 15
      },
      default: {
        fill: 'yellow',
        stroke: 'red',
        fontWeight: "bold",
        strokeThickness: 15
      },
      inverse: {
        fill: 'yellow',
        stroke: 'red',
        fontWeight: "bold",
        strokeThickness: 15
      },
      hover: {
        fill: 'red',
        stroke: 'yellow',
        fontWeight: "bold",
        strokeThickness: 15
      },
      textMenu: {
        fill: 'yellow',
        stroke: 'red',
        fontWeight: "bold",
        strokeThickness: 15
      },
      textJuego: {
        fill: 'yellow',
        stroke: 'red',
        fontWeight: "italic",
        strokeThickness: 10
      },
      video: {
        fontSize: 20,
        fill: 'yellow',
        stroke: 'red',
        fontWeight: "bold",
        strokeThickness: 15
      }
    }
  };
})();

// the trailing () triggers the function call immediately
