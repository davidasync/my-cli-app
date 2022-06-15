const HotelDiscovery = require('./hotel-discovery');
const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');

jest.mock('fs')

const mockHotels = [
  { HotelID: 1, Name: 'Hotel Indonesia', AvailableRooms: 500 },
  { HotelID: 3, Name: 'Hotel Aston', AvailableRooms: 450 },
  { HotelID: 8, Name: 'Hotel Rancamaya', AvailableRooms: 400 },
  { HotelID: 9, Name: 'Hotel Palace', AvailableRooms: 300 },
  { HotelID: 2, Name: 'Hotel Gumilang', AvailableRooms: 200 },
  { HotelID: 7, Name: 'Hotel Parama', AvailableRooms: 200 },
  { HotelID: 4, Name: 'Hotel Safari', AvailableRooms: 150 },
  { HotelID: 6, Name: 'Hotel Amarsya', AvailableRooms: 150 }
]

test('getSortedHotels, should return data with correct sort direction', () => {
  const hotelDiscovery = new HotelDiscovery(0, 2, 'desc');
  fs.readFileSync.mockReturnValue(JSON.stringify(mockHotels))
  const result = hotelDiscovery.getSortedHotels()

  expect(result).toEqual(mockHotels.sort((a, b) => b.AvailableRooms - a.AvailableRooms))
});

test('getSortedHotels, should return data with correct sort direction', () => {
  const hotelDiscovery = new HotelDiscovery(0, 2, 'asc')
  const result = hotelDiscovery.getSortedHotels()

  expect(result).toEqual(mockHotels.sort((a, b) => a.AvailableRooms - b.AvailableRooms))
});

test('findFirstIndex, should return 0 if the parameter START is 0', () => {
  const hotelDiscovery = new HotelDiscovery(0, 2, 'asc')
  const result = hotelDiscovery.findfirstIndex(mockHotels)

  expect(result).toEqual(0)
});

test('findFirstIndex, should return correct initial index with asc order', () => {
  const hotelDiscovery = new HotelDiscovery(200, 2, 'asc')
  const result = hotelDiscovery.findfirstIndex(mockHotels.sort((a, b) => a.AvailableRooms - b.AvailableRooms))

  expect(result).toBe(4)
});

test('findFirstIndex, should return correct initial index with desc order', () => {
  const hotelDiscovery = new HotelDiscovery(200, 2, 'desc')
  const result = hotelDiscovery.findfirstIndex(mockHotels.sort((a, b) => b.AvailableRooms - a.AvailableRooms))

  expect(result).toBe(6)
});

test('getHotels, should return correct hotels with given criteria desc order', () => {
  const hotelDiscovery = new HotelDiscovery(0, 2, 'desc');
  fs.readFileSync.mockReturnValue(JSON.stringify(mockHotels))
  const result = hotelDiscovery.getHotels()
  
  expect(result).toEqual([
    { HotelID: 1, Name: 'Hotel Indonesia', AvailableRooms: 500 },
    { HotelID: 3, Name: 'Hotel Aston', AvailableRooms: 450 }
  ])
})

test('getHotels, should return correct desc hotel if the sort dir is unknown', () => {
  const hotelDiscovery = new HotelDiscovery(0, 2, 'foo');
  fs.readFileSync.mockReturnValue(JSON.stringify(mockHotels))
  const result = hotelDiscovery.getHotels()
  
  expect(result).toEqual([
    { HotelID: 1, Name: 'Hotel Indonesia', AvailableRooms: 500 },
    { HotelID: 3, Name: 'Hotel Aston', AvailableRooms: 450 }
  ])
})

test('getHotels, should return correct hotels with given criteria asc order', () => {
  const hotelDiscovery = new HotelDiscovery(0, 2, 'asc');
  fs.readFileSync.mockReturnValue(JSON.stringify(mockHotels))
  const result = hotelDiscovery.getHotels()
  
  expect(result).toEqual([
    { HotelID: 4, Name: 'Hotel Safari', AvailableRooms: 150 },
    { HotelID: 6, Name: 'Hotel Amarsya', AvailableRooms: 150 },
  ])
})

test('getHotels, should return empty hotels if token is not found', () => {
  const hotelDiscovery = new HotelDiscovery(99, 2, 'desc');
  fs.readFileSync.mockReturnValue(JSON.stringify(mockHotels))
  const result = hotelDiscovery.getHotels()
  
  expect(result).toEqual([])
})

test('getHotels, should return all hotels if limit > hotels.length', () => {
  const hotelDiscovery = new HotelDiscovery(0, 9999, 'desc');
  fs.readFileSync.mockReturnValue(JSON.stringify(mockHotels))
  const result = hotelDiscovery.getHotels()
  
  expect(result.length).toEqual(mockHotels.length)
})
