// JavaScript
define([], function () {
  "use strict";
  var dimensions = {
    uses: "dimensions",
    min: 1,
    max: 1,
  };
  var measures = {
    uses: "measures",
    min: 1,
    max: 2,
  };
  var appearanceSection = {
    uses: "settings",
  };
  return {
    type: "items",
    component: "accordion",
    items: {
      dimensions: dimensions,
      measures: measures,
      appearanceSection: appearanceSection,
    },
  };
});
