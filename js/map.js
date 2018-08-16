/***

	Config File for Todokedori Maproom v1.0

	Author: yohman
	Last updated: August 12, 2018

***/

/***

	Namespace and defaults

***/

	var todokedori = {};
	todokedori.data = {};

/***

	Get the data

***/

$(document).ready(function() {
	todokedori.getData();
});

todokedori.getData = function()
{
	$.when(
		/*

			Data json files:
			New datasets need to added as json files. Note that the json file is
			preceded with defining the json as a javascript object.

		*/
		$.getScript( "data/json/2011-04.json" ),
		$.getScript( "data/json/2011-10.json" ),
		$.getScript( "data/json/2012-04.json" ),
		$.getScript( "data/json/2012-10.json" ),
		$.getScript( "data/json/2013-04.json" ),
		$.getScript( "data/json/2013-10.json" ),
		$.getScript( "data/json/2014-04.json" ),
		$.getScript( "data/json/2014-10.json" ),
		$.getScript( "data/json/2015-04.json" ),
		$.getScript( "data/json/2015-10.json" ),
		$.getScript( "data/json/2016-04.json" ),
		$.getScript( "data/json/2016-10.json" ),
		$.getScript( "data/json/2017-04.json" ),
		$.getScript( "data/json/2017-10.json" ),
		$.getScript( "data/json/2018-04.json" ),
		$.getScript( "data/todokedori_mesh3.json" ),

	).done(function(){
		// now that all the data has loaded...
		todokedori.setParameters();
	});
}

todokedori.setParameters = function()
{

	/***

		Map Settings

	***/

		// instantiate the map
		todokedori.map = L.map('map',{
			zoomControl: false,
		});

		//add zoom control with your options
		L.control.zoom({
		     position:'topright'
		}).addTo(todokedori.map);

		// info control
		todokedori.info = L.control();

		// the geography layer
		todokedori.mapLayer = L.geoJson();

		todokedori.basemapmapoptions = {
			maxZoom: 		20,
			tileSize: 		512,
			zoomOffset: 	-1,
			retina: '@2x',
			detectRetina: true,
			attribution: 	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
		}

		todokedori.basemaps = [
			L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', todokedori.basemapmapoptions),
			L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', todokedori.basemapmapoptions),
			L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', todokedori.basemapmapoptions),
		]

	/*

		Timebar radiation datasets

	*/
		todokedori.radiationDatasets = [
			"2011-04",
			"2011-10",
			"2012-04",
			"2012-10",
			"2013-04",
			"2013-10",
			"2014-04",
			"2014-10",
			"2015-04",
			"2015-10",
			"2016-04",
			"2016-10",
			"2017-04",
			"2017-10",
			"2018-04",
		]
	/*

		Colors for charts
		blue: 	#1F78B4
		orage: 	#FF7F00
		green: 	#33A02C
		purple: #6A3D9A
		red: 	#E31A1C

	*/
		todokedori.colorPallete = ['#6A3D9A','#FF7F00','#33A02C','#1F78B4','#E31A1C'];
		todokedori.colorPallete = ['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2'];
		todokedori.dataBreaks = [3.919,2.968,2.017,1.541,1.065,0.78 ,0.495,0.304,0.152,0]

	/*

		Default datasets

	*/
		todokedori.currentRadiationDataset = todokedori.data[todokedori.radiationDatasets[0]]
		todokedori.radiationDatafield = "100cm"
		// the basemap
		todokedori.basemap = todokedori.basemaps[1] //0: light 1: dark 2: satellite

	todokedori.init();
}

