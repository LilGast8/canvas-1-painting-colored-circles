

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.$.page = $(document.getElementById('page-content'));
		
		this.idCircle = 0;
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		
		this.$.canvas = $(this.canvas);
		
		this.circles = [];
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		this.clickCanvasProxy = $.proxy(_addCircle, this);
		this.$.canvas.on('click', this.clickCanvasProxy);
		
		this.mouseMoveCanvasProxy = $.proxy(_mouseMove, this);
		this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	Index.prototype.drawCanvas = function() {
		console.log('draw canvas');
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		for(var i=0; i<this.circles.length; i++) {
			this.circles[i].draw();
		}
		
	};
	
	
	var _resize = function() {
		this.canvas.width = APP.Main.$.window.width();
		this.canvas.height = APP.Main.$.window.height();
		
		this.drawCanvas();
	};
	
	
	var _addCircle = function() {
		this.idCircle++;
		var circle = new APP.Views.Circle(this.canvas, this.context, this.idCircle);
		this.circles.push(circle);
		circle.init();
	};
	
	
	var _mouseMove = function(e) {
		_checkMouseHover.call(this, e.x, e.y);
	};
	
	
	var _checkMouseHover = function(x, y) {
	//	console.log(x, y);
		
		for(var i=0; i<this.circles.length; i++) {
			var circle = this.circles[i];
			if(x > circle.x-circle.radius && y > circle.y-circle.radius && x < circle.x+circle.radius && y < circle.y+circle.radius) circle.mouseEnter();
			else circle.mouseLeave();
		//	this.circles[i].x;
		}
	};
	
	
	return new Index();
	
	
})(window);

