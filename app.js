// BELLY BUTTON BIODIVERSITY

// Instructions: 
    // 1. Use D3 library to read in samples.json
            // Referenced activites from 15.2 #
    // 2. Create horizontal bar chart with a dropdown menu to display top 10 OTUS
        // found in that individual.
        // Use sample_values for the values for the bar chart
            // "samples":[{"id": "940", "otu_ids": [1167], "sample_values": [163], "otu_labels": ["Bacteria]
        // Use otu_ids as the labels for the bar chart (otu refers to microbal speices)
        // Use otu_labels as the hovertext for the chart
    // 3. Create a bubble chart that displays each sample
        // Use otu_ids for the x values
        // Use sample_values for the y values
        // Use sample_values for the marker size
        // Use otu_ids for the marker colors
        // Use otu_labels for the text values
    // 4. Display the sample metadata (individual demographic)
    // 5. Display each key value pair from the metadata JSON object somewhere on page
    // 6. Update all of the plots any time that a new sample is selected

    ////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Read in samples from JSON
    d3.json('samples.json').then((data) => {
        console.log(data);

        var samples = data.samples;
        console.log(samples);

        //  Create horizontal bar chart with dropdown menu for top 10 otus found in individual
            // use sample_values for values,otu_ids for labels, and otu_labels for hovertext
        
            var sample_values = samples.filter(item => item.id === "940")[0].sample_values;
            console.log("Sample Values", sample_values);

            // Grab top 10 with slice, use reverse to put in numerical order, starting at 0 index, stopping at but not including 10.
            // Referenced activities 15.2 #5/6 for Sorting and Slicing
            var top_ten = sample_values.slice(0, 10).reverse();
            console.log("Top Ten", top_ten);

            // Copy/Pasta for ids and labels
            // Continue to print to console to check results
            var otu_labels = samples.filter(item => item.id === "940")[0].otu_labels;
            console.log("OTU ID", otu_labels);

            var top_ten_label = otu_labels.slice(0,10).reverse();
            console.log("OTU Labels", top_ten_label);

            // Build Chart
            // Referenced https://plotly.com/javascript/bar-charts/#bar-chart-with-hover-text
            // Referenced activities 15.2 #5/6

            var bar_data = [
                {
                  x: top_ten,
                  y: top_ten_label,
                  type: 'bar',
                  orientation: 'h'
                }
              ];
              
              // Plot chart to div tag with id "bar"
              Plotly.newPlot('bar', bar_data);

              // Build bubble chart
              // Referenced https://plotly.com/javascript/bubble-charts/ for boiler plate code
              var bubble = {
                x: otu_labels,
                y: sample_values,
                mode: 'markers',
                marker: {
                  color: otu_labels,
                  size: sample_values
                }
              };
              
              var data_bubble = [bubble];
              
              var bubble_layout = {
                xaxis: {title: "OTU ID"},
                yaxis: {title: "Samples"},
                showlegend: false,
                height: 600,
                width: 600
              };
              // Plot chart to div tag with id "bubble"
              Plotly.newPlot('bubble', data_bubble, bubble_layout);

              // Display sample metadata(individual demographic)
              // Reference same steps as when we started to create/filter variables for data bits
              d3.json('samples.json').then((data) => {
                  var names = data.names;
                  
                  // Use forEach function to loop through all the names from data and append to our selDataset from html
                  names.forEach((name) => {
                      d3.select("#selDataset").append("option").text(name);
                  });
              });

              d3.json('samples.json').then((data) => {
                  var metadata = data.metadata;
                  console.log("MetaData", metadata);

                  var filteredData = metadata.filter(item => item.id === 940)[0];
                  console.log("Filtered Meta", filteredData);

                  var panel = d3.select("#sample-metadata");
                  console.log(panel);

                  panel.html("");
                //   Object.defineProperties(filteredData).forEach(([key, value]) => {
                //       var cell = panel.append("div");
                //       cell.text('${key}:${value}');
                //   })
              });

              

             // Display each key value pair from metadata json object somewhere on page
             // Refer to index.html for correct class/id names
             // Asked for husband help trying to run this function to append kvp demographic in visual on page
             


              // Update plots anytime a new sample selected


    }); 

    // Here is where computer science husband helped figure out demographic
    // Created a function, read in data,
    function optionChanged(num) {
        d3.json('samples.json').then((data) => {
            var names = data.names;
            var index = names.indexOf(num);
            console.log(index);
            var metadata = data.metadata;
            var individual = metadata[index];
            var panel = d3.select("#sample-metadata");
            panel.html("");
            Object.entries(individual).forEach(([key, value]) => {
                panel.append("h5").text(key + ": " + value);
            });
        });
        
     }