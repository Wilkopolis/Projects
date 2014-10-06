# trader1.py
# Ken Goydan 7-20-14

# imports
import datetime
from time import time
from stock import buy
from stock import sell
from stock import account_worth
from stock import get_stock_worth
from stock import get_asset_worth
from random import choice

'''
Buy all I can of stock x,
wait period,
sell all stock,
wait period.
'''
def flip ( self ):
	stock = self.target
	if self.lastevent + self.period <= time():
		self.lastevent = time()
		if (self.capital > get_stock_worth(self.target)):
			buy (self, stock, 'all')
			print (datetime.datetime.fromtimestamp(time()).strftime('%H:%M:%S') + ') ' + self.name + ': buying all ' + self.target + ' - $' + str(account_worth(self)))
			return True
		else:
			sell (self, stock, 'all')
			print (datetime.datetime.fromtimestamp(time()).strftime('%H:%M:%S') + ') ' + self.name + ': selling all ' + self.target + ' - $' + str(account_worth(self)))
			return True
	return False

'''
Monitor always,
when low: buy,
when high: sell.
'''
def dynamic_exchange ( self ):
	if self.lastevent + self.period <= time():
		self.lastevent = time()
		#if its our first time running
		# put 50% of capital in stock
		if (self.starting):
			self.baseline = get_stock_worth(stock)
			self.starting = False
		stock = self.target
		if (get_asset_worth (self) == 0):
			buy (self, stock, '50%')
		else:
			self.log ( get_stock_worth ( stock ) )

# when price is high, lower % of capital in stock
# when price is low, increase % of capital in stock