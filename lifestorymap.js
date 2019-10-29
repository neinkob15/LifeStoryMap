class LifeStoryMap {
  constructor(mapid, file, options) {
    if (!options) {
      options = {};
    }
    if (!options.zoomLevel) {
      options.zoomLevel = 12;
    }
    if (!options.vOffset) {
      options.vOffset = 0.04;
    }

    $("#" + mapid).css("width", "100vw");
    $("#" + mapid).css("height", "100vh");
    var mymap = L.map(mapid, {zoomControl: false});
    L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      attribution: 'see <a href="https://github.com/neinkob15/LifeStoryMap">LifeStoryMap™</a>',
      subdomains:['mt0','mt1','mt2','mt3'],
    }).addTo(mymap);

    var exit = L.easyButton( 'fa-arrow-circle-left fa-lg', function(control, map){history.go(-1);});
    var zoomBar = L.easyBar([
      L.easyButton( 'fa-plus',  function(control, map){map.setZoom(map.getZoom()+1);}),
      L.easyButton( 'fa-minus',  function(control, map){map.setZoom(map.getZoom()-1);}),
    ]);

    // add it to the map
    exit.addTo(mymap);
    zoomBar.addTo(mymap);

    var redIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    $.getJSON(file, function(data) {

      var markers = [];
      for (let milestone of data.milestones)  {
        var marker = L.marker(milestone.location, {icon: redIcon}).addTo(mymap);
        marker.content = milestone;
        markers.push(marker);
      }

      if (options.linesBetween) {
        var geodesicLayer2 = L.geodesic([data.milestones.map(a => new L.LatLng(a.location[0], a.location[1]))], options.lineOptions);


        geodesicLayer2.addTo(mymap);
      }
      mymap.setView([markers[0].getLatLng().lat + options.vOffset, markers[0].getLatLng().lng], options.zoomLevel);
      markers[0].openPopup();


      markers.forEach(function(marker, i) {
        marker.bindPopup(buildPopup(marker.content.title, marker.content.date, marker.content.image, marker.content.description, i, markers[i + 1]), {'className': 'myPopup', 'maxWidth': '500'}).addTo(mymap);

        $(document).on('click touchstart','.link' + i,function(){
          markers[i].closePopup();
          if (markers[i + 1]) {
            mymap.flyTo([markers[i + 1].getLatLng().lat + options.vOffset, markers[i + 1].getLatLng().lng], options.zoomLevel);
            markers[i + 1].openPopup();
          } else {
            var group = new L.featureGroup(markers);
            if (options.loop) {
              mymap.flyTo([markers[0].getLatLng().lat + options.vOffset, markers[0].getLatLng().lng], options.zoomLevel);
              markers[0].openPopup();
            } else {
              mymap.flyToBounds(group.getBounds());
            }

          }
        });
      });
      markers[0].openPopup();
    });

    function buildPopup(title, date, img, description, number, notLast) {
      let titleString = "<div class='popupTitle'>" + title + "</div>";
      let dateString = "";
      if (date) {
        dateString = "<div class='popupDate'>" + date + "</div>";
      }
      let imageString = "";
      if (img) {
        imageString = "<img src='" + img + "' class='popupImage' />";
      }
      let descriptionString = "<div class='popupDescription'>" + description + "</div>";
      let buttonString = "";
      if (notLast) {
        buttonString = "<div style='height: 35px; margin-top: 10px;'><a href='#' class='link link" + number + "' style='color: black; float: right; font-size: 20px; display: inline-block; margin: 0 20px;'>Next Milestone</a></div>";
      } else {
        if (options.loop) {
          buttonString = "<div style='height: 35px; margin-top: 10px;'><a href='#' class='link link" + number + "' style='color: black; float: right; font-size: 20px; display: inline-block; margin: 0 20px;'>Start over</a></div>";
        } else {
          buttonString = "<div style='height: 35px; margin-top: 10px;'><a href='#' class='link link" + number + "' style='color: black; float: right; font-size: 20px; display: inline-block; margin: 0 20px;'>Overview</a></div>";
        }
      }
      return titleString + dateString + imageString + descriptionString + buttonString;
    }
  }
}
