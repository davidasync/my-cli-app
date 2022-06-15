Command line application with single functionality: given 3 inputs params (start,
limit, sort), return list of hotels with token/cursor-based pagination by number of
available rooms. Input params description:

- `start` - mandatory: (or also we can call it token) is based on number of available rooms.
For the first request, we can set start = 0. Then for the subsequent requests, start is set
based on available rooms number of the last element of previous hotel list response.
- `limit` - mandatory: how many hotel will be retrieved
- `sort` - optional: asc or desc based on number of available rooms. Default: desc

### Prerequisites
- docker 
- or node version 8 >= 8 and yarn / npm

### How to run the app
# With docker
- `docker build . -t my-cli-app`
- `docker run my-cli-app <START> <LIMIT> <SORT DIR>` e.g. `docker run my-cli-app 450 2 desc`

# With nodejs runtime
- `yarn install or npm install`
- `node index.js <START> <LIMIT> <SORT DIR>` e.g `node index.js 450 2 desc`

### How to run unit test
- npm test <find the coverage result at folder that named `coverage`>
