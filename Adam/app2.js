const tableBody = d3.select("tbody");

// Select the button; moved to top
var button = d3.select("#filter-btn");

d3.json("trafficking.json", function(d) {
    var data = Object.values(d);

    var tableData = [];

    // data = Object.values(data)

    console.log(Object.values(data[0])[1])
    
    for (var i = 0; i < data.length; i++) {
        tableData.push(
            {"Base Country": Object.values(data[i])[1],
            "Base Country Lat": Object.values(data[i])[2],
            "Base Country Lng": Object.values(data[i])[3],
            "Relation Country": Object.values(data[i])[4],
            "Relation Country Lat": Object.values(data[i])[5],
            "Relation Country Lng": Object.values(data[i])[6],
            "Men": Object.values(data[i])[7],
            "Women": Object.values(data[i])[8],
            "Children": Object.values(data[i])[9],
            "Sex Trafficking": Object.values(data[i])[10],
            "Forced Labor": Object.values(data[i])[11],
            "Debt Bondage": Object.values(data[i])[12],
            "Description": Object.values(data[i])[13]
        })
    }


    function init() {

        console.log(tableData);

        AddData(tableData);

        clickButton("Base Country");

    }

    function AddData(data) {

        tableBody.html("");
    
    
         // Loop through data and console.log each object
        data.forEach((dataRow) => {
            
            const row = tableBody.append("tr");
    
            Object.values(dataRow).forEach((value) => {
                console.log(value);
                let cell = row.append("td");
                cell.text(value);
    
            });
        }); 
    
    } 
    
    
    
    function clickButton(term){
    
        button.on("click", function() {
    
            //Prevent web page from refreshing
            d3.event.preventDefault();
        
            //Accept user input, get value property of input element
            var inputElement = d3.select("#term");
            var inputValue = inputElement.property("value");
        
            // Filter displays "value"
            if (term == "Base Country") {
                var filteredData = tableData.filter(tableData => tableData["Base Country"] === inputValue);
            }
        
            else {
                var filteredData = tableData.filter(tableData => tableData["Relation Country"] === inputValue);
            }
        
            // Empty table data before query
            d3.select("tbody").html("");
        
             // Loop through filtered data
             // var row = tbody...
             // cell = tbody.append...
            filteredData.forEach((dataRow) => {
                var row = tableBody.append("tr");
                Object.entries(dataRow).forEach(([key, value]) => {
                    cell = tableBody.append("td");
                    cell.text("value");
                });
        
            });
        });  
        
    };
    
       
    
    // On change to the DOM, call getData()
    d3.selectAll("#selFilterQuery").on("change", getData);
    
    // Function called by DOM changes
    function getData() {
      
      var dropdownMenu = d3.select("#selFilterQuery");
      // Assign the value of the dropdown menu option to a variable
      var term = dropdownMenu.property("value");
    
      clickButton(term);
    
    };
    
    // Change the search description once the dropdown is clicked
    const areaSelect = document.querySelector(`[id="selFilterQuery"]`);
    
    areaSelect.addEventListener(`change`, (e) => {
      // log(`e.target`, e.target);
      const select = e.target;
    
      const value = select.value;
    
      const text = select.selectedOptions[0].text;
      
      d3.select("#SearchTerm").text("Enter a " + text);
    
      // Change the placeholder according to dropdown option
      if (text == 'Base Country') {
        document.getElementById("term").placeholder = "Afghanistan";
      }
    
      else {
        document.getElementById("term").placeholder = "United States";
      }
    
      
    });
    
    init();

});

