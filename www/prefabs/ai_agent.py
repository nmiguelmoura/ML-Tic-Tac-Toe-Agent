import board_logic
import random
import sys


class Ai_agent():
    """This class holds the code to ai gameplay decision."""

    # Get an instance of board logic class
    bl = board_logic.Board_logic()

    def __init__(self):
        pass

    def apply_move(self, board_state, move, side):
        # Method to apply a move and return a new board.
        # @board_state - game board.
        # @ move - array of type [row, column].
        # @side - 1 for player and -1 for CPU.

        # Get row and column from move array.
        row, column = move

        # Generate a new board from the board_state given
        new_board = list(list(s) for s in board_state)
        new_board[row][column] = side
        return new_board

    def score_line(self, line, rows):
        # Method to score a line. Returns 1 if the player is about to win or
        # -1 if the CPU is about to win
        # @line - array of values to test
        # @ rows - the number of rows in the board.

        # Count the cpu moves in the given line.
        cpu_count = line.count(-1)

        # Count the player moves in the given line.
        player_count = line.count(1)

        # Get the desired moves value a given player has to be almost winning.
        desired_count = rows - 1

        if player_count == desired_count and cpu_count == 0:
            # If player (user) matches the desired count and cpu has not made any
            # move in this line, return 1. Player (user) is about to win the game.
            return 1
        elif cpu_count == desired_count and player_count == 0:
            # If cpu matches the desired count and the player (user) has not made any
            # move in this line, return -1. Cpu is about to win the game.
            return -1
        return 0

    def evaluate(self, board_state, rows):
        # Method to evaluate (score) a given board.
        # @board_state - game board.
        # @rows - number of board rows.

        # Initialize score to 0.
        score = 0

        # rows
        for x in range(rows):
            # Score each row.
            score += self.score_line(board_state[x], rows)

        # columns
        for y in range(rows):
            # Score each column.
            score += self.score_line([i[y] for i in board_state], rows)

        # diagonals
        # Score each diagonal.
        # Diagonal top/left to bottom/right.
        score += self.score_line([board_state[i][i] for i in range(rows)],
                                 rows)

        # Diagonal top/right to bottom/left.
        score += self.score_line(
            [board_state[rows - 1 - i][i] for i in range(rows)], rows)

        # Return the score.
        return score

    def min_max(self, board_state, side, max_depth, rows):
        # Perform minmax algorithm. This algorithm, and the methods it needs to,
        # work takes inspiration on the one used in "Deep Learning" book
        # from Packt Publishing.
        # "Deep Learning", Valentino Zocca et al, 2017, Packt Publishing.
        # @board_state - board game.
        # @side - +1 for player or -1 for cpu.
        # max_depth - steps after which the recursive function is stopped.
        # rows - the number of rows in the board.

        # Initialize best_score
        best_score = None

        # Initialize best_move
        best_move = None

        # Get a list of the available moves.
        moves = list(self.bl.moves_available(board_state))

        if not moves:
            # If there are no moves, return 0 score and list of None.
            return 0, [None, None]

        for move in moves:
            # Loop through each available move

            # Get a possible new board state, applying the given move.
            new_board_state = self.apply_move(board_state, move, side)

            # Check if there is a winner in this possible state.
            winner, _ = self.bl.game_won(new_board_state)
            if winner != 0:
                # If there is a winner, return a higher score and the move.
                return winner * 100, move
            else:
                # Run if there is no winner.
                if max_depth <= 1:
                    # If max_depth is reached, get the score of the current
                    # possible board
                    score = self.evaluate(new_board_state, rows)
                else:
                    # If max_depth is not reached, reapply min_max again.
                    score, _ = self.min_max(new_board_state, -side,
                                            max_depth - 1, rows)


                if side > 0:
                    # If side is 1 (player)
                    if best_score is None or score > best_score:
                        # If score obtained in this possible move is higher than
                        # the previous best score, make best_score equal to score
                        # and keep the move.
                        best_score = score
                        best_move = move
                else:
                    # If side is -1 (cpu)
                    if best_score is None or score < best_score:
                        # If score obtained in this possible move is lower than
                        # the previous best score, make best_score equal to score
                        # and keep the move.
                        best_score = score
                        best_move = move

        # Return best_score and best_move
        return best_score, best_move

    def random_move(self, board_state):
        # Method to select a random move from the list of available moves.
        # @board_state - current game board.

        # Get a list of available moves.
        moves = list(self.bl.moves_available(board_state))

        # Return a randomly selected move.
        return random.choice(moves)

    def make_move(self, board_state, type):
        # Method to return a move from cpu.
        # @board_state - current game board.
        # @type - can be "ai" (for minmax decision) or "random/other" - for a
        # random move.

        # Initialize move.
        move = None

        if type == "ai":
            # Check the number of rows.
            length = len(board_state)

            # Initialize variable max_depth
            max_depth = None

            # Decide the max_depth value, according to the number of rows in
            # the board. This value is important, because for 4 and 5 row games,
            # higher max_depth values have much better results, but much bigger
            # calculation times, making the game unplayable.

            if length == 3:
                max_depth = 5
            elif length == 3:
                max_depth = 5
            else:
                max_depth = 4

            # Get the best score and move from minmax decision.
            score, move = self.min_max(board_state, -1, max_depth, length)

        else:
            # Return a dictionary with the selected move.
            move = self.random_move(board_state)

        # Return a dictionary with the selected move.
        return {
            "row": move[0],
            "column": move[1]
        }
