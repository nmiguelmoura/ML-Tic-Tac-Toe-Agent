# Tic-tac-toe game with Machine learning based decision

This HTML5 game was built using Python on back-end and PIXI.js on front-end. Users can play tic-tac-toe game agains cpu, selecting 3x3, 4x4 or 5x5 games. The difficulty can be selected:
- **easy** (cpu makes random choices)
- **hard** (cpu makes decisions using minmax algorithm).

## Run code
The project is configured to run in a Virtualbox VM with Ubuntu, using Vagrant. All the necessary tools, like python and flask are already installed in the VM.

To run the code:
- Install [Virtualbox](https://www.virtualbox.org/);

- Install [Vagrant](https://www.vagrantup.com/);

- Fork and clone this repository to your system.

- Through command line, navigate to the project folder and run the code:
`$ vagrant up`

- After that, run:
`$ vagrant ssh`

- Navigate to shared folder vagrant:
`$ cd /vagrant`

- Navigate to folder www:
`$ cd /www`

- Run the file project.py:
`$ python project.py`

- Test in your browser in port 5000:
`localhost:5000/`

## Bibliography
The implementation of min-max algorithm and the supporting methods takes inspiration on the one used in the book *Deep Learning*, Valentino Zocca *et al*, 2017, Packt Publishing.