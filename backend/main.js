const {Client} = require('pg');
const express=require('express');

const app=express();
app.use(express.json());

const conn = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "password",
    database: "detroit_crime"
})

// connecting to database ^

conn.connect().then(()=> console.log("connected"))

app.post('/postData', (req, res) => {

    const {offense_type_id, offense_cetegory, offense_description} =req.body
    
    const insert_query = `INSERT INTO crime_data (offense_type_id, offense_category, offense_description) VALUES ($1, $2, $3)`

    conn.query(insert_query, [offense_type_id, offense_cetegory, offense_description],(err, result) => {
        if(err){
            res.send(err)
        } else {
            console.log(result)
            res.send("POSTED DATA")
        }
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
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
