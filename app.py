from flask import Flask, render_template, jsonify, request, redirect, url_for, session, flash
from flask_cors import CORS
from models import db, Stock, User
from config import Config
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)
app.secret_key = 'your_secret_key'  

# User Signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        if User.query.filter_by(username=username).first():
            flash('Username already exists!')
            return redirect(url_for('signup'))
        new_user = User(username=username, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash('User created successfully! Please login.')
        return redirect(url_for('login'))
    return render_template('signup.html')

# User Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            session['username'] = user.username
            session['role'] = user.role
            if user.role == 'admin':
                return redirect(url_for('admin'))
            return redirect(url_for('index'))
        flash('Invalid credentials. Please try again.')
    return render_template('login.html')


# Logout
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    session.pop('role', None)
    return redirect(url_for('login'))


@app.route('/')
def index():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    username = session.get('username', 'Guest')
    role = session.get('role', 'user')
    
    print(f"Username: {username}, Role: {role}")  # Debugging line
    return render_template('index.html', username=username, role=role)


@app.route('/admin')
def admin():
    if 'role' in session and session['role'] == 'admin':
        return render_template('admin.html')
    flash('You do not have permission to access this page.')
    return redirect(url_for('login'))



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
