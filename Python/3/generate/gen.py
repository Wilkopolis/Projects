import math

def frange(x, y, jump):
  while x < y:
    yield x
    x += jump

def main ():
	f = open("results.csv", 'w')

	for i in frange(0, 20 * math.pi, .1):
		f.write (str(math.sin(i**1.05)))
		f.write ("\n")

	f.close()

if __name__ == '__main__':
    main()