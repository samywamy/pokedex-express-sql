const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const config = {
	user: 'samywamy',
	host: '127.0.0.1',
	database: 'pokemons',
	port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
	console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, response) => {
	// query database for all pokemon

	// respond with HTML page displaying all pokemon
	//
	let queryString = 'SELECT * from pokemon'

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
		} else {
			console.log('query result:', result);

			// redirect to home page
			// response.send( result.rows );
			response.render('Home', {pokemon: result.rows} );
		}
	});

});


app.get('/pokemon/new', (request, response) => {
	// respond with HTML page with form to create new pokemon
	response.render('New');
});


app.get('/pokemon/:id', (request, response) => {
	let id = request.params.id;
	let queryString = 'SELECT * from pokemon WHERE id =' + id;

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);

        } else if (result.rows.length == 0) {
        	response.render('NotFound');

		} else {
			console.log('query result:', result);
			response.render('Pokemon', {pokemon: result.rows[0]} );
		}	
	});		
});



app.post('/', (request, response) => {
	let params = request.body;

	let queryString = 'INSERT INTO pokemon (id, num, name, img, weight, height) VALUES ($1, $2, $3, $4, $5, $6)';
	let values = [params.id, params.num, params.name, params.img, params.weight, params.height];

	pool.query(queryString, values, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('query result:', result);

			// redirect to home page
			response.redirect('/');
		}
	});
});


app.get('/pokemon/:id/edit', (request, response) => {
	let id = request.params.id;
	let queryString = 'SELECT * from pokemon WHERE id =' + id;

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);

        } else if (result.rows.length == 0) {
        	response.render('NotFound');

		} else {
			console.log('query result:', result);
			response.render('Edit', {pokemon: result.rows[0]} );
		}	
	});		 
});


app.put('/pokemon/:id', (request, response) => {
	let id = request.params.id;
	let newPoke = request.body;
	let queryString = 'UPDATE pokemon SET num = $1, name = $2, img = $3, weight = $4, height = $5 WHERE id = $6';
	let values = [ newPoke.num, newPoke.name, newPoke.img, newPoke.weight, newPoke.height, id ];

	pool.query(queryString, values, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			
		} else {
			console.log('query result:', result);
			response.redirect('/pokemon/' + id);
		}	
	});		 
});


app.delete('/pokemon/:id', (request, response) => {
	let id = request.params.id;
	let queryString = 'DELETE FROM pokemon WHERE id = $1';
	let values = [ id ];

	pool.query(queryString, values, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			
		} else {
			console.log('query result:', result);
			response.redirect('/');
		}	
	});
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
