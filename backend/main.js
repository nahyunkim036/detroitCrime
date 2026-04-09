const {Client} = require('pg');
const express=require('express');

const app=express();
app.use(express.json());

const conn = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Jc19905034!",
    database: "DetroitCrime_Clean"
})

// connecting to database ^

conn.connect()
  .then(() => {
    console.log('Database connected');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:');
    console.error(err.message);
  });

app.post('/postData', (req, res) => {

    const {offense_type_id, offense_category, offense_description} =req.body
    
    const insert_query = `INSERT INTO crime_data (offense_type_id, offense_category, offense_description) VALUES ($1, $2, $3)`

    conn.query(insert_query, [offense_type_id, offense_category, offense_description],(err, result) => {
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

    const fetch_query="Select * from crime_data"
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