todokedori.init = function()
{
	/*

		Initialize the Map

	*/
	console.log('initializing...')

	todokedori.map.setView([37.6, 141], 11);
	todokedori.map.addLayer(todokedori.basemap);
	// todokedori.displayLegend();

	// add the timebar
	todokedori.setTimebar();

	// seed the map
	todokedori.mapGeoJSON();

	// fit to bounds
	// todokedori.map.fitBounds(todokedori.mapLayer.getBounds())

	// add basemap toggles
	$('#basemap-light').click(function(){
		todokedori.changeBaseMap(0)
	})
	$('#basemap-dark').click(function(){
		todokedori.changeBaseMap(1)
	})
	$('#basemap-satellite').click(function(){
		todokedori.changeBaseMap(2)
	})
}

/*

	Add the timebar

*/

todokedori.setTimebar = function()
{
	$("#timebar").ionRangeSlider({

		from: 	0,
		grid: 	true,
		step:	1,
		values:	[
			"第１期",
			"第2期",
			"第3期",
			"第4期",
			"第5期",
			"第6期",
			"第7期",
			"第8期",
			"第9期",
			"第10期",
			"第11期",
			"第12期",
			"第13期",
			"第14期",
			"第15期",
		],
		onFinish: function (data) {
			todokedori.changeRadiationLayer(data.from)
		},
	});
}

/*

	Change radiation data layer

*/
todokedori.changeRadiationLayer = function(i)
{
	todokedori.currentRadiationDataset = todokedori.data[todokedori.radiationDatasets[i]]
	todokedori.mapGeoJSON()
}

/*

	Map the data

*/

todokedori.mapGeoJSON = function()
{

	// update geojson
	// todokedori.geojson = todokedori.currentLayer.geography;

	// clear existing layers
	todokedori.mapLayer.clearLayers();

	// map the new layer
	todokedori.mapLayer = L.geoJson(todokedori_mesh, {
		style: todokedori.style,
		onEachFeature: todokedori.onEachFeature
	}).addTo(todokedori.map);
	// todokedori.mapLayer.bindTooltip(function(e){return e.feature.properties.name})

	// $('#data-subtitle').html(todokedori.currentLayer.title)
}

todokedori.getColor = function(d) {
	return d > 3.919  ? '#9e0142' :
		   d > 2.968  ? '#d53e4f' :
		   d > 2.017  ? '#f46d43' :
		   d > 1.541  ? '#fdae61' :
		   d > 1.065  ? '#fee08b' :
		   d > 0.78   ? '#e6f598' :
		   d > 0.495  ? '#abdda4' :
		   d > 0.304  ? '#66c2a5' :
		   d > 0.152  ? '#3288bd' :
		   d > 0      ? '#5e4fa2' :
			'rgba(255,255,255,0)';
}

todokedori.style = function(feature) {

	var identifyer = "ID"

	// join the mesh with the data
	var featurejoin = objectFindByKey(todokedori.currentRadiationDataset,identifyer,feature.properties[identifyer])

	// if there is no data in the grid, don't color it
	if(featurejoin == null)
	{
		var cm100 = 0;
		var color = 'rgba(255,255,255,0)'
	}
	else
	{
		var cm100 = featurejoin[todokedori.radiationDatafield];
		var color = 'rgba(255,255,255,1)'
	}

	return {
		fillColor: todokedori.getColor(cm100),
		weight: 1,
		opacity: 1,
		color: color,
		// dashArray: '1',
		fillOpacity: 0.7
	};
}

function objectFindByKey(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === value) {
			return array[i];
		}
	}
	return null;
}


// things to do for each polygon
todokedori.onEachFeature = function(feature, layer) {

	var data = todokedori.getRadiationDataByID(feature.properties.ID)
	if(data !== undefined)
	{
		var html = '<div style="border-bottom:1px solid gainsboro;font-size:1.2em">'+data.City+'</div>'
		html += '<div style="background-color:gainsboro;font-size:0.8;border-bottom:1px solid gainsboro">'+data.Date+'</div>'

		layer.bindTooltip(html+data["1cm"]+' µSv/h (1cm)<br>'+data["100cm"]+' µSv/h (100cm)');
	}
	layer.on({
		mouseover: todokedori.highlightFeature,
		mouseout: todokedori.resetHighlight,
		// click: todokedori.clickFeature
	});
}

