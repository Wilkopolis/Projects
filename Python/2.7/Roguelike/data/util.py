import random

class MapVectorSet(list):

    def __init__(self, entries):
        for entry in entries:
            self.add(entry)

    def add(self, entry):
        for item in self:
            if (entry == item):
                return false
        self.append(entry)

    def pop_weighted(self):
        sum = 0;
        for i in range(0, len(self)):
            sum += self[i].frequency

        seed = random.randint(0, len(self) - 1)
        step = 0
        for i in range(0, len(self)):
            step += self[i].frequency
            if seed < step:
                result = self[i:i+1]
                del self[i:i+1]
                return result

    def update(self):
        for i in range(0, len(self)):
            pos = this[i]
            pos.frequency = 5
            if pos.y - 1 >= 0 and minimap[pos.y - 1][pos.x].hash == 0:
                pos.frequency *= ADJACENT_ROOM_MULTIPLIER
            if pos.y + 1 < minimap.length and minimap[pos.y + 1][pos.x].hash == 0:
                pos.frequency *= ADJACENT_ROOM_MULTIPLIER
            if pos.x - 1 >= 0 and minimap[pos.y][pos.x - 1].hash == 0:
                pos.frequency *= ADJACENT_ROOM_MULTIPLIER
            if pos.x + 1 < minimap[pos.y].length and minimap[pos.y][pos.x + 1].hash == 0:
                pos.frequency *= ADJACENT_ROOM_MULTIPLIER

class Vector(object):
    x = 0
    y = 0
    frequency = 1

    def __init__(self, x, y):
        self.x = x
        self.y = y
