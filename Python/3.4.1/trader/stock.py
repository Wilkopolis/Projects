
import re
import urllib2

'''
	Get value of a stock

	takes 	string
	returns float
'''
def get_stock_worth (stock):
	url = 'http://download.finance.yahoo.com/d/quotes.csv?s=%40%5EDJI,' + stock + '&f=nsl1op&e=.csv'	
	response = urllib2.urlopen(url).read()
	strings = response.split(',')
	regex = re.compile(r'\d{1,}\.\d*')
	for string in strings:
		if (re.match(regex,string) != None):
			return float(string)

'''
	Calculate and print the value of an account
	takes	Account
	returns void
'''
def account_worth ( account ):
	sum = account.capital + get_asset_worth(account)
	return sum

'''
	Calculate and print the value of an account's stocks
	takes	Account
	returns void
'''
def get_asset_worth ( account ):	
	sum = 0
	for stock in account.stocks:
		price = get_stock_worth(stock)
		shares = account.stocks[stock]
		worth = price * shares
		sum += worth
	return round(sum, 2)

'''
	Buy the given amount of a stock and return if successful or not

	takes 	Account, string, (string, int)
	returns bool
'''
def buy (account, stock, amount):
	#buy it all
	if (amount == 'all'):
		cost = get_stock_worth(stock)
		if (account.capital >= cost):
			shares = account.capital // cost
			account.capital = round(account.capital - shares * cost, 2)
			if (stock in account.stocks):
				account.stocks[stock] += shares
			else:
				account.stocks[stock] = shares				
			return True
	elif ('%' in amount):
		percent = float(amount.strip('%'))
		limit = percent * account.capital
		cost = get_stock_worth(stock)
		if (limit >= cost):
			shares = limit // cost
			account.capital = round(account.capital - shares * cost, 2)
			if (stock in account.stocks):
				account.stocks[stock] += shares
			else:
				account.stocks[stock] = shares
	return False;

'''
	Sell the given amount of a stock and return if successful or not

	takes 	Account, string, (string, int)
	returns bool
'''
def sell (account, stock, amount):
	if (amount == 'all'):
		cost = get_stock_worth(stock)
		if (stock in account.stocks):
			if (account.stocks[stock] > 0):
				shares = account.stocks[stock]
				account.capital = round(account.capital + shares * cost, 2)
				account.stocks[stock] = 0
				return True	
	return False