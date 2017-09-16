var max = 200;
var first_time = true;

var METHODS = {
	'secant': secant
	//'newton': newton,
	//'bisection': bisection
};


var current_method = new METHODS['secant'];
$("#types").click(function() {
	current_method = $(this).serializeArray()[0].value;
	current_method = new METHODS[current_method]();
});

// funcion del polinomio
function poly(x) {
	//	return (x-1)*(x-2)*(x-4)*(x-3)*(x-6) + 1;
	return Math.pow(x, 2) - 2;
}

// genera los puntos a partir de una funcion (range de python)
function generate_data(f) {
	var arr = [];
	for (i = -max; i < max; i++) {
		arr.push({x: i/10, y: f(i/10)});
	}
	return arr;
};

/* ------------- d3 definitions ---------- */
var height = 800,
	width = 800;

var x_scale = d3.scaleLinear()
    .domain([-10, 10])
    .range([0, width]);

var y_scale = d3.scaleLinear()
	.domain([10, -10])
	.range([0, height])

var color_scale = d3.scaleLinear()
	.domain([1, 1e-5])
	.range(['blue', 'red']);

var x_axis = d3.axisBottom(x_scale);
var y_axis = d3.axisLeft(y_scale);

var lineFunction = d3.line()
	.x(function(d) { return x_scale(d.x); })
	.y(function(d) { return y_scale(d.y); })

var data = generate_data(poly);
var line_data = current_method.generated_data;

var canvas = d3.select("#canvas")
	.append('svg')
	.attr('width', width)
	.attr('height', height);

canvas.append('path')
	.attr('d', lineFunction(data))
	.attr('fill', 'none')
	.attr('stroke', 'black')
	.attr('id', 'function')
	.attr('class', 'path');

canvas.append('path')
	.attr('d', lineFunction(line_data))
	.attr('fill', 'none')
	.attr('stroke', 'red')
	.attr('id', 'sec')
	.attr('class', 'path');

canvas.selectAll('circle')
	.data([{x: x0, y: poly(x0)}, {x: x1, y: poly(x1)}])
	.enter()
	.append('circle')
		.attr('class', 'circle')
		.attr('r', 5)
		.attr('cx', function(d) {return x_scale(d.x);})
		.attr('cy', function(d) {return y_scale(d.y);});

canvas.append('g')
	.attr('transform', 'translate(0, ' + height/2 + ')')
	.call(x_axis);

canvas.append('g')
	.attr('transform', 'translate(' + width/2 + ', 0)')
	.call(y_axis);

/* ------------ end d3 definitions ------------ */
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
		current_method.update_xs(poly)
		_x0.value = x0;
		_x1.value = x1;
		for (i = 0; i < line_data.length; i++) {
			line_data[i].y = current_method.pendiente(line_data[i].x, poly);
		}
	}
	var canvas = d3.select('#canvas').transition();

	canvas.select('#sec')
		.duration(750)
		.attr("d", lineFunction(line_data))
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
