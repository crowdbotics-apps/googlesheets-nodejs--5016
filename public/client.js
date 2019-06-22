$(function() {
	$.get('/charts', function(charts) {
		var dataStr = ''
		var imgStr = ''
		var gridster = $('section#charts')
			.gridster({
				widget_margins: [5, 5],
				widget_base_dimensions: [255, 155]
			})
			.data('gridster')
		var carray = $.map(charts, function(value, index) {
			return [value]
		})
		for (var i = 1; i < carray.length; i++) {
			var rarray = $.map(carray[i], function(value, index) {
				return [value]
			})
			for (var j = 2; j < rarray.length; j++) {
				dataStr += rarray[j].value
				if (rarray[j + 1]) dataStr += ','
			}

			imgStr =
				'<img src="//chart.googleapis.com/chart?cht=' +
				rarray[0].value +
				'&chtt=' +
				rarray[1].value +
				'&chs=250x150&chd=t:' +
				dataStr +
				'&chxt=x,y&chxs=0,c0c0c0,10,0,lt|1,c0c0c0,10,1,lt&chco=000000" />'

			gridster.add_widget('<span id="chart' + i + '">' + imgStr + '</span>', 1, 1)
			dataStr = ''
		}
	})
})
