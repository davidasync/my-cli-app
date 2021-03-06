const HotelDiscovery = require('./hotel-discovery');

const START = process.argv[2];
const LIMIT = process.argv[3];
const SORT = process.argv[4];

if (!START || !LIMIT) {
  console.error('START & LIMIT are required')
} {
  const hotelDiscovery = new HotelDiscovery(Number(START), Number(LIMIT), SORT);
  console.log(hotelDiscovery.getHotels())
}
