import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get('/api', (req, res) => {
  let date = new Date()
  res.redirect(`/api/${date}`)
})
app.get('/api/:date', (req, res, next) => {
  let {date} = req.params
  

  // 1. Check if the input is a valid Unix timestamp (all numbers)
  if (/^\d+$/.test(date)) {
    const timestamp = parseInt(date, 10);
    
    // Check if timestamp is in seconds (10 digits) or milliseconds (13 digits)
    date = new Date(timestamp < 100000000000 ? timestamp * 1000 : timestamp);
  } else {
    // 2. Otherwise, treat it as a date string
    date = new Date(date);
  }

  // 3. Validate if the resulting date object is actually valid
  if (isNaN(date.getTime())) {
    res.json({error: "Invalid Date"})
    return 
  } else {
// 4. Return both formats
res.json( {
    unix: date.getTime(),
    utc: date.toUTCString()
  });
  }

  
})


// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
