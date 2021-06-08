function loadChart2() {
    var progress = document.getElementById('progressChart');
    var config = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                fill: false,
                borderColor: 'rgba(0, 100, 5, 0.1)',
                backgroundColor: 'rgba(0, 100, 5, 0.1)',
                data: [
                    53,
                    106,
                    170
                ]
            }, {
                label: 'My Second dataset ',
                fill: false,
                borderColor: 'rgba(200, 100, 5, 0.1)',
                backgroundColor: 'rgba(200, 100, 5, 0.1)',
                data: [
                    40, 60, 100
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Animation Progress Bar'
            },
            animation: {
                duration: 2000,
                onProgress: function (animation) {
                    progress.value = animation.currentStep / animation.numSteps;
                },
                onComplete: function () {
                    window.setTimeout(function () {
                        progress.value = 0;
                    }, 2000);
                }
            }
        }
    };
    // window.onload = function () {
    var ctx2 = document.getElementById('progressChart').getContext('2d');
        window.progressChart = new Chart(ctx2, config);
    // var
    // };
    //
    // document.getElementById('randomizeData').addEventListener('click', function() {
    // 	config.data.datasets.forEach(function(dataset) {
    // 		dataset.data = dataset.data.map(function() {
    // 			return randomScalingFactor();
    // 		});
    // 	});
    //
    // 	window.myLine.update();
    // });

}
function getData(){
    // return [12, 19, 3, 5, 2, 3, 5, 1, 10, 50, 1, 1]
    $.get('/expense-pie-chart')
        .done(function(data){
            // loadChart(data)
            loadChart2()
        })
}

// $(document).ready(function(){
//     getData();
//
// });
getData();

var modal = document.getElementById("progressModal");

// Get the button that opens the modal
var btn2 = document.getElementById("progressButton");

// Get the <span> element that closes the modal
var span = document.getElementById("progress-close");

// When the user clicks on the button, open the modal
btn2.onclick = function() {
    console.log('btn2');
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    console.log("clicked")
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}