# Stock Manager Pro 🚀

Stock Manager Pro is a web-based application that allows users to manage and track their stock portfolio efficiently. The app provides a user-friendly interface to add stocks, view price trends, and filter stocks based on price movements (up or down). Built using modern web technologies, this app is a perfect example of combining front-end and back-end technologies for a seamless user experience.

## Features ✨

- **Add New Stock**: Add stocks with details like name, ticker, and price.
- **Price Direction**: Indicate if the stock is trending up or down.
- **Filter Stocks**: Filter your portfolio based on price movement (up or down).
- **Responsive Design**: Fully responsive interface that adapts to different screen sizes.
- **Stock Price Report**: A chart section (to be implemented) for price trend visualization using Chart.js.

## Technologies Used 🛠️

Here's a breakdown of the technologies used in this project:

### Backend (Server) 🖥️

- ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white) **Flask**:

  - Flask is used as the backend framework to manage the server-side logic. It handles requests from the front end, processes the data, and sends back responses. Flask is lightweight and flexible, making it ideal for this project.
  - **How it's used**: The app routes the requests from the stock form, processes stock data, and provides an API for future data storage functionalities.

- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) **PostgreSQL**:
  - PostgreSQL is used as the database to store stock information. It's a powerful and reliable relational database that supports advanced features like complex queries, data indexing, and more.
  - **How it's used**: PostgreSQL stores the stock data (name, ticker, price, and price movement). Future improvements will integrate real-time querying and filtering of stocks based on price movements directly from the database.

### Frontend (Client) 🌐

- ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white) **HTML**:

  - HTML provides the basic structure of the app. It is used to define the layout of the stock manager form, stock portfolio, and stock filtering options.
  - **How it's used**: The structure for forms, buttons, and the stock list is defined using semantic HTML elements.

- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**:

  - Tailwind CSS is a utility-first CSS framework used for styling the app. It allows for a highly customizable and responsive design with minimal CSS code.
  - **How it's used**: Tailwind is used to style the form elements, buttons, navigation bar, and stock list cards with responsive classes for different screen sizes.

- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript**:

  - JavaScript is used to manage dynamic functionality such as adding stocks, filtering the portfolio, and rendering the stock list in real time.
  - **How it's used**: JavaScript handles form submissions, stores stock data in memory, and filters the portfolio based on price movement (up or down). It will also power the chart rendering logic for stock price reports.

- ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white) **Chart.js**:
  - Chart.js is used for rendering dynamic charts that visualize stock price trends.
  - **How it's used**: The app will generate a stock price chart to display historical data, helping users visualize their portfolio's performance.

### Database 💾

- **SQLAlchemy** (ORM for Flask & PostgreSQL):
  - SQLAlchemy is an Object Relational Mapper (ORM) that allows seamless interaction between Flask and PostgreSQL.
  - **How it's used**: SQLAlchemy manages interactions between the Flask app and PostgreSQL, handling database queries in a Pythonic way.

### Additional Libraries 📦

- ![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat&logo=fontawesome&logoColor=white) **FontAwesome**:
  - Used for icons in navigation and buttons to improve the user interface.
  - **How it's used**: Icons are displayed next to text to make the UI more intuitive (e.g., add stock button, navigation bar icon).

## Setup Instructions ⚙️

Follow the steps below to set up and run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/VarunSingh19/stock-manager.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd stock-manager
   ```

3. **Set up a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install the dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Set up PostgreSQL database**:

   - Ensure you have PostgreSQL installed and running.
   - Create a new database:
     ```sql
     CREATE DATABASE stocks_db;
     ```

6. **Run the Flask app**:

   ```bash
   flask run
   or
   python app.py
   ```

7. **Run the project**:
   Open your browser and go to `http://localhost:5000` to see the app.

## Usage 🚀

1. **Adding a Stock**:

   - Fill in the "Stock Name", "Stock Ticker", and "Stock Price" fields.
   - Choose whether the price is trending up or down.
   - Click "Add Stock" to save it in your portfolio.

2. **Filter Stocks**:

   - Use the filter radio buttons to view stocks that are either increasing, decreasing, or showing all stocks.

3. **View Price Reports**:
   - (To be implemented) The stock price chart will display trends and reports based on the data provided.

## Future Improvements 🔧

- **Implement Stock Chart**: Complete the charting feature using Chart.js for price trend visualization.
- **Data Persistence**: Implement local storage or connect to the PostgreSQL database to persist the stock data.
- **User Authentication**: Add user authentication to manage multiple user portfolios.
- **Price History**: Add functionality to track and visualize stock price history over time.

## License 📄

This project is licensed under the MIT License.

---

### Screenshots 📸

![Stock Manager Pro](screenshot.png)
