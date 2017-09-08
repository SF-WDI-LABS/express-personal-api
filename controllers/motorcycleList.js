/***********
* DATABASE *
************/
var db = require('../models');

/* hard-coded data */
var motorcycleLists = [];

motorcycleLists.push({
              _id: 132,
              make: 'BMW',
              model: 'S1000RR',
              image: '/images/s1000rr.jpg',
              releaseDate: '2009 to current',
              weight: '403 lbs',
              maxPower: '199 hp at 13,500 rpm',
              maxTorque: '83 lb.-ft. at 10,500 rpm',
              engineDisplacement: '999 cc'
});
motorcycleLists.push({
              _id: 133,
              make: 'Honda',
              model: 'CBR1000RR',
              image: '/images/cbr1000rr.jpg',
              releaseDate: '2008 to current',
              weight: '439 lbs',
              maxPower: '153.4 hp at 10,700 rpm',
              maxTorque: '78.74 lb.-ft. at 9,400 rpm',
              engineDisplacement: '999 cc'
});
motorcycleLists.push({
              _id: 134,
              make: 'Triumph',
              model: 'Daytona 675R',
              image: '/images/675r.jpg',
              releaseDate: '2006 to current',
              weight: '363 lbs',
              maxPower: '104 hp at 13,500 rpm',
              maxTorque: '53 lb.-ft. at 10,500 rpm',
              engineDisplacement: '674 cc'
})
motorcycleLists.push({
              _id: 135,
              make: 'Suzuki',
              model: 'GSX-R 750',
              image: '/images/gsxr750.jpg',
              releaseDate: '2011 to current',
              weight: '418 lbs',
              maxPower: '148 hp at 12,800 rpm',
              maxTorque: '64 lb.-ft. at 11,200 rpm',
              engineDisplacement: '749 cc'
});

// GET /api/albums
function index(req, res) {
 // send back all albums as JSON

    res.json(motorcycleLists);

}

// POST /api/albums
function create(req, res) {
 // create an album based on request body and send it back as JSON
}

// GET /api/albums/:albumId
function show(req, res) {
 // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
 // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
 // find one album by id, update it based on request body,
 // and send it back as JSON
}


// export public methods here
module.exports = {
 index: index,
 create: create,
 show: show,
 destroy: destroy,
 update: update
};
