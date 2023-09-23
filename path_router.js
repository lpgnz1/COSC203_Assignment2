const express = require('express');
const pool = require('./db');
router = express.Router();

router.get('/', async (req, res) => {
    res.redirect('/birds')
});

router.get('/birds', async (req, res) => {
    conservation_status_data = []

    /* conservation status from mysql */
    const db = pool.promise();
    const status_query = `SELECT * FROM ConservationStatus;`
    try {
        const [rows, fields] = await db.query(status_query);
        conservation_status_data = rows;
    } catch (err) {
        console.error("You havent set up the database yet!");
    }
    
    /* REPLACE THE .json WITH A MYSQL DATABASE */
    birds = [];
    const birds_query = `SELECT * FROM Bird
                         INNER JOIN Photos 
                            ON Bird.bird_id = Photos.bird_id
                         INNER JOIN ConservationStatus
                            ON Bird.status_id = ConservationStatus.status_id;`
    try {
        const [rows, fields] = await db.query(birds_query);
        birds = rows;
    } catch (err) {
        console.error("Hole up, them birds be fuggin");
    }
    
    /* bind data to the view (index.ejs) */
    res.render('index', { title: 'Birds of Aotearoa', birds: birds, status: conservation_status_data });
});


router.get('/birds/create', async (req, res) => {
    conservation_status_data = []

    /* conservation status from mysql */
    const db = pool.promise();
    const status_query = `SELECT * FROM ConservationStatus;`
    try {
        const [rows, fields] = await db.query(status_query);
        conservation_status_data = rows;
    } catch (err) {
        console.error("You havent set up the database yet!");
    }
    bird = []
    /* bind data to the view (create.ejs) */
    res.render('create', { title: 'Birds of Aotearoa', status: conservation_status_data, bird: bird});
});

router.get('/birds/:id', async (req, res) => {
    conservation_status_data = []

    /* conservation status from mysql */
    const db = pool.promise();
    const status_query = `SELECT * FROM ConservationStatus;`
    try {
        const [rows, fields] = await db.query(status_query);
        conservation_status_data = rows;
    } catch (err) {
        console.error("You havent set up the database yet!");
    }
    
    bird = []
    const id = req.params.id;
    bird_select_query = `SELECT * FROM Bird
                         INNER JOIN Photos 
                            ON Bird.bird_id = Photos.bird_id
                         INNER JOIN ConservationStatus
                            ON Bird.status_id = ConservationStatus.status_id
                         WHERE Bird.bird_id = ${id};`

    try {
        const [rows, fields] = await db.query(bird_select_query);
        bird = rows;
    } catch (err) {
        console.error("Hole up, them birds be fuggin");
    }

    /* bind data to the view (index.ejs) but only one bird */
    res.render('index', { title: 'Birds of Aotearoa', birds: bird, status: conservation_status_data});
});


router.get('/birds/:id/update', async (req, res) => {
    conservation_status_data = []

    /* conservation status from mysql */
    const db = pool.promise();
    const status_query = `SELECT * FROM ConservationStatus;`
    try {
        const [rows, fields] = await db.query(status_query);
        conservation_status_data = rows;
    } catch (err) {
        console.error("You havent set up the database yet!");
    }
    
    bird = []
    const id = req.params.id;
    bird_select_query = `SELECT * FROM Bird
                         INNER JOIN Photos 
                            ON Bird.bird_id = Photos.bird_id
                         INNER JOIN ConservationStatus
                            ON Bird.status_id = ConservationStatus.status_id
                         WHERE Bird.bird_id = ${id};`

    try {
        const [rows, fields] = await db.query(bird_select_query);
        bird = rows;
    } catch (err) {
        console.error("Hole up, them birds be fuggin");
    }
    /* bind data to the view (update.ejs) */
    res.render('update', { title: 'Birds of Aotearoa', status: conservation_status_data, bird: bird});
});

router.get('/birds/:id/delete', async (req, res) => {
    const db = pool.promise();
    const bird_id = req.params.id;
    const delete_query = `DELETE FROM Photos WHERE Photos.bird_id=${bird_id};
                          DELETE FROM Bird WHERE Bird.bird_id=${bird_id};`
    await db.query(delete_query);

    res.redirect('/');
});


module.exports = router;