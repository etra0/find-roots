
var x0 = -10,
	x1 = -8;

// updatear x0 y x1
function secant() {
	var self = this;

	// will contain the dots of every funciton
	this.dots = [-10, -8]

	this.update_xs = function(f) {
		xn = x1 - f(x1)*((x1 - x0)/(f(x1) - f(x0)))
		x0 = x1;
		x1 = xn;
	}

	// funcion lineal de la secante
	this.pendiente = function(x, f) {
		var m = (f(x1) - f(x0))/(x1 - x0);
		return m*(x - x1) + f(x1);
	}

	this.generated_data = generate_data(function(x) {
		return self.pendiente(x, poly);
	});
}

function bisection() {
	var self = this;

	this.dots = [-10, -8];

	this.update_xs = function(f) {
		var new_point = (this.dots[0] + this.dots[1])/2;

		if (new_point*this.dots[0] < 0)
			this.dots[1] = new_point;
		else
			this.dots[0] = new_point;
	}

	this.pendiente = function(x, f) {
		return 0;
	}

}
