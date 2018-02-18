---
layout: default
title: Statistik
---
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/0.5.7/chartjs-plugin-annotation.min.js"></script>


<div id="content">
    <div class="container">
        <h1 class="font-weight-light text-center">{{ page.title }}</h1>
        <h5 class="text-center font-weight-light">Här kan du hitta sammanställd data från diverse opinionsundersökningar som har gjorts i Sverige. Mer grafer kommer komma.</h5>
    </div>
    <div class="container">
        <canvas id="currentChart" width="800" height="400"></canvas>
        <script>
                function average(data, k){
                    var myData = [];
                    year = data[0]["year"];
                    switch(data[0]["month"]){
                    case 0: var month = "Januari";
                            break;
                    case 1: var month = "Februari";
                            break;
                    case 2: var month = "Mars";
                            break;
                    case 3: var month = "April";
                            break;
                    case 4: var month = "Maj";
                            break;
                    case 5: var month = "Juni";
                            break;
                    case 6: var month = "Juli";
                            break;
                    case 7: var month = "Augusti";
                            break;
                    case 8: var month = "September";
                            break;
                    case 9: var month = "Oktober";
                            break;
                    case 10: var month = "November";
                            break;
                    case 11: var month = "December";
                            break;
                    }
                    for(var i = 0; i < 8;i++){
                        myData[i]=0;
                    }
                    for(var i = 0; i < k;i++){
                        myData[0] += parseFloat(data[i].S);
                        myData[1] += parseFloat(data[i].V);
                        myData[2] += parseFloat(data[i].MP);
                        myData[3] += parseFloat(data[i].SD);
                        myData[4] += parseFloat(data[i].M);
                        myData[5] += parseFloat(data[i].L);
                        myData[6] += parseFloat(data[i].C);
                        myData[7] += parseFloat(data[i].KD);
                    }
                    var blockArray = [
                        ((myData[0]+myData[1]+myData[2])/k).toFixed(1),
                        (myData[3]/k).toFixed(1),
                        ((myData[4]+myData[5]+myData[6]+myData[7])/k).toFixed(1)
                    ];
                    for(var i = 0; i <8;i++){
                        myData[i] = (myData[i]/(k)).toFixed(1);
                    }
                    blocks(myData, blockArray, year, month);                    
                    var canvas = document.getElementById("currentChart");
                    var ctx = document.getElementById("currentChart").getContext("2d");
                    var currentChart = new Chart(ctx,{
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
                                        for(var i = 0;i<k;i++){
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
                            },
                            annotation: {
                                annotations: [{
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y-axis-0',
                                    value: '4',
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    label:{
                                        fontSize: 9,
                                        enabled: true,
                                        content: "4%-spärren"
                                    }
                                }]
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
                var k = 0;
                var first = new Date(1999,01,01);
                var firstData = new Object();
                for(var i = data.length-1; i>=0;i--){
                    var from = new Date(data[i]["collectPeriodFrom"]);
                    var to = new Date(data[i]["collectPeriodTo"]);
                    var avg = new Date((to.getTime() + from.getTime()) / 2);
                    if(avg.getTime() > first.getTime()){
                        first = avg;
                    }
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
                for(var i = 0; i< 15; i++){
                    var from = new Date(data[i]["collectPeriodFrom"]);
                    var to = new Date(data[i]["collectPeriodTo"]);
                    var avg = new Date((to.getTime() + from.getTime()) / 2);
                    if(avg.getMonth() == first.getMonth()){
                        firstData[k] = new Object();
                        firstData[k].M = data[i].M;
                        firstData[k].S = data[i].S;
                        firstData[k].V = data[i].V;
                        firstData[k].MP = data[i].MP;
                        firstData[k].KD = data[i].KD;
                        firstData[k].C = data[i].C;
                        firstData[k].L = data[i].L;
                        firstData[k].SD = data[i].SD;
                        firstData[k].Company = data[i].Company;
                        firstData[k].year = avg.getFullYear();
                        firstData[k].month = avg.getMonth();
                        k++;
                    }
                }
                average(firstData, k);
                for(var i = 0; i < dateLabels.length;i++){
                    for(var prop in sums){
                        if(prop != "count")
                            sums[prop][dateLabels[i]] = (sums[prop][dateLabels[i]] / sums.count[dateLabels[i]]).toFixed(1);
                    }
                }
                var ctx = document.getElementById("pastChart").getContext("2d");
                var pastChart = new Chart(ctx,{
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
            function blocks(data, blocks, year, month){
                var ctx = document.getElementById("blockChart").getContext("2d");
                console.log(blocks);
                var blockChart = new Chart(ctx,{
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
                            labels: ["Vänsterblocket","Sverigedemokraterna","Borgliga blocket"],
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
});
</script>
