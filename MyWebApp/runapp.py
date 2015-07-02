from MyWebApp import app, prepare
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-d', '--debug', help='Enable debug mode.', action="store_true")
args = parser.parse_args()

if __name__ == "__main__":
	if args.debug:
		print('Debug mode enabled.')
		app.config['DEBUG'] = True
	else:
		app.config['DEBUG'] = False
	prepare()
	app.run()
