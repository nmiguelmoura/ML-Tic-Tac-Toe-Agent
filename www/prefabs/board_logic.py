import itertools


class Board_logic():
    """This class manages the board logic. Consider player A as +1 and B as -1.
    An available move is marked as zero."""

    def __init__(self):
        pass

    def get_new_board(self, rows=3):
        # Method to return a new board with the desired number of rows and equal
        # number of columns.
        # @rows - number of desired rows (and columns too).
        return [[0 for i in range(rows)] for j in range(rows)]

    def line_complete(self, line):
        # Method to check if a given line is complete with same value (except 0).
        # Returns True or False.
        # @line - array of values.

        # Check the length of the array.
        length = len(line)

        # Total defaults to 0.
        total = 0

        # Loop through all values.
        for i in line:
            # Add the value to the total count.
            total += i

        # Return True or False.
        return abs(total) == length

    def game_won(self, board):
        # Method to check if a given game was won. Returns the winner if there
        # is one, and the number of row, column or diagonal that lead to game
        # won condition.
        # @board - board to test if game was won or not.

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
        # Method that loops through the board to check what moves are still
        # available (value == 0). Returns a generator with all available moves.
        # @board - board to check for available moves.
        rows = len(board)
        for i, j in itertools.product(range(rows), range(rows)):
            if board[i][j] == 0:
                yield (i, j)

    def check_game_status(self, board):
        # Method to check if the game is over. The game is over when a player
        # wins or when there are no more available moves.
        # @board - board to test if game was won or not.

        # Check if a given player won the game.
        game_won, info = self.game_won(board)

        # Check if there are moves available.
        moves_available = len(list(self.moves_available(board)))

        result = {
            "moves_available": moves_available,
            "winner": game_won,
            "game_over": True if game_won != 0 and moves_available > 0 else False,
            "info": info
        }

        return result
