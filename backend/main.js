const {Client} = require('pg');
const express=require('express');

const app=express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const conn = new Client({
    host: "localhost",
    user: "kimnahyun",
    port: 5432,
    password: "5178",
    database: "detroit_crime_db"
})

// connecting to database ^

conn.connect()
  .then(() => {
    console.log('Database connected');

    app.listen(5000, '127.0.0.1', () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:');
    console.error(err.message);
  });

app.post('/postData', (req, res) => {

    const {incident_entry_id, case_id, crime_id, report_number, offense_type_id} = req.body
    
    const insert_query = `INSERT INTO crime_incidents (incident_entry_id, case_id, crime_id, report_number, offense_type_id) VALUES ($1, $2, $3, $4, $5)`

    conn.query(insert_query, [incident_entry_id, case_id, crime_id, report_number, offense_type_id],(err, result) => {
        if(err){
            res.send(err)
        } else {
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})


//practicing how to post data to database using node and express ^

app.get('/fetchData',(req,res)=>{

    const fetch_query="Select * from crime_incidents limit 10"
    conn.query(fetch_query,(err,result)=>{
        if(err){
            res.send(err)
        } else {
            console.log(result)
            res.send(result.rows)
        }
    })
})

//practicing how to fetch data from database using node and express ^

app.get('/searchData', (req, res) => {
    const { incident_entry_id, case_id, offense_type_id, location_id } = req.query;

    let search_query = 'SELECT * FROM crime_incidents WHERE 1=1';
    let values = [];
    let count = 1;

    if (incident_entry_id) {
        search_query += ` AND incident_entry_id = $${count}`;
        values.push(incident_entry_id);
        count++;
    }

    if (case_id) {
        search_query += ` AND case_id = $${count}`;
        values.push(case_id);
        count++;
    }

    if (offense_type_id) {
        search_query += ` AND offense_type_id = $${count}`;
        values.push(offense_type_id);
        count++;
    }

    if (location_id) {
        search_query += ` AND location_id = $${count}`;
        values.push(location_id);
        count++;
    }

    conn.query(search_query, values, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result.rows);
        }
    });
});

//setting up search functionality for the crime incidents table, allowing users to filter results based on various criteria such as incident entry ID, case ID, offense type ID, and location ID.