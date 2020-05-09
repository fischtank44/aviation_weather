
// const express = require('express');
// const request = require('request');

// const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/jokes/random', (req, res) => {
//   request(
//     { url: 'https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));

// https://www.aviationweather.gov/metar/data?ids=Ksea&format=raw&date=&hours=0&taf=on

//https://www.aviationweather.gov/metar/data?ids=${apt}&format=raw&date=&hours=0&taf=on

//https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml


function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml", true);
    xmlhttp.send();
  }
  
  function myFunction(xml) {
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    txt = "";
    x = xmlDoc.getElementsByTagName("station_id");
    y = xmlDoc.getElementsByTagName("raw_text")
    for (i = 0; i< x.length; i++) {
        if (x[i].childNodes[0].nodeValue === (document.getElementById("afld").value.toUpperCase())) {
            txt += y[i].childNodes[0].nodeValue;}
    }
    document.getElementById("full-report_text").innerHTML = txt;
  }