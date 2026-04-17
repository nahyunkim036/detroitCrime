const { Client } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const conn = process.env.DATABASE_URL
  ? new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Client({
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "detroit_crime_db",
      user: process.env.DB_USER || "kimnahyun",
      password: process.env.DB_PASSWORD || "5178",
      port: process.env.DB_PORT || 5432,
    });

const PORT = process.env.PORT || 5000;

conn.connect()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:");
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
    const { incident_entry_id, crime_keyword, neighborhood, police_precinct } = req.query;

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

    if (incident_entry_id && String(incident_entry_id).trim() !== "") {
        search_query += ` AND ci.incident_entry_id = $${count}`;
        values.push(String(incident_entry_id).trim());
        count++;
    }

    if (crime_keyword && String(crime_keyword).trim() !== "") {
        search_query += ` AND (
            ot.offense_category ILIKE $${count}
            OR ot.offense_description ILIKE $${count}
        )`;
        values.push(`%${String(crime_keyword).trim()}%`);
        count++;
    }

    if (neighborhood && String(neighborhood).trim() !== "") {
        search_query += ` AND l.neighborhood ILIKE $${count}`;
        values.push(`%${String(neighborhood).trim()}%`);
        count++;
    }

    if (police_precinct && String(police_precinct).trim() !== "") {
        search_query += ` AND ci.police_precinct = $${count}`;
        values.push(String(police_precinct).trim());
        count++;
    }

    search_query += ` ORDER BY ci.incident_occurred_at DESC NULLS LAST LIMIT 20`;

    console.log("search query:", search_query);
    console.log("search values:", values);

    conn.query(search_query, values, (err, result) => {
        if (err) {
            console.error("searchData error:", err);
            return res.status(500).json({
                message: "Failed to search records",
                error: err.message
            });
        }

        console.log("rows found:", result.rows.length);
        res.json(result.rows);
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

//---------------map endpoint----------------
app.get('/mapData', (req, res) => {
    const map_query = `
        SELECT
            ci.incident_entry_id,
            ci.incident_occurred_at,
            ci.police_precinct,
            ot.offense_category,
            ot.offense_description,
            l.latitude,
            l.longitude,
            l.neighborhood
        FROM crime_incidents ci
        JOIN locations l
            ON ci.location_id = l.location_id
        LEFT JOIN offense_types ot
            ON ci.offense_type_id = ot.offense_type_id
        WHERE l.latitude IS NOT NULL
          AND l.longitude IS NOT NULL
        ORDER BY ci.incident_occurred_at DESC NULLS LAST
        LIMIT 200
    `;

    conn.query(map_query, (err, result) => {
        if (err) {
            console.error("mapData error:", err);
            res.status(500).json({
                message: "Failed to load map data",
                error: err.message
            });
        } else {
            res.json(result.rows);
        }
    });
});

// -------------dashboard endpoint ----------
app.get('/dashboardData', async (req, res) => {
    try {
        const totalRecordsResult = await conn.query(`
            SELECT COUNT(*) AS count
            FROM crime_incidents
        `);

        const totalOffenseTypesResult = await conn.query(`
            SELECT COUNT(*) AS count
            FROM offense_types
        `);

        const totalLocationsResult = await conn.query(`
            SELECT COUNT(*) AS count
            FROM locations
        `);

        const totalStatusesResult = await conn.query(`
            SELECT COUNT(*) AS count
            FROM case_statuses
        `);

        const mappedRecordsResult = await conn.query(`
            SELECT COUNT(*) AS count
            FROM crime_incidents ci
            JOIN locations l
              ON ci.location_id = l.location_id
            WHERE l.latitude IS NOT NULL
              AND l.longitude IS NOT NULL
        `);

        res.json({
            totalRecords: totalRecordsResult.rows[0].count,
            totalOffenseTypes: totalOffenseTypesResult.rows[0].count,
            totalLocations: totalLocationsResult.rows[0].count,
            totalStatuses: totalStatusesResult.rows[0].count,
            mappedRecords: mappedRecordsResult.rows[0].count,
        });
    } catch (error) {
        console.error("dashboardData error:", error);
        res.status(500).json({
            message: "Failed to load dashboard data",
            error: error.message,
        });
    }
});