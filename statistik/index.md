---
layout: default
title: Statistik
---
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>



<div id="content">
    <div class="container">
        <h1 class="font-weight-light text-center">{{ page.title }}</h1>
        <h5 class="text-center font-weight-light">Här kan du hitta sammanställd data från diverse opinionsundersökningar som har gjorts i Sverige. Mer grafer kommer komma.</h5>
    </div>
    <div class="container">
        <canvas id="myChart" width="800" height="400"></canvas>
        <script>
                function average(data){
                    var myData = [];
                    year = data[0]["PublYearMonth"].slice(0,4);
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
                        myData[3] += parseFloat(data[i].SD);
                        myData[4] += parseFloat(data[i].M);
                        myData[5] += parseFloat(data[i].L);
                        myData[6] += parseFloat(data[i].C);
                        myData[7] += parseFloat(data[i].KD);
                    }
                    blocks(myData, year, month);
                    for(var i = 0; i <8;i++){
                        myData[i]= (myData[i]/(data.length)).toFixed(1);
                    }
                    var ctx = document.getElementById("myChart").getContext("2d");
                    var myChart = new Chart(ctx,{
                        type: 'bar',
                        data:{
                            labels: ["S","V","MP","SD","M","L","C","KD"],
                            datasets: 
                            [
                                {
                                    label: "Medelvärde",
                                    backgroundColor: ["#C0392B", "#CF000F","#26A65B","#F4D03F","#3A539B","#5C97BF","#1E824C","#22A7F0"],
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
                                text: 'Nuvarande opinionssiffor - ' + month + " " + year,
                                fontSize: 20
                            },
                            scales:{
                                yAxes:[
                                    {
                                        ticks: {
                                            callback: function(label){
                                                return label + "%";
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    });
                }
        </script>
    </div>
    <div class="container">
        <canvas id="pastChart" style="position: relative; height:50vh; width:80vw"></canvas>
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
                    var from = new Date(data[i]["collectPeriodFrom"]);
                    var to = new Date(data[i]["collectPeriodTo"]);
                    var avg = new Date((to.getTime() + from.getTime()) / 2);
                    if(data[i]["Company"] != "United Minds"){
                        var currp = avg.toISOString().slice(0,7);
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
                                data: Object.values(sums.S)
                            },
                            {
                                label: "V",
                                borderColor: "#CF000F",
                                data: Object.values(sums.V)
                            },
                            {
                                label: "MP",
                                borderColor: "#26A65B",
                                data: Object.values(sums.MP)
                            },
                            {
                                label: "M",
                                borderColor: "#3A539B",
                                data: Object.values(sums.M)
                            },
                            {
                                label: "L",
                                borderColor: "#5C97BF",
                                data: Object.values(sums.L)
                            },
                            {
                                label: "C",
                                borderColor: "#1E824C",
                                data: Object.values(sums.C)
                            },
                            {
                                label: "KD",
                                borderColor: "#22A7F0",
                                data: Object.values(sums.KD)
                            },
                            {
                                label: "SD",
                                borderColor: "#F4D03F",
                                data: Object.values(sums.SD)
                            }
                        ]
                    },
                    options: {
                        elements:{
                            point:{
                                radius: 0
                            },
                            line:{
                                borderWidth: 1,
                                fill: false
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text: "Medelvärde över tid, från 4 år sen till idag",
                            fontSize: 20
                        },
                        tooltips:{
                            mode: 'index',
                            intersect: false
                        },
                        hover:{
                            mode: 'nearest',
                            intersect: true
                        },
                        scales:{
                            yAxes:[
                                {
                                    ticks: {
                                        callback: function(label){
                                            return label + "%";
                                        }
                                    }
                                }
                            ]
                        }
                    }
                });
            }
        </script>
    </div>
    <div class="container d-flex justify-content-center">
        <canvas id="blockChart" height="200" width="400"></canvas>
        <script>
            function blocks(data, year, month){
                var blocks = [];
                blocks[0] = (data[0] + data[1] + data[2]).toFixed(1);
                blocks[1] = data[3].toFixed(1);
                blocks[2] = (data[4] + data[5] + data[6] + data[7]).toFixed(1);
                var ctx = document.getElementById("blockChart").getContext("2d");
                var myChart = new Chart(ctx,{
                    type: 'doughnut',
                    data:{
                        datasets:
                        [{
                            label: "Medelvärde",
                            labels: ["S","V","MP","SD","M","L","C","KD"],
                            backgroundColor: ["#C0392B", "#CF000F","#26A65B","#F4D03F","#3A539B","#5C97BF","#1E824C","#22A7F0"],
                            data: data
                        },{
                            label: "Blocken",
                            labels: ["Rödgröna","Sverigedemokraterna","Alliansen"],
                            backgroundColor: ["#c23616","#F4D03F","#1B9CFC"],
                            data: blocks
                            }
                        ]
                    },
                    options: {
                        rotation: 1 * Math.PI,
                        circumference: 1 * Math.PI,
                        responsive: false,
                        maintainAspectRatio: true,
                        title:{
                            display: true,
                            fontSize: 20,
                            text: 'Nuvarande blockskillnad - ' + month + " " + year
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var index = tooltipItem.index;
                                    return dataset.labels[index] + ': ' + dataset.data[index];
                                }
                            }
                        }
                    }
                });
            }
        </script>
    </div>
    <div class="container text-center col-md-8 offset-md-2 mt-4">
        <p>Dataunderlaget består av en CSV-fil skapad av Hampus Nilsson. Kolla in Hampus hemsida för mer grafer på: <a target="_blank" href="https://val.digital/">https://val.digital/</a></p>
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
