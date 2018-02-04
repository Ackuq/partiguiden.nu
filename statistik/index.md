---
layout: default
title: Kontakt
---
<script src="/js/papaparse.min.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>



<div id="content">
    <div class="container">
                <canvas id="myChart" width="800" height="400"></canvas>
                <script>
                function go(data){
                    var myData = [];
                    for(var i = 0; i <8;i++){
                        myData[i]=0;
                    }
                    for(var i = 1; i<data.length;i++){
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
                        myData[i]= Number((myData[i]/(data.length-1)).toFixed(1));
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
                                text: 'Nuvarande opinionssiffror - ' + data[0]["PublYearMonth"]
                            }
                        }
                    });
                }
            </script>
    </div>
</div>

<script>
function parseData(file, callBack) {
    Papa.parse(file, {
        complete: function(results) {
            console.log(results.data);
            /*callBack(results.data);*/
        }
    });
}
d3.csv("https://raw.githubusercontent.com/hjnilsson/SwedishPolls/master/Data/Polls.csv",function(csv){
   csv = csv.filter(function(row){
       return  row['PublYearMonth'] == csv[0]["PublYearMonth"];
    });
    go(csv)
});
</script>
