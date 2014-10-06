# account_viewer.py
# Ken Goydan 7-18-14

# imports
import re
from time import time
from os import getcwd
from os import listdir 
from sys import platform
from os.path import join
from os.path import isfile
from stock import account_worth
from stock import get_stock_worth
from stock import get_asset_worth

# classes

'''
	Class to represent an account
'''
class Account:

	name = ''
	strategy = ''
	target = ''

	path = ''
	comments = ''
	capital = 0
	lastevent = 0
	baseline = 0
	starting = True
	stocks = {}
	records = []

	def __init__ ( self, name, path):

		self.name = name
		self.path = path

		f = open(path, 'r')
		
		regex = re.compile(r'[\n\r\t]')
		contents = f.read()
		regex.sub(' ', contents)
		args = contents.split('-')
		stats = args[1].split(';')

		self.comments = args[0]
		self.strategy = "".join(stats[0].split(':')[1].split())
		self.capital = float("".join(stats[1].split(':')[1].split()))
		self.target =  "".join(stats[2].split(':')[1].split())

		self.lastevent = time()
		
		sheets = args[3].split(';')
		for stock in sheets:
			if ( ':' in stock):
				name = "".join(stock.split())
				self.stocks[name.split(':')[0]] = float(name.split(':')[1])

		f.close()

	'''
		Log a price snapshot in our records
	'''
	def log ( snapshot ):
		records.append( snapshot )
		if (len (records) > self.max_record_length):
			records.pop(0)

	

# functions

'''
	Loads all the account files into a collection
	
	takes	void
	returns List<Account>
'''
def load_accounts ():
	print('\nloading accounts.')

	result = {}

	# accounts directory string
	path = ''
	if ('linux' in platform):
		path = getcwd() + '/accounts/'
	else:
		path = getcwd() + '\\accounts\\'
	# get names of all account files in accounts directory
	filenames = [ f for f in listdir(path) if isfile(join(path,f)) ]

	# build accounts list from file
	for filename in filenames:
		name = filename.strip('.account')
		result[name] = Account( name, path + filename )

	print('accounts successfully loaded.')

	return result

'''
	Saves an account to a file

	takes	Account
	returns bool
'''
def save_account ( account ):
	f = open(account.path, 'w')

	f.write (account.comments)

	f.write ("-\n")
	f.write ("STRATEGY: " + account.strategy + ";\n")
	f.write ("CAPITAL: " + str(account.capital) + ";\n")
	f.write ("TARGET: " + account.target + ";\n")
	f.write ("-\n")

	f.write ("\n")
	f.write ("#stocks\n")
	f.write ("\n")

	f.write ("-\n")
	for stock in account.stocks:
		f.write(stock + ': ' + str(account.stocks[stock]))
	f.write ("\n-")

'''
	Sets the target stock for an account

	takes	Account, string
	returns void
'''
def set_target (account, target):
	account.target = target
	
'''
	Prints all accounts and their indexes

	takes	Dictionary<String, Account>
	returns void
'''
def list_accounts (accounts):
	count = 0
	for account in accounts:
		print (str(count) + ') ' + account)
		count += 1

'''
	Poller thread that will forever poll our account strategies

	takes	Dictionary<String, Account>
	returns	void
'''
def poller ( accounts ):
	while True:
		for account in accounts:
			accounts[account].poll(accounts[account])
		sleep(1)

'''
	Prints all the available commands and their descriptions

	takes	void
	returns	void
'''
def print_help ():
	print ("List of commands and shortcuts")
	print ('')
	print ('    "use *" - where * is an account name')
	print ('        makes * the active account')
	print ('    "help" - h,?')
	print ('        display available commands')
	print ('    "quit", "exit" - q')
	print ('        exit, joins strategy thread')
	print ('    "start" - s')
	print ('        starts the strategy thread')
	print ('    "worth" - w')
	print ('        display entire worth of an account')
	print ('    "capital" - c')
	print ('        see available capital in an account')
	print ('    "accounts" - a')
	print ('        show loaded accounts')
	print ('')
	print ('email: kgoydan@udel.edu')


'''
	Script entry point
'''
def main ():
	# load account file(s)
	accounts = load_accounts()

	current = None
	print('')
	print ('Enter "help" for help.')
	while True:
		
		print('')
		input = raw_input('>> ')
		print('')

		# print balance
		if ( input == 'accounts' or input == 'a' ):
			list_accounts(accounts)
		elif ( input.startswith('buy') ):
			if current != None:
				input = input.strip('buy ')
				params = input.split(' ')
				if (params[1] == 'all'):
					buy (current, params[0], -1)
				else:
					buy (current, params[0], int(params[1]))
			else:
				print('select an account with "use acconut_name".')
		elif ( input.startswith('target') ):
			if current != None:
				input = input.strip('target ')
				set_target(current, input)
			else:
				print('select an account with "use acconut_name".')
		elif ( input.startswith('sell') ):
			if current != None:
				input = input.strip('sell ')
				params = input.split(' ')
				if (params[1] == 'all'):
					sell (current, params[0], -1)
				else:
					sell (current, params[0], int(params[1]))
			else:
				print('select an account with "use acconut_name".')
		elif ( input.startswith('use') ):
			current = accounts[input.strip('use ')]
			print('Now using ' + current.name)
		elif ( input == 'worth' or input == 'w'):
			if current != None:				
				print('\nTotal account value: $' + str(account_worth(current)))
			else:
				print('select an account with "use acconut_name".')
		elif ( input == 'start' ):
			if not thread.isAlive():
				thread.start()
			else:
				print('thread already running.')
		elif ( input == 'capital' or input == 'c'):
			if current != None:
				print(current.capital)
			else:
				print('select an account with "use acconut_name".')
		elif ( input == 'help' or input == '?' or input =='h' ):
			print_help()
		elif ( input == 'save' or input == 's' ):
			save_account(current)
		elif ( input == 'quit' or input == 'exit' or input == 'q'):
			thread.join()
			sys.exit(0)

if __name__ == '__main__':
    main()