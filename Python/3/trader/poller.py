# poller.py
# Ken Goydan 7-28-14
import datetime
from time import time
from time import sleep
from strategies import flip
from trader import save_account
from trader import load_accounts
from strategies import dynamic_exchange

'''
	Make a strategy object given an account

	takes	Account
	returns	Strategy
'''
def build_strat ( account ):
	args = account.strategy.split(',')
	if (args[0] == 'flip'):
		account.period = int(args[1])
		account.poll = flip
		return True
	elif (args[0] == 'dynamic_exchange'):
		account.period = int(args[1])
		account.max_record_length = int(args[2])
		account.starting = True
		account.poll = dynamic_exchange		
	else:
		print ('could not recognize strategy name')
	return False

def build_strats ( accounts ):
	for account in accounts:
		build_strat( accounts[account] )

'''
	Make munney
'''
def main ():
	# load account file(s)
	accounts = load_accounts()
	# build all the accounts' strategies
	build_strats( accounts )
	
	print (datetime.datetime.fromtimestamp(time()).strftime('%H:%M:%S') + ') ' + "now trading...")

	while True:
		for account in accounts:
			if accounts[account].poll(accounts[account]):
				save_account (accounts[account])
		sleep(1)

if __name__ == '__main__':
    main()