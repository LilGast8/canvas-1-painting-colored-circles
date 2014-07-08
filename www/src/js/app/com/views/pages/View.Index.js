

APP.Views = APP.Views || {};


APP.Views.Index = (function(window){
	
	
	function Index() {
		APP.View.call(this);
		
		this.mouse = {
			x : null,
			y : null
		};
		
		this.idCircle = 0;
		this.circles = [];
		this.nbFrameSinceMouseDown = 0;
		this.isAddCircle = false;
		
		this.SPEED_CREATE = 5;
	}
	
	
	Index.prototype = Object.create(APP.View.prototype);
	Index.prototype.constructor = Index;
	
	
	Index.prototype.initElt = function() {
		this.fc = {};
		
		this.$.page = $(document.getElementById('page-content'));
		
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		
		this.$.canvas = $(this.canvas);
	};
	
	
	Index.prototype.bindEvents = function() {
		this.resizeWindowProxy = $.proxy(_resize, this);
		APP.Main.$.window.on('resize', this.resizeWindowProxy);
		
		this.clickCanvasProxy = $.proxy(_addCircle, this);
		this.$.canvas.on('mousedown', this.clickCanvasProxy);
		
		this.clickCanvasProxy = $.proxy(_stopAddCircle, this);
		this.$.canvas.on('mouseup', this.clickCanvasProxy);
		
		this.mouseMoveCanvasProxy = $.proxy(_mouseMove, this);
		this.$.canvas.on('mousemove', this.mouseMoveCanvasProxy);
		
		TweenLite.ticker.addEventListener('tick', _draw, this);
		
		_resize.call(this);
	};
	
	
	Index.prototype.unbindEvents = function() {
		
	};
	
	
	var _resize = function() {
		APP.Main.resize();
		
		this.canvas.width = APP.Main.windowW;
		this.canvas.height = APP.Main.windowH;
	};
	
	
	var _addCircle = function(e) {
		this.mouse.x = e.clientX;
		this.mouse.y = e.clientY;
		
		this.isAddCircle = true;
	};
	
	
	var _stopAddCircle = function() {
		this.isAddCircle = false;
	};
	
	
	var _mouseMove = function(e) {
		this.mouse.x = e.clientX;
		this.mouse.y = e.clientY;
		
		_checkMouseHover.call(this, this.mouse.x, this.mouse.y);
	};
	
	
	var _draw = function() {
		APP.Main.stats.begin();
		
		if(this.isAddCircle) {
			if(this.nbFrameSinceMouseDown === 0) _createCircle.call(this);
			
			this.nbFrameSinceMouseDown = this.nbFrameSinceMouseDown == this.SPEED_CREATE ? this.nbFrameSinceMouseDown = 0 : this.nbFrameSinceMouseDown+1;
		}
		else if(!this.isAddCircle && this.nbFrameSinceMouseDown !== 0) this.nbFrameSinceMouseDown = 0;
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.globalCompositeOperation = 'xor';
		
		for(var i=0; i<this.circles.length; i++) {
			this.circles[i].draw();
		}
		
		APP.Main.stats.end();
	};
	
	
	var _createCircle = function() {
		this.idCircle++;
		var circle = new APP.Views.Circle(this.idCircle, this.mouse.x, this.mouse.y);
		this.circles.push(circle);
		circle.init();
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

