---
layout: default
title: Kontakt
---
<script src="/js/papaparse.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>



<div id="content">
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <canvas id="myChart" width="500" height="500"></canvas>
                <script>
                function go(data){
                    var labelsv = [];
                    var morrisData = [];
                    morrisData.length = 8;
                    for (var i = 0; i < 8;i++){
                        morrisData[i]= [];
                    }
                    var p = 100;
                    for(var i =0; i< 8;i++){
                        morrisData[i].length = p/4;
                    }
                    for(var i = 1; i < p; i++) {
                        if(data[i][0] != data[i-1][0])
                            labelsv.push(data[i][0]);
                        var j = labelsv.length;
                        switch(data[i][1]){
                            case "Demoskop":
                                console.log("tes");
                                morrisData[0].splice(j,0,data[i][2]);
                                break;
                            case "Inizio":
                                morrisData[1].splice(j,0,data[i][2]);
                                break;
                            case "YouGov":
                                morrisData[2].splice(j,0,data[i][2]);
                                break;
                            case "Ipsos":
                                morrisData[3].splice(j,0,data[i][2]);
                                break;
                            case "Sifo":
                                morrisData[4].splice(j,0,data[i][2]);
                                break;
                            case "Sentio":
                                morrisData[5].splice(j,0,data[i][2]);
                                break;
                            case "SCB":
                                morrisData[6].splice(j,data[i][2]);
                                break;
                            case "Novus":
                                morrisData[7].splice(j,0,data[i][2]);
                                break;
                            }
                    }
                    var ctx = document.getElementById("myChart").getContext("2d");
                    console.log(morrisData[0]);
                    var myChart = new Chart(ctx,{
                        label: "Moderaterna",
                        type: 'line',
                        data: {
                            labels: labelsv,
                            datasets: [{
                                    label: "Demoskop",
                                    fill: false,
                                    data:morrisData[0]
                                },{
                                    label: "Inizio",
                                    fill: false,
                                    data:morrisData[1]
                                },{
                                    label: "YouGov",
                                    fill: false,
                                    data:morrisData[2]
                                },{
                                    label: "Ipsos",
                                    fill: false,
                                    data:morrisData[3]
                                },{
                                    label: "Sifo",
                                    fill: false,
                                    data:morrisData[4]
                                },{
                                   label: "Sentio",
                                    fill: false,
                                    data:morrisData[5]
                                },{
                                    label: "SCB",
                                    fill: false,
                                    data:morrisData[6]
                                },{
                                    label: "Novus",
                                    fill: false,
                                    data:morrisData[7]
                                }]
                            },
                            options: {
                              title: {
                                display: true,
                                text: 'Moderaterna'
                              }
                            }
                        });
                }
                </script>
            </div>
        </div>
    </div>
</div>

<script>
var Gdata;
function doStuff(data) {
    console.log(data);
    Gdata = data;
}
function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        delimiter: ',',
        skipEmptyLines: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}
parseData("https://raw.githubusercontent.com/MansMeg/SwedishPolls/master/Data/Polls.csv", go);
</script