// updatear x0 y x1
function secant() {
	var self = this;

	// will contain the dots of every funciton
	this.dots = [-10, -8]

	this.color = function() {
		return color_scale(Math.abs(self.dots[0] - self.dots[1]));
	}

	this.update_xs = function(f) {
		var x0 = self.dots[0];
		var x1 = self.dots[1];
		xn = x1 - f(x1)*((x1 - x0)/(f(x1) - f(x0)))
		self.dots[0] = x1;
		self.dots[1] = xn;

		// write in the boxes
		document.getElementById('x0').value = x0;
		document.getElementById('x1').value = x1;
	}

	// funcion lineal de la secante
	this.pendiente = function(x, f) {
		var x0 = self.dots[0];
		var x1 = self.dots[1];
		var m = (f(x1) - f(x0))/(x1 - x0);
		return m*(x - x1) + f(x1);
	}

	this.generated_data = generate_data(function(x) {
		return self.pendiente(x, poly);
	});

	this.update_line = function() {
		for (i = 0; i < self.generated_data.length; i++)
			self.generated_data[i].y = self.pendiente(self.generated_data[i].x,
				poly);
	}

	this.update = function() {
		if (Math.abs(self.dots[0] - self.dots[1]) > 1e-5) {
			self.update_xs(poly);
			self.update_line();
		}
	}
}

function bisection() {
	var self = this;

	this.dots = [-2, -1];

	this.color = 'none';

	this.update_xs = function(f) {
		var new_point = (this.dots[0] + this.dots[1])/2;

		if (poly(new_point)*poly(this.dots[0]) < 0)
			this.dots[1] = new_point;
		else
			this.dots[0] = new_point;

		document.getElementById('x0').value = this.dots[0];
		document.getElementById('x1').value = this.dots[1];
	}

	this.pendiente = function(x, f) {
		return 0;
	}

	this.generated_data = [];

	this.update_line = function() {
		// do nothing
	};

	this.update = function() {
		self.update_xs(null);
		console.log(this.dots);
	}

}
