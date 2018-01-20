"""This class manages the board logic. Consider player A as +1 and B as -1."""

import itertools

class Board_logic():
    def __init__(self):
        pass

    def get_new_board(self, rows=3):
        return [[0 for i in range(rows)] for j in range(rows)]

    def line_complete(self, line):
        length = len(line)
        total = 0
        for i in line:
            total += i
        return abs(total) == length

    def game_won(self, board):
        # Check for rows
        rows = len(board)
        line = None
        for i in range(rows):
            line = board[i]
            if self.line_complete(line):
                return line[0], {"row": i}

        # Check for columns
        for i in range(rows):
            line = [j[i] for j in board]
            if self.line_complete(line):
                return board[0][i], {"column": i}

        # Check for diagonal (top left to bottom right)
        line = [board[i][i] for i in range(rows)]
        if self.line_complete(line):
            return line[0], {"diagonal": 0}

        # Check for diagonal (top right to bottom left)
        line = [board[rows - 1 - i][i] for i in range(rows)]
        if self.line_complete(line):
            return line[0], {"diagonal": 1}

        return 0, {}

    def moves_available(self, board):
        rows = len(board)
        for i, j in itertools.product(range(rows), range(rows)):
            if board[i][j] == 0:
                yield (i, j)

    def check_game_status(self, board):
        game_won, info = self.game_won(board)
        moves_available = len(list(self.moves_available(board)))
        result = {
            "moves_available": moves_available,
            "winner": game_won,
            "game_over": True if game_won != 0 and moves_available > 0 else False,
            "info": info
        }

        return result

# b = Board_logic()
# print list(b.moves_available(b.get_new_board()))
