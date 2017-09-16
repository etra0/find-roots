
var x0 = -10,
	x1 = -8;

// updatear x0 y x1
function secant() {
	function update_xs(f) {
		xn = x1 - f(x1)*((x1 - x0)/(f(x1) - f(x0)))
		x0 = x1;
		x1 = xn;
	}

	// funcion lineal de la secante
	function secant_line(x, f) {
		var m = (f(x1) - f(x0))/(x1 - x0);
		return m*(x - x1) + f(x1);
	}


	// conjunto de puntos
	var data = generate_data(poly);

	var sec = generate_data(function(x) { return secant_line(x, poly); });

	console.log(data);

	// update button
	function updateData() {
		if (first_time) {
			_x0 = document.getElementById('x0');
			_x1 = document.getElementById('x1');

			if (_x0.value != '') {
				x0 = +_x0.value;
			}

			if (_x1.value != '') {
				x1 = +_x1.value;
			}
		}

		if (Math.abs(x1 - x0) > 1e-5) {
			update_xs(poly);
			_x0.value = x0;
			_x1.value = x1;
			for (i = 0; i < sec.length; i++) {
				sec[i].y = secant_line(sec[i].x, poly);
			}
		}
		var canvas = d3.select('#canvas').transition();

		canvas.select('#sec')
			.duration(750)
			.attr("d", lineFunction(sec))
			.attr('stroke', color_scale(Math.abs(x1-x0)));

		var xs = [
			{x: x0, y: poly(x0)},
			{x: x1, y: poly(x1)}
		]
		canvas.selectAll('.circle')
			.duration(750)
			.attr('cx', function(d, i) { return x_scale(xs[i].x);})
			.attr('cy', function(d, i) {return y_scale(xs[i].y);})

		first_time = false;
	}
}
