import machine
import time

class Linky:
	def __init__(self, pin, unit = False):
		self.unit = unit
		self.data = {
        'HCHC':   [6,'Wh','', False], # indexe heure creuses (Wh)
        'HCHP':   [6,'Wh','', False], # indexe heures pleines (Wh)
        'BASE':   [6,'Wh','', False], # indexe base (Wh)
        'PAPP':   [5,'W','', False],  # puissance apparante (W)
        'ISOUSC': [2,'A','', False],  # intensitée souscrite (A)
        'PTEC':   [2,'','', False],   # période tarrifaire en cours
        'OPTARIF':[4,'','', False],   # option tarrifaire
		}
		self.uart = machine.UART(1)
		self.uart.init(baudrate=1200, bits=7, parity=0, stop=1, rx=pin)
		         
	def __is_data_updated(self):
		for index in self.data:
			if self.data[index][3] == False:
				return False
		return True
     			
	def update_values(self):
		retry = 0
     	     	
		for index in self.data:
			self.data[index][3] = False
			     		
		while not self.__is_data_updated() and retry < 20:
			buff = self.uart.read(128)
			
			if buff:
				for index in self.data:
					start = buff.find(b'\n'+index)
					data_start = start+len(index)+2
					data_end = data_start + self.data[index][0]
					if start >= 0 and data_end < len(buff):
						self.data[index][2] = buff[data_start : data_end].decode()
						self.data[index][3] = True
			retry+=1
     		
	def get_data(self, index):
		self.update_values()
		if index:
			if self.unit:
				return self.data[index][2]+" "+self.data[index][1]
			else:
				return self.data[index][2]
		else:
			d = {}
			for index in self.data:
				d[index] = [self.data[index][2], self.data[index][1]]
			return d

