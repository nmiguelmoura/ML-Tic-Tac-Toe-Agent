import unittest
from prefabs import board_logic

b = board_logic.Board_logic()


class Test_game(unittest.TestCase):
    def test_new_board(self):
        self.assertEqual(b.get_new_board(),
                         [[0, 0, 0], [0, 0, 0], [0, 0, 0]])
        self.assertEqual(b.get_new_board(4),
                         [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
                          [0, 0, 0, 0]])

    def test_line_complete(self):
        self.assertEqual(b.line_complete([1, 1, 1]), True)
        self.assertEqual(b.line_complete([-1, -1, -1]), True)
        self.assertEqual(b.line_complete([1, 1, -1]), False)
        self.assertEqual(b.line_complete([1, 1, 1, 1, 1]), True)
        self.assertEqual(b.line_complete([0, 0, 0, 0]), False)
        self.assertEqual(b.line_complete([-1, 0, -1]), False)

    def test_game_won(self):
        self.assertEqual(b.game_won(b.get_new_board()), (0, {}))
        self.assertEqual(b.game_won([[-1, 0, -1], [1, 1, 1], [0, -1, 0]]),
                         (1, {'row': 1}))
        self.assertEqual(b.game_won([[-1, 0, 1], [-1, -1, 0], [-1, 1, 0]]),
                         (-1, {'column': 0}))
        self.assertEqual(b.game_won([[-1, 0, 1], [1, -1, 1], [0, -1, -1]]),
                         (-1, {'diagonal': 0}))
        self.assertEqual(b.game_won([[-1, 0, 1], [0, 1, 0], [1, 0, -1]]),
                         (1, {'diagonal': 1}))
        self.assertEqual(b.game_won(
            [[-1, 0, 1, 0], [0, 1, 0, 0], [1, 0, -1, 0], [0, 0, 0, 0]]),
            (0, {}))
        self.assertEqual(b.game_won(
            [[-1, 0, 1, 1], [0, 0, 1, 0], [0, 1, -1, 0], [1, 0, 0, 0]]),
            (1, {'diagonal': 1}))

    def test_moves_available(self):
        self.assertEqual(list(b.moves_available(b.get_new_board())),
                         [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2),
                          (2, 0), (2, 1), (2, 2)])
        self.assertEqual(
            list(b.moves_available([[-1, 0, -1], [1, 1, 1], [0, -1, 0]])),
            [(0, 1), (2, 0), (2, 2)])

    def test_check_game_status(self):
        self.assertEqual(b.check_game_status(b.get_new_board()),
                         {'winner': 0, 'moves_available': 9, 'game_over': False, 'info': {}})
        self.assertNotEqual(b.check_game_status(b.get_new_board()),
                            {'winner': 0, 'moves_available': 9,
                             'game_over': True, 'info': {}})
        self.assertEqual(
            b.check_game_status([[-1, 0, -1], [1, 1, 1], [0, -1, 0]]),
            {'winner': 1, 'moves_available': 3, 'info': {'row': 1},
             'game_over': True})


if __name__ == '__main__':
    unittest.main()
