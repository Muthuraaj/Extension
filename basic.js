define([
  "qlik",
  "./properties",
  "text!./basic.html",
  "https://cdn.jsdelivr.net/npm/d3@7",
  "css!./basic.css",
], function (qlik, props, template, d3) {
  return {
    template: template,
    support: {
      snapshot: true,
      export: true,
      exportData: true,
    },
    // Giving the Data of Qlik Objects
    initialProperties: {
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
        qInitialDataFetch: [
          {
            qWidth: 15,
            qHeight: 100,
          },
        ],
      },
    },
    definition: props,
    paint: function ($body, layout) {
      // console.log(layout.qHyperCube.qDataPages[0].qMatrix);
      //add your rendering code here
      console.log(layout);
      const matrix = layout.qHyperCube.qDataPages[0].qMatrix;

      console.log(matrix);
      const obj = document.getElementById("body");
      // Specifying the width and height for svg container
      var svg = d3.select("#body"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;
      //appending text and adding Name of the SVG
      svg
        .append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Country Wise No of Employee");
      // Assigning the range=>position of x and y i.e data and data
      var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
      // Creating group element and adding attribute
      var g = svg.append("g").attr("transform", "translate(100,100)");

      // Providing the value for X and y scale

      xScale.domain(matrix.map((d) => d[0].qText));

      yScale.domain([12, 1400]);
      // Appending X Scale
      g.append("g")
        // Positioning our bar to down
        .attr("transform", "translate(0,300)")
        // Calling Axis bottom function with x scale to get x axis with data
        .call(d3.axisBottom(xScale))
        // Appending the Title for x axis
        .append("text")
        .attr("x", width - 100)
        .attr("y", height - 250)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Country");
      // Appending Y axis
      g.append("g")
        // Calling Axis left with yscale to get Y axis with data
        .call(
          d3
            .axisLeft(yScale)
            .tickFormat(function (d) {
              return d;
            })
            .ticks(8)
        )
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("# of Employee");
      g.selectAll(".bar")
        .data(matrix)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return xScale(d[0].qText);
        })
        .attr("y", function (d) {
          return yScale(d[1].qText);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
          return height - yScale(d[1].qText);
        });

      //obj.innerText = layout.qHyperCube.qGrandTotalRow[0].qText;
      //needed for export
      $body.html(obj);
      $body.find("rect").on("click", function () {
        if (this.hasAttribute("data-value")) {
          var value = parseInt(this.getAttribute("data-value"), 10),
            dim = 0;
          self.backendApi.selectValues(
            dim,
            matrix.map((d) => d.qElemNumber),
            true
          );
        }
      });
      return qlik.Promise.resolve();
    },
  };
});
