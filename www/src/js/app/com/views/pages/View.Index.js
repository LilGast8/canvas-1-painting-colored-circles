

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.fc = {};
		
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
		
		TweenLite.ticker.addEventListener('tick', this.drawCanvas, this);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	Index.prototype.drawCanvas = function() {
	//	console.log('draw canvas');
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	//	this.context.globalCompositeOperation = 'lighter';
	//	this.context.globalCompositeOperation = 'darken';
		this.context.globalCompositeOperation = 'xor';
		
		for(var i=0; i<this.circles.length; i++) {
			this.circles[i].draw();
		}
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
		
		this.drawCanvas();
	};
	
	
	var _addCircle = function(e) {
		this.idCircle++;
		var circle = new APP.Views.Circle(this.idCircle, e.x, e.y);
		this.circles.push(circle);
		circle.init();
	};
	
	
	var _mouseMove = function(e) {
		_checkMouseHover.call(this, e.x, e.y);
	};
	
	
	var _checkMouseHover = function(x, y) {
		for(var i=0; i<this.circles.length; i++) {
			var circle = this.circles[i];
			if(x > circle.x-circle.radius && y > circle.y-circle.radius && x < circle.x+circle.radius && y < circle.y+circle.radius) circle.mouseEnter();
			else circle.mouseLeave();
		}
	};
	
	
	return new Index();
	
	
})(window);

