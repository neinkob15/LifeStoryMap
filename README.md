# LifeStoryMap

LifeStoryMap is a addon for leaflet which enables the creation of so-called LifeStoryMap. It is a way to illustrate your previous life on a map.

## Features
- **Small** - very few KB in total size
- **Responsive** - does work on desktop and mobile devices
- **Images** - include your chosen image for every station in your life
- **JSON-based** - provide a JSON file with your personal content, and you're ready to go

## Life Demo
-- Currently not available --

## Usage
To make everything work you need to implement (see [Examples](#Examples)) some third-party libraries, listed below:
- [JQuery.js](https://jquery.com)
- [Fontawesome](https://fontawesome.com)
- [Leaflet.js](https://leafletjs.com/)
- [Leaflet.EasyButton](https://github.com/CliffCloud/Leaflet.EasyButton)
- [Leaflet.Geodesic](https://github.com/henrythasler/Leaflet.Geodesic)

Then, manually download and link the lightstorymap.js and lightstorymap.css (or the minified versions) in your HTML (and the libraries from above). 

```html
<link rel="stylesheet" href="path/to/lightstorymap.min.css" />
<script src="path/to/lightstorymap.min.js"></script>
```
and before the closing <body> tag initialize it on any element you want. 
```html
<script type="text/javascript">
	new LifeStoryMap("someID", "path/to/your/life.json");
</script>
```
The life.json is a file which contains all your important stations in life, that you want to visualize. 
Look at [life.json](life.json) for an example and to see the basic structure.

## Examples
```html
<head>
	<!-- Third-pary libraries -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css">
	<script src="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"></script>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css">
	<script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"></script>
	<script src="js/Leaflet.Geodesic.js"></script>
	<script src="js/jquery.min.js"></script>
	<link rel="stylesheet" href="css/fontawesome.css" />

	<!-- LightStoryMap -->
	<link rel="stylesheet" href="path/to/lightstorymap.css" />
	<script src="path/to/lightstorymap.js"></script>
</head>
<body>
	<div id="lifestorymap"></div>
	<script type="text/javascript">
		new LifeStoryMap("lifestorymap", "life.json");
	</script>
</body>
```

## Options
You can pass options to the LifeStoryMap like this:
```javascript
new LifeStoryMap("lifestorymap", "life.json", {
	loop: true,
	zoomLevel: 12,
	vOffset: 0.04,
	linesBetween: true,
	lineOptions: {
		weight: 3,
		color: #000000
	}
});
```

Option		|Type		|Default	|Description
------		|------		|------		|------
loop		|boolean	|`false`	|Enables starting over again after the last station
zoomLevel	|integer	|`12`		|The zoom level of the stations
vOffset		|float		|`0.04`		|This value indicates the displacement of the map center in the Y direction. Since the map center point is the coordinates of the entry, and then the popup above it rises, the map must be moved downwards so that everything can be displayed. 
linesBetween|boolean	|`false`	|Enables the drawing of lines between the stations
lineOptions	|object		|`{}`		|Settings for the lines, all of https://github.com/henrythasler/Leaflet.Geodesic#options

## Contributing
Feel free to report any issues or implement your own features!

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
