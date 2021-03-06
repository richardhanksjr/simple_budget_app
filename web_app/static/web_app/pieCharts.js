document.addEventListener("load", function(){
    $.get('/expense-pie-chart')
    .done(function(data){
        var ctx = document.getElementById('myChart').getContext('2d');
        var pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Groceries', 'Takeout Food', 'Gas', 'Clothes', 'Kid Stuff', 'Toiletries', "Car or House", 'Entertainment', 'Drinks', 'Dogs', 'Medical', 'Previous Balance', 'Other'],
            datasets: [{
                label: 'Expense Allocation',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(80, 100, 50, 0.2)',
                    'rgba(255, 130, 70, 0.2)',
                    'rgba(30, 70, 70, 0.2)',
                    'rgba(10, 200, 140, 0.2)',
                    'rgba(240, 240, 100, 0.2)',
                    'rgba(250, 150, 50, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(80, 100, 50, 1)',
                    'rgba(255, 130, 70, 1)',
                    'rgba(30, 70, 70, 1)',
                    'rgba(10, 200, 140, 1)',
                    'rgba(240, 240, 100, 1)',
                    'rgba(250, 150, 50, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    })

    $.get('/expense-pie-chart')
        .done(function(data){
            var progress = document.getElementById('progressChart');
            var ctx2 = document.getElementById('progressChart').getContext('2d');
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
            var expenseChart = new Chart(ctx2, config);
        })

}, true);

// <script>
// let data = []
// function loadChart(data){
//     var ctx = document.getElementById('myChart').getContext('2d');
// window.pieChart = new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: ['Groceries', 'Takeout Food', 'Gas', 'Clothes', 'Baby Stuff', 'Toiletries', "Car or House", 'Entertainment', 'Drinks', 'Dogs', 'Medical', 'Other'],
//         datasets: [{
//             label: 'Expense Allocation',
//             data: data,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)',
//                 'rgba(80, 100, 50, 0.2)',
//                 'rgba(255, 130, 70, 0.2)',
//                 'rgba(30, 70, 70, 0.2)',
//                 'rgba(10, 200, 140, 0.2)',
//                 'rgba(240, 240, 100, 0.2)',
//                 'rgba(250, 150, 50, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)',
//                 'rgba(80, 100, 50, 1)',
//                 'rgba(255, 130, 70, 1)',
//                 'rgba(30, 70, 70, 1)',
//                 'rgba(10, 200, 140, 1)',
//                 'rgba(240, 240, 100, 1)',
//                 'rgba(250, 150, 50, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
// }
// // let data = [12602.19, 0, 0, 0, 0];
// function getData(){
//     // return [12, 19, 3, 5, 2, 3, 5, 1, 10, 50, 1, 1]
//     $.get('/expense-pie-chart')
//         .done(function(data){
//             loadChart(data)
//         })
// }
//
// // $(document).ready(function(){
// //     getData();
// //
// // });
//
// getData();
//
// // Modeal
// // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("pie-close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var progressModal = document.getElementById("progressModal");

// Get the button that opens the modal
var btn2 = document.getElementById("progressButton");

// Get the <span> element that closes the modal
var progressSpan = document.getElementById("progress-close");

// When the user clicks on the button, open the modal
btn2.onclick = function() {
  progressModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
progressSpan.onclick = function() {
  progressModal.style.display = "none";
}