todokedori.getRadiationDataByID = function(ID)
{
	var data = todokedori.currentRadiationDataset.find(x => x["ID"] === ID);

	return(data)
}

todokedori.changeBaseMap = function(i)
{
	todokedori.map.removeLayer(todokedori.basemap)
	todokedori.basemap = todokedori.basemaps[i]
	todokedori.map.addLayer(todokedori.basemap)
}
var dataarray = []
todokedori.highlightFeature = function(e)
{
	// set it globally
	todokedori.highlightedData = e.target;

	// get the data for highlighted polygon
	var identifyer = "ID"
	todokedori.highlightedData.data = todokedori.currentRadiationDataset.find(x => x["ID"] === e.target.feature.properties[identifyer]);

	todokedori.highlightedData.dataarray = []
	// find other data for the same location
	$.each(todokedori.radiationDatasets,function(i,val){
		console.log(todokedori.data[todokedori.radiationDatasets[i]])
		var thisdataset = todokedori.data[todokedori.radiationDatasets[i]]
		var thisdata = thisdataset.find(x => x["ID"] === e.target.feature.properties[identifyer])
		todokedori.highlightedData.dataarray.push(thisdata);
	})
	console.log(todokedori.highlightedData.dataarray)

	// set the style for highlighted polygon
	todokedori.highlightedData.setStyle({
		weight: 2,
		color: "white",
		// dashArray: 1,
		fillOpacity: 0.2
	});

	// // display the data
	todokedori.displayData();
}


todokedori.displayData = function()
{
	var data = todokedori.highlightedData.data
	if(data !== undefined)
	{
		// chart
		$('.ct-chart').show()
		var labels = []
		var series = {
			"1cm": [],
			"100cm": []
		}

		$.each(todokedori.highlightedData.dataarray,function(i,val){
			if(val !== undefined)
			{
				// labels.push(val.Date)
				labels.push('第'+(i+1)+'期')
				series["1cm"].push(val["1cm"])
				series["100cm"].push(val["100cm"])
			}

		})
		console.log(labels)
		console.log(series)
		var chartdata = {
			// A labels array that can contain any sort of values
			labels: labels,
			series: [
				series["1cm"],
				series["100cm"]
			],
			options: {
				height:50
			}

		};

		// Create a new line chart object where as first parameter we pass in a selector
		// that is resolving to our chart container element. The Second parameter
		// is the actual chartdata object.
		new Chartist.Line('.ct-chart', chartdata);

		// table
		$('#data-table > tbody:last-child').html(
			'<tr>'
			+'<td>ID</td>'
			+'<td>'+data.ID+'</td>'
			+'</tr>'
			+'<tr>'
			+'<td>場所</td>'
			+'<td>'+data["City"]+'</td>'
			+'</tr>'
			+'<tr>'
			+'<td>測定月</td>'
			+'<td>'+data["Date"]+'</td>'
			+'</tr>'
			+'<tr>'
			+'<td>1 cm</td>'
			+'<td>'+data["1cm"]+' µSv/h</td>'
			+'</tr>'
			+'<tr>'
			+'<td>1 00cm</td>'
			+'<td>'+data["100cm"]+' µSv/h</td>'
			+'</tr>');
	}
	else {
		$('#data-table > tbody:last-child').empty()
		$('.ct-chart').hide()
	}

}

todokedori.resetHighlight = function(e) {
	todokedori.mapLayer.resetStyle(e.target);
}

todokedori.displayLegend = function()
{
	var html = ''
	$.each(todokedori.colorPallete,function(i,val){
		html += '<tr><td style="background-color:'+val+'"> </td>'
		html += '<td>'+todokedori.dataBreaks[i]+'</td></tr>'
	})
	$('#data-legend > tbody:last-child').html(html);

}
