"""This class holds the code to ai gameplay decision."""

import board_logic
import random
import sys


class Ai_agent():
    bl = board_logic.Board_logic()

    def __init__(self):
        pass

    def apply_move(self, board_state, move, side):
        move_x, move_y = move
        state_list = list(list(s) for s in board_state)
        state_list[move_x][move_y] = side
        return tuple(tuple(s) for s in state_list)

    def score_line(self, line, rows):
        minus_count = line.count(-1)
        plus_count = line.count(1)
        desired_count = rows - 1

        if plus_count == desired_count and minus_count == 0:
            return 1
        elif minus_count == desired_count and plus_count == 0:
            return -1
        return 0


    def evaluate(self, board_state, rows):
        score = 0
        length = len(board_state)

        # rows
        for x in range(length):
            score += self.score_line(board_state[x], rows)

        # columns
        for y in range(length):
            score += self.score_line([i[y] for i in board_state], rows)

        # diagonals
        score += self.score_line([board_state[i][i] for i in range(length)], rows)
        score += self.score_line([board_state[length - 1 - i][i] for i in range(length)], rows)

        return score


    def min_max(self, board_state, side, max_depth, rows):
        best_score = None
        best_score_move = None

        moves = list(self.bl.moves_available(board_state))
        if not moves:
            return 0, None

        for move in moves:
            new_board_state = self.apply_move(board_state, move, side)
            winner, _ = self.bl.game_won(new_board_state)
            if winner != 0:
                return winner * 100, move
            else:
                if max_depth <= 1:
                    score = self.evaluate(new_board_state, rows)
                else:
                    score, _ = self.min_max(new_board_state, -side, max_depth - 1, rows)

                if side > 0:
                    if best_score is None or score > best_score:
                        best_score = score
                        best_score_move = move
                else:
                    if best_score is None or score < best_score:
                        best_score = score
                        best_score_move = move
                        # print "min_max side: %s, max_depth: %s, move: %s, score: %s" % (side, max_depth, best_score_move, best_score)

        return best_score, best_score_move

    def random_move(self, board_state):
        moves = list(self.bl.moves_available(board_state))
        move = random.choice(moves)
        return {
            'row': move[0],
            'column': move[1]
        }

    def make_move(self, board_state, type):
        if type == "ai":
            length = len(board_state)
            max_depth = None
            if length == 3:
                max_depth = 5
            elif length == 3:
                max_depth = 5
            else:
                max_depth = 4

            best_score, best_score_move = self.min_max(board_state, -1, max_depth, length)
            return {
                "row": best_score_move[0],
                "column": best_score_move[1],
                "best_score": best_score
            }
        else:
            return self.random_move(board_state)
