"""This class holds the code to ai gameplay decision."""

import board_logic as bl

class Ai_agent():
    def __init__(self):
        pass

    def make_move(self, board, type):

        # TODO Verify board

        if type != "random" and type != "ai":
            type = "random"

        return 0
        # return move