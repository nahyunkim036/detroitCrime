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
    const {
        incident_entry_id,
        case_id,
        crime_id,
        report_number,
        offense_type_id,
        location_id,
        status_id,
        scout_car_area,
        police_precinct,
        incident_occurred_at,
        incident_time,
        incident_year,
        incident_hour_of_day,
        incident_day_of_week
    } = req.body;

    const insert_query = `
        INSERT INTO crime_incidents (
            incident_entry_id,
            case_id,
            crime_id,
            report_number,
            offense_type_id,
            location_id,
            status_id,
            scout_car_area,
            police_precinct,
            incident_occurred_at,
            incident_time,
            incident_year,
            incident_hour_of_day,
            incident_day_of_week
        ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14
        )
    `;

    conn.query(
        insert_query,
        [
            incident_entry_id,
            case_id,
            crime_id,
            report_number,
            offense_type_id,
            location_id,
            status_id,
            scout_car_area,
            police_precinct,
            incident_occurred_at,
            incident_time,
            incident_year,
            incident_hour_of_day,
            incident_day_of_week
        ],
        (err, result) => {
            if (err) {
                console.error("postData error:", err);
                res.status(500).json({
                    message: "Failed to add record",
                    error: err.message
                });
            } else {
                console.log(result);
                res.status(201).json({
                    message: "Incident added successfully"
                });
            }
        }
    );
});


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

//practicing how to fetch data to database using node and express ^

app.get('/searchData', (req, res) => {
    const { incident_entry_id, case_id, offense_type_id, location_id } = req.query;

    let search_query = `
        SELECT
            ci.incident_entry_id,
            ci.case_id,
            ci.crime_id,
            ci.report_number,
            ci.offense_type_id,
            ci.location_id,
            ci.status_id,
            ci.police_precinct,
            ci.incident_occurred_at,
            ci.incident_time,
            ot.offense_category,
            ot.offense_description,
            cs.case_status,
            l.neighborhood,
            l.nearest_intersection
        FROM crime_incidents ci
        LEFT JOIN offense_types ot
            ON ci.offense_type_id = ot.offense_type_id
        LEFT JOIN case_statuses cs
            ON ci.status_id = cs.status_id
        LEFT JOIN locations l
            ON ci.location_id = l.location_id
        WHERE 1=1
    `;
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

    search_query += ` ORDER BY ci.incident_occurred_at DESC NULLS LAST`;

    conn.query(search_query, values, (err, result) => {
        if (err) {
            console.error("searchData error:", err);
            res.status(500).json({
                message: "Failed to search records",
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

//setting up search functionality for the crime incidents table, allowing users to filter results based on various criteria such as incident entry ID, case ID, offense type ID, and location ID.

app.delete('/deleteData/:incident_entry_id', (req, res) => {
    const { incident_entry_id } = req.params;

    const delete_query = `
        DELETE FROM crime_incidents
        WHERE incident_entry_id = $1
    `;

    conn.query(delete_query, [incident_entry_id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Failed to delete record", error: err.message });
        } else if (result.rowCount === 0) {
            res.status(404).json({ message: "No record found with that ID" });
        } else {
            res.status(200).json({ message: "Record deleted successfully" });
        }
    });
});

app.put('/updateData/:incident_entry_id', (req, res) => {
    const { incident_entry_id } = req.params;
    const { status_id, police_precinct, location_id, offense_type_id } = req.body;

    const update_query = `
        UPDATE crime_incidents
        SET status_id = $1,
            police_precinct = $2,
            location_id = $3,
            offense_type_id = $4
        WHERE incident_entry_id = $5
    `;

    conn.query(
        update_query,
        [status_id, police_precinct, location_id, offense_type_id, incident_entry_id],
        (err, result) => {
            if (err) {
                res.status(500).json({ message: "Failed to update record", error: err.message });
            } else if (result.rowCount === 0) {
                res.status(404).json({ message: "No record found with that ID" });
            } else {
                res.status(200).json({ message: "Record updated successfully" });
            }
        }
    );
});