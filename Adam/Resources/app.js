// From trafficking_report.js
const tableData = data;

const tableBody = d3.select("tbody");

// Append rows to table
function AddData(data) {

    tableBody.html("");

    data.forEach((dataRow) => {

        const row = tableBody.append("tr");

        Object.values(dataRow).forEach((value) => {
            //console.log(key, value);
            let cell = tableBody.append("tr")
            cell.text(value);

        });

    });
}

AddData(tableData);