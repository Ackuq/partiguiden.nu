---
layout: default
title: Statistik
---
<script src="/js/papaparse.min.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>



<div id="content">
    <div class="container">
        <canvas id="myChart" width="800" height="400"></canvas>
        <script>
                function average(data){
                    var myData = [];
                    switch(data[0]["PublYearMonth"].slice(5)){
                    case "jan": var month = "Januari";
                            break;
                    case "feb": var month = "Februari";
                            break;
                    case "mar": var month = "Mars";
                            break;
                    case "apr": var month = "April";
                            break;
                    case "maj": var month = "Maj";
                            break;
                    case "jun": var month = "Juni";
                            break;
                    case "jul": var month = "Juli";
                            break;
                    case "aug": var month = "Augusti";
                            break;
                    case "sep": var month = "September";
                            break;
                    case "okt": var month = "Oktober";
                            break;
                    case "nov": var month = "November";
                            break;
                    case "dec": var month = "December";
                            break;
                    }
                    for(var i = 0; i < 8;i++){
                        myData[i]=0;
                    }
                    for(var i = 0; i<data.length;i++){
                        myData[0] += parseFloat(data[i].S);
                        myData[1] += parseFloat(data[i].V);
                        myData[2] += parseFloat(data[i].MP);
                        myData[3] += parseFloat(data[i].M);
                        myData[4] += parseFloat(data[i].L);
                        myData[5] += parseFloat(data[i].C);
                        myData[6] += parseFloat(data[i].KD);
                        myData[7] += parseFloat(data[i].SD);
                    }
                    for(var i = 0; i <8;i++){
                        myData[i]= Number((myData[i]/(data.length)).toFixed(1));
                    }
                    var ctx = document.getElementById("myChart").getContext("2d");
                    var myChart = new Chart(ctx,{
                        type: 'bar',
                        data:{
                            labels: ["S","V","MP","M","L","C","KD","SD"],
                            datasets: 
                            [
                                {
                                    label: "Medelvärde",
                                    backgroundColor: ["#C0392B", "#CF000F","#26A65B","#3A539B","#5C97BF","#1E824C","#22A7F0","#F4D03F"],
                                    data: myData
                                }
                            ]
                        },
                        options:{
                            responsive: true,
                            maintainAspectRatio: false,
                            legend: {
                                display: false
                            },
                            tooltips:{
                                callbacks:{
                                    afterLabel: function(tooltipItem, dat){
                                        var values = [];
                                        for(var i = 0;i<data.length;i++){
                                            values.push(data[i].Company +": "+data[i][tooltipItem.xLabel]);
                                        }
                                        return values;
                                    }    
                                }
                            },
                            title: {
                                display: true,
                                text: 'Nuvarande opinionssiffror - ' + month + " " + data[0]["PublYearMonth"].slice(0,4)
                            }
                        }
                    });
                }
        </script>
    </div>
    <div class="container">
        <canvas id="pastChart" style="position: relative; height:70vh; width:80vw"></canvas>
        <script>
            function past(data){
                var pastData = [];
                var dateLabels = [];
                const sums = new Object;
                sums.S = [];
                sums.V = [];
                sums.MP = [];
                sums.M = [];
                sums.L = [];
                sums.C = [];
                sums.KD = [];
                sums.SD = [];
                sums.count = [];
                for(var i = data.length-1; i>=0;i--){
                    if(data[i]["Company"] != "United Minds"){
                        var currp = data[i]["collectPeriodTo"].slice(0,7);
                        for(var prop in sums){
                            if(!sums[prop][currp] && prop != "count"){
                                sums[prop][currp] = parseFloat(data[i][prop]);
                            }
                            else if(prop != "count"){
                                sums[prop][currp] += parseFloat(data[i][prop]);
                            }
                        }
                        if(!sums["count"][currp]){
                            sums["count"][currp] = 1;
                            dateLabels.push(currp);
                        }
                        else
                            sums["count"][currp]++;
                    }
                }
                for(var i = 0; i < dateLabels.length;i++){
                    for(var prop in sums){
                        if(prop != "count")
                            sums[prop][dateLabels[i]] = (sums[prop][dateLabels[i]] / sums.count[dateLabels[i]]).toFixed(1);
                    }
                }
                var ctx = document.getElementById("pastChart").getContext("2d");
                var myChart = new Chart(ctx,{
                    type: 'line',
                    data:{
                        labels: dateLabels,
                        datasets:
                        [
                            {
                                label: "S",
                                borderColor: "#C0392B",
                                fill: false,
                                data: Object.values(sums.S)
                            },
                            {
                                label: "V",
                                fill: false,
                                borderColor: "#CF000F",
                                data: Object.values(sums.V)
                            },
                            {
                                label: "MP",
                                borderColor: "#26A65B",
                                fill: false,
                                data: Object.values(sums.MP)
                            },
                            {
                                label: "M",
                                borderColor: "#3A539B",
                                fill: false,
                                data: Object.values(sums.M)
                            },
                            {
                                label: "L",
                                borderColor: "#5C97BF",
                                fill: false,
                                data: Object.values(sums.L)
                            },
                            {
                                label: "C",
                                borderColor: "#1E824C",
                                fill: false,
                                data: Object.values(sums.C)
                            },
                            {
                                label: "KD",
                                borderColor: "#22A7F0",
                                fill: false,
                                data: Object.values(sums.KD)
                            },
                            {
                                label: "SD",
                                borderColor: "#F4D03F",
                                fill: false,
                                data: Object.values(sums.SD)
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        stacked: true,
                        title:{
                            display: true,
                            text: "Opionssiffor, idag - 4 år sen"
                        },
                        tooltips:{
                            mode: 'index',
                            intersect: false
                        },
                        hover:{
                            mode: 'nearest',
                            intersect: true
                        }
                    }
                });
            }
        </script>
    </div>
</div>

<script>
d3.csv("https://raw.githubusercontent.com/hjnilsson/SwedishPolls/master/Data/Polls.csv",function(csv){
    var check = true;
    var pastd = csv.filter(function(row){
        if(row['PublYearMonth'] == ((csv[0]["PublYearMonth"].slice(0,4)-4) + (csv[0]["PublYearMonth"].slice(4)))){
           check = false;
        }
        if(check)
            return row['PublYearMonth'];
    });
    past(pastd);
    var av = csv.filter(function(row){
        return row['PublYearMonth'] == csv[0]["PublYearMonth"];
    });
    average(av);
});
</script>
