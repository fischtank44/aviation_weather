var image = document.images[0];
var downloadingImage = new Image();
downloadingImage.onload = function(){
    image.src = this.src;   
};
downloadingImage.src = "https://weather.com/maps/ustemperaturemap";



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
  
  function linkToWeather() {
    let apt = document.getElementById("afld").value.toUpperCase()
    window.open(`https://www.aviationweather.gov/metar/data?ids=${apt}&format=decoded&date=&hours=0&taf=on`);
  }


//   function myFunction(xml) {
//     var x, i, xmlDoc, txt;
//     xmlDoc = xml.responseXML;
//     txt = "";
//     x = xmlDoc.getElementsByTagName("station_id");
//     y = xmlDoc.getElementsByTagName("raw_text")
//     for (i = 0; i< x.length; i++) {
//         if (x[i].childNodes[0].nodeValue === (document.getElementById("afld").value.toUpperCase())) {
//             txt += y[i].childNodes[0].nodeValue;}
//     }
//     document.getElementById("full_report_text").innerHTML = txt;
//   }

    
  function myFunction(xml) {
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    txt = "";
    w = xmlDoc.getElementsByTagName("METAR");
    x = xmlDoc.getElementsByTagName("station_id");
    y = xmlDoc.getElementsByTagName("raw_text");
    for (i = 0; i< x.length; i++) {
        if (x[i].childNodes[0].nodeValue === (document.getElementById("afld").value.toUpperCase())) {
            
            console.log( w[i].getElementsByTagName("sky_condition")[0].outerHTML.split(" ")[1].split('"')[1] ,w[i].getElementsByTagName("sky_condition")[0].outerHTML.split(" ")[2].split('"')[1]); 
            document.getElementById("full_report_text").innerHTML += y[i].childNodes[0].nodeValue + "\n\n";
            document.getElementById("observation_time_text").value = w[i].getElementsByTagName("observation_time")[0].innerHTML.replace("T", "  "); 
            document.getElementById("temp_f_text").value = (Math.round(((w[i].getElementsByTagName("temp_c")[0].innerHTML)*(9/5)+32)*10)/10) ; 
            document.getElementById("temp_c_text").value = w[i].getElementsByTagName("temp_c")[0].innerHTML; 
            document.getElementById("dewpoint_c_text").value = w[i].getElementsByTagName("dewpoint_c")[0].innerHTML; 
            document.getElementById("wind_dir_degrees_text").value = w[i].getElementsByTagName("wind_dir_degrees")[0].innerHTML; 
            document.getElementById("wind_speed_kt_text").value = w[i].getElementsByTagName("wind_speed_kt")[0].innerHTML; 
            try{
            document.getElementById("wind_gust_kt_text").value = w[i].getElementsByTagName("wind_gust_kt")[0].innerHTML;
        } catch(e) {
            console.log(e)
        }  
            document.getElementById("visibility_statute_mi_text").value = w[i].getElementsByTagName("visibility_statute_mi")[0].innerHTML; 
            document.getElementById("altim_in_hg_text").value = (Math.round((w[i].getElementsByTagName("altim_in_hg")[0].innerHTML)*1000))/1000; 
            document.getElementById("sky_cover_text").value = w[i].getElementsByTagName("sky_condition")[0].outerHTML.split(" ")[1].split('"')[1] ;
            document.getElementById("cloud_base_ft_agl_text").value = w[i].getElementsByTagName("sky_condition")[0].outerHTML.split(" ")[2].split('"')[1] ;
            document.getElementById("flight_category_text").value = w[i].getElementsByTagName("flight_category")[0].innerHTML; 
            document.getElementById("metar_type_text").value = w[i].getElementsByTagName("metar_type")[0].innerHTML; 
            document.getElementById("elevation_m_text").value = w[i].getElementsByTagName("elevation_m")[0].innerHTML;

    }
    }
  }

  // https://www.aviationweather.gov/metar/data?ids=KSEA&format=decoded&date=&hours=0&taf=on

//   <input type="text" id="sky_cover_text" name="sky_cover_text"><br>
//   <input type="text" id="cloud_base_ft_agl_text" name="cloud_base_ft_agl"><br><br>