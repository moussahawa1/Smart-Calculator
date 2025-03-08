from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        expression = data['expression']
        result = eval_expression(expression)
        return jsonify(result=result)
    except Exception as e:
        return jsonify(result='Error')

def eval_expression(expression):
    # Replace pi and e with their math equivalents
    expression = expression.replace('π', str(math.pi))
    expression = expression.replace('e', str(math.e))

    # Handle factorial (!)
    if '!' in expression:
        expression = handle_factorial(expression)

    # Define allowed functions for eval
    allowed_funcs = {
        'log10': math.log10,
        'ln': math.log,
        'sqrt': math.sqrt,
        'cbrt': lambda x: x ** (1/3),
        'sin': math.sin,
        'cos': math.cos,
        'tan': math.tan,
        'sinh': math.sinh,
        'cosh': math.cosh,
        'tanh': math.tanh
    }

    # Evaluate the expression safely
    result = eval(expression, {"__builtins__": None}, allowed_funcs)
    return result

def handle_factorial(expression):
    while '!' in expression:
        idx = expression.index('!')
        num = ''
        i = idx - 1
        while i >= 0 and (expression[i].isdigit() or expression[i] == '.'):
            num = expression[i] + num
            i -= 1
        factorial_result = math.factorial(int(num))
        expression = expression[:i + 1] + str(factorial_result) + expression[idx + 1:]
    return expression

if __name__ == '__main__':
    app.run(debug=True)