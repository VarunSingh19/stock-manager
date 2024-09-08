from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from models import db, Stock
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)

# Route to serve the index.html file
@app.route('/')
def index():
    return render_template('index.html')

# API routes for CRUD operations
@app.route('/stocks', methods=['GET'])
def get_stocks():
    stocks = Stock.query.all()
    return jsonify([{'id': stock.id, 'name': stock.name, 'ticker': stock.ticker, 'price': stock.price} for stock in stocks])

@app.route('/stocks', methods=['POST'])
def add_stock():
    data = request.json
    new_stock = Stock(name=data['name'], ticker=data['ticker'], price=data['price'])
    db.session.add(new_stock)
    db.session.commit()
    return jsonify({'message': 'Stock added'}), 201

@app.route('/stocks/<int:id>', methods=['PUT'])
def update_stock(id):
    stock = Stock.query.get(id)
    data = request.json
    if not stock:
        return jsonify({'message': 'Stock not found'}), 404
    stock.name = data['name']
    stock.ticker = data['ticker']
    stock.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Stock updated'})

@app.route('/stocks/<int:id>', methods=['DELETE'])
def delete_stock(id):
    stock = Stock.query.get(id)
    if not stock:
        return jsonify({'message': 'Stock not found'}), 404
    db.session.delete(stock)
    db.session.commit()
    return jsonify({'message': 'Stock deleted'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
