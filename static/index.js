document.addEventListener('DOMContentLoaded', function () {
    fetchStocks();
});

let lineChart, barChart, pieChart;

function fetchStocks() {
    const stockList = document.getElementById('stockList');
    stockList.innerHTML = '';

    fetch('/stocks')
        .then(response => response.json())
        .then(stocks => {
            stockList.innerHTML = ''; stocks.forEach(stock => {
                stockList.innerHTML += createStockCard(stock);
            });
            updateCharts(stocks);
        })
        .catch(error => {
            console.error('Error fetching stocks:', error);
        });
}

function createStockCard(stock) {
    return `
    <div class="stock-card bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">${stock.name}</h3>
            <span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">${stock.ticker}</span>
        </div>
        <p class="text-2xl font-bold text-green-600 mb-4">$${stock.price.toFixed(2)}</p>
    </div>
    `;
}

function updateCharts(stocks) {
    const labels = stocks.map(stock => stock.name);
    const data = stocks.map(stock => stock.price);

    // Update Line Chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    if (lineChart) lineChart.destroy();
    lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Prices (Line)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Update Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    if (barChart) barChart.destroy();
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Prices (Bar)',
                data: data,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Update Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Prices (Pie)',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
