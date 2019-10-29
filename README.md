# LifeStoryMap

LifeStoryMap is a addon for leaflet which enables the creation of so-called LifeStoryMap. It is a way to illustrate your previous life on a map.

## Features
- **Small** - very few KB in total size
- **Responsive** - does work on desktop and mobile devices
- **Images** - include your chosen image for every station in your life
- **JSON-based** - provide a JSON file with your personal content, and you're ready to go

## Life Demo
You can check the live demo on my personal homepage right here: [jakobgietl.de](https://jakobgietl.de/lifeMap.html)

## Usage
Manually download and link the lightstorymap.js and lightstorymap.css in your HTML:

```html
<link rel="stylesheet" href="path/to/lightstorymap.css" />
<script src="path/to/lightstorymap.js"></script>
```
and before the closing <body> tag initialize it on any element you want. 
```html
<script type="text/javascript">
	new LifeStoryMap("someID");
</script>
```

## Examples
```html
<head>
	<link rel="stylesheet" href="path/to/lightstorymap.css" />
	<script src="path/to/lightstorymap.js"></script>
</head>
<body>
	<div id="lifestorymap"></div>
	<script type="text/javascript">
		new LifeStoryMap("lifestorymap");
	</script>
</body>
```

## Options
You can pass options to the LifeStoryMap like this:
```javascript
new LifeStoryMap("lifestorymap", {
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
Feel free to report any issues! 

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
