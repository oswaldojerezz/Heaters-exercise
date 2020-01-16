jQuery(document).ready(function(){

    // Selectors of HTML Content
    const data = $('[data-toggle="popover"]');
    const btnBack = $("#btnBack");
    const btnNext = $("#btnNext");


    // Variables
    let id = "";
    let currentPage = 0;

    // Brings Popover Content
    data.hover(function(){
        id = $(this).attr('id');
        popoverContent(id);
    },function(){return 0;});
    data.popover({
        html:true
    });

    //Brings Initial Table Content
    tableContent("0");

    //Brings Table Content
    data.click(function(){
        id = $(this).attr('id');
        tableContent(id);
        btnNext.removeClass("d-none").addClass("animated fadeIn");
        $("#ampsGraphics").removeClass("d-none").addClass("animated fadeIn");
        $("#totalEnergyGraphics").removeClass("d-none").addClass("animated fadeIn");
    });

    //Brings Next 10
    btnNext.click(function(){
        currentPage = currentPage + 10;
        if(currentPage > 0){
            btnBack.removeClass("d-none").addClass("animated fadeIn");
        }
        getLimited(currentPage, id);
    });

    //Brings previous 10
    btnBack.click(function(){
        if(currentPage <= 0){
            btnBack.addClass("d-none");
        }
        currentPage = currentPage - 10;
        getLimited(currentPage, id);
    });
    

});



function tableContent(id){
    $.ajax({
        url: "./modules/heatersTime.php",
        method: "POST",
        data:{
            name : id
    },
    dataType: "JSON",
    success:function(iniHeater){
        // Clean Table
        cleanTable();

        // Variables for chart
        let timeLabels = "";
        let datasetAmps = "";
        let datasetTotalEnergy = "";

        // reading array
        (iniHeater.heaterReg).forEach(heater => {
            bodyHeater = $("#tbodyHeater");
            content = buildContent(heater);
            bodyHeater.append(content);
            timeLabels = timeLabels +"/"+ heater[1];
            datasetAmps = datasetAmps + "/" + heater[2];
            datasetTotalEnergy = datasetTotalEnergy + "/" + heater[3];
        });

        let timeLabelsClean = cleanData(timeLabels);
        let datasetAmpsClean = cleanData(datasetAmps);
        let datasetTotalEnergyClean = cleanData(datasetTotalEnergy);

        buildChart(timeLabelsClean,datasetAmpsClean,datasetTotalEnergyClean);

    }
    });
}

function cleanData(data) {
    dataCleaned = data.split("/");
    dataCleaned.shift();
    return dataCleaned;
}

function popoverContent(id) {
    $.ajax({
        url: "./modules/heaters.php",
        method: "POST",
        data:{
            name : id
    },
    dataType: "JSON",
    success:function(data){
        content = `
            <p>Name :${data.name} | Bottom_depth : ${data.bottom_depth}</p>
            <p>length : ${data.length} | PSU : ${data.power_supply_unit} </p>
            <p>channel : ${data.channel}</p>
        `;
        popover = $(`#${data.name}`);
        popover.attr('data-content', content);
        popover.attr('title',`Heater: ${data.name}`);
    }
    });
        return 0;
    }
    
function getLimited(currentPage,id){

        $.ajax({
            url: "./modules/heatersTime.php",
            method: "POST",
            data:{
                name : id,
                currentPage: currentPage
        },
        dataType: "JSON",
        success:function(data){
            cleanTable();

            // Variables for chart
            let timeLabels = "";
            let datasetAmps = "";
            let datasetTotalEnergy = "";

            (data.heaterReg).forEach(heater => {
                bodyHeater = $("#tbodyHeater");
                content = buildContent(heater);
                bodyHeater.append(content);
                timeLabels = timeLabels +"/"+ heater[1];
                datasetAmps = datasetAmps + "/" + heater[2];
                datasetTotalEnergy = datasetTotalEnergy + "/" + heater[3];
            });

            let timeLabelsClean = cleanData(timeLabels);
            let datasetAmpsClean = cleanData(datasetAmps);
            let datasetTotalEnergyClean = cleanData(datasetTotalEnergy);
    
            buildChart(timeLabelsClean,datasetAmpsClean,datasetTotalEnergyClean);

        }
        });

    
    }

function buildContent(heater){
    return `
    <tr id="heaterNew" class="animated fadeIn" >
    <th scope="row">${heater[0]}</th>
    <td>${heater[1]}</td>
    <td>${heater[2]}</td>
    <td>${heater[3]}</td>
    </tr>
    `;
}

function getRandomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function buildChart(timeLabels,datasetAmps,datasetTotalEnergy){

    var color = [getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor()];



    const ampsGraphics = document.getElementById('ampsGraphics').getContext('2d');

    var myChart = new Chart(ampsGraphics, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Amps',
                data: datasetAmps,
                backgroundColor: [
                    color[0] ,
                    color[1] ,
                    color[2] ,
                    color[3] ,
                    color[4] ,
                    color[5] ,
                    color[6] ,
                    color[7] ,
                    color[8] ,
                    color[9] 
                ],
                borderColor: [
                    color[0] ,
                    color[1] ,
                    color[2] ,
                    color[3] ,
                    color[4] ,
                    color[5] ,
                    color[6] ,
                    color[7] ,
                    color[8] ,
                    color[9] 
                ],
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    var color = [getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor(),getRandomColor()];

    const totalEnergyGraphics = document.getElementById('totalEnergyGraphics').getContext('2d');

    var myChart2 = new Chart(totalEnergyGraphics, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Total Energy',
                data: datasetTotalEnergy,
                backgroundColor: [
                    color[0] ,
                    color[1] ,
                    color[2] ,
                    color[3] ,
                    color[4] ,
                    color[5] ,
                    color[6] ,
                    color[7] ,
                    color[8] ,
                    color[9] 
                ],
                borderColor: [
                    color[0] ,
                    color[1] ,
                    color[2] ,
                    color[3] ,
                    color[4] ,
                    color[5] ,
                    color[6] ,
                    color[7] ,
                    color[8] ,
                    color[9] 
                ],
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}

function cleanTable() {
    if ($("#heaterNew").length) {
        $("#tbodyHeater").empty("");
    }
}
