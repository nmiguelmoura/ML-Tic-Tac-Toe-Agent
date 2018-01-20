import json
from flask import Flask, render_template, jsonify, request
from prefabs import board_logic as bl
from prefabs import ai_agent as ai

app = Flask(__name__)

bl_instance = bl.Board_logic()
ai_instance = ai.Ai_agent()


@app.route('/')
def game():
    # return render_template('_index.html', STATE=state)
    return render_template('index.html')


@app.route('/get_new_board/')
@app.route('/get_new_board/<int:rows>/')
def get_new_board(rows=3):
    if rows < 3:
        rows = 3
    elif rows > 5:
        rows = 5
    return json.dumps(bl_instance.get_new_board(rows))


@app.route('/check_game_over/', methods=['POST'])
def check_game_over():
    if request.method == "POST":
        board = json.loads(request.form["board"])

        if board and isinstance(board, list):
            return json.dumps(bl_instance.check_game_status(board))
        else:
            return "Invalid board"
    return "Invalid request"


@app.route('/make_move/', methods=['POST'])
def make_move():
    if request.method == "POST":
        board = json.loads(request.form["board"])
        type = request.form["type"]

        if board and isinstance(board, list):
            return json.dumps(ai_instance.make_move(board, type))
        else:
            return "Invalid board"
    return "Invalid request"


if __name__ == '__main__':
    app.secret_key = "secret_key"
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
