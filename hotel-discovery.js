const fs = require('fs');

const SORT_DIRECTION = {
  desc: 'desc',
  asc: 'asc',
}

class HotelDiscovery {
  constructor(start, limit, sort) {
    this.start = start;
    this.sort = SORT_DIRECTION[sort]  || SORT_DIRECTION.desc;
    this.limit = limit;
  }

  getSortedHotels() {
    const readFileResult = fs.readFileSync('./data.json', 'utf-8')
    const jsonData = JSON.parse(readFileResult)

    if (this.sort === SORT_DIRECTION.asc) {
      return jsonData.sort((a, b) => a.AvailableRooms - b.AvailableRooms)
    } else {
      return jsonData.sort((a, b) => b.AvailableRooms - a.AvailableRooms)
    }
  }

  findfirstIndex(sortedData) {
    if (this.start === 0) {
      return 0;
    }

    let start = 0;

    for (start=0; start<sortedData.length; start++) {
      if (sortedData[start].AvailableRooms < this.start && this.sort === SORT_DIRECTION.desc) {
        break;
      }

      if (sortedData[start].AvailableRooms > this.start && this.sort === SORT_DIRECTION.asc) {
        break;
      }
    }

    return start;
  }

  getHotels() {
    const sortedData = this.getSortedHotels();
    const result = [];

    let start = this.findfirstIndex(sortedData);
    this.limit = this.limit > sortedData.length ? sortedData.length : this.limit;

    for (let i=start; i<this.limit+start; i++) {
      result.push(sortedData[i])
    }

    return result;
  }
}

module.exports = HotelDiscovery;