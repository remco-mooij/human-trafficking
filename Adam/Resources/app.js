// From trafficking_report.js
const tableData = data;

const tableBody = d3.select("tbody");

/* d3.csv("../Adam/Resources/trafficking_report.csv", function(d) {
    return {
        "Base Country": d["Base Country"],
        "Base Country Latitude": d["Base Country Lat"]
    };
}); */

/* var datavals = Object.values(tableData);
console.log(datavals[0]); */

/* d3.csv("../Adam/Resources/trafficking_report.csv").then(function(data){
    console.log(data);
}); */


/* Object.forEach((key) => {

    /* const arr = Object.keys(data).map((key) => [key, data[key]]);
console.log(arr[0]); 

}) */



function AddData(data) {

    tableBody.html("");


    //for (var i= 0; i < data.)

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

AddData(tableData);

/* // Append rows to table
function AddData(data) {

    tableBody.html("");

    data.forEach((dataRow) => {

        var row = tableBody.append("tr");

        Object.values(dataRow).forEach((value) => {
            //console.log(key, value);
            let cell = tableBody.append("tr")
            cell.text(value);

        });

    });
}

AddData(tableData); */