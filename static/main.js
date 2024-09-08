document.addEventListener('DOMContentLoaded', function () {
    fetchStocks();

    document.getElementById('stockForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const ticker = document.getElementById('ticker').value;
        const price = parseFloat(document.getElementById('price').value);
        const id = document.getElementById('stockId').value;

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/stocks/${id}` : '/stocks';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, ticker, price })
        }).then(response => {
            if (response.ok) {
                fetchStocks();
                resetForm();
            }
        });
    });
});
let stockChart;
function fetchStocks() {
    const loader = document.getElementById('loader');
    const stockList = document.getElementById('stockList');

    loader.style.display = 'flex';
    stockList.innerHTML = '';

    fetch('/stocks')
        .then(response => response.json())
        .then(stocks => {
            stockList.innerHTML = '';
            stocks.forEach(stock => {
                stockList.innerHTML += createStockCard(stock);
            });
            updateChart(stocks);
        })
        .finally(() => {
            loader.style.display = 'none';
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
        <div class="flex justify-end space-x-2">
            <button onclick="editStock(${stock.id}, '${stock.name}', '${stock.ticker}', ${stock.price})" class="text-blue-600 hover:text-blue-800 transition duration-200">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteStock(${stock.id})" class="text-red-600 hover:text-red-800 transition duration-200">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </div>
    `;
}

function deleteStock(id) {
    fetch(`/stocks/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            fetchStocks();
        }
    });
}

function editStock(id, name, ticker, price) {
    document.getElementById('stockId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('ticker').value = ticker;
    document.getElementById('price').value = price;
    document.getElementById('subBtn').innerHTML = '<i class="fas fa-save mr-2"></i>Update Stock';
}

function resetForm() {
    document.getElementById('stockId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('ticker').value = '';
    document.getElementById('price').value = '';
    document.getElementById('subBtn').innerHTML = '<i class="fas fa-plus-circle mr-2"></i>Add Stock';
}

function handleCheckboxChange(direction) {
    const upCheckbox = document.getElementById('upCheckbox');
    const downCheckbox = document.getElementById('downCheckbox');
    const tickerInput = document.getElementById('ticker');

    if (direction === 'up') {
        downCheckbox.checked = false; // Uncheck the opposite checkbox
        tickerInput.value = '📈'; // Update the ticker input value based on selection
    } else if (direction === 'down') {
        upCheckbox.checked = false; // Uncheck the opposite checkbox
        tickerInput.value = '📉'; // Update the ticker input value based on selection
    }
}

function updateChart(stocks) {
    const labels = stocks.map(stock => stock.name);
    const data = stocks.map(stock => stock.price);

    if (stockChart) {
        stockChart.destroy(); // Destroy the previous chart instance if it exists
    }

    const ctx = document.getElementById('stockChart').getContext('2d');
    stockChart = new Chart(ctx, {
        type: 'line', // You can change this to 'line', 'pie', etc.
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Prices',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


