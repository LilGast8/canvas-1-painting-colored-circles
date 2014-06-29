

APP.Views = APP.Views || {};


APP.Views.Circle = (function(window){
	
	
	function Circle(id, x, y) {
		APP.View.call(this);
		
		this.name = 'Circle'+id;
		this.toX = x;
		this.toY = y;
		
		this.canvas = APP.Views.Index.canvas;
		this.context = APP.Views.Index.context;
		
		this.fc = {};
		
		this.isHover = false;
		
		this.x = null;
		this.y = null;
		this.width = null;
		this.height = null;
		this.radiusO = null;
		this.radius = null;
		this.color = null;
		
		this.RADIUS_MIN = 5;
		this.RADIUS_VARIATION = 195;
		this.RADIUS_MAX = this.RADIUS_MIN+this.RADIUS_VARIATION;
	}
	
	
	Circle.prototype = Object.create(APP.View.prototype);
	Circle.prototype.constructor = Circle;
	
	
	Circle.prototype.initElt = function() {
		/*
		var centerX = Math.round(Math.random()*this.canvas.width);
		var centerY = Math.round(Math.random()*this.canvas.height);
		var radius = Math.round(Math.random()*30+3);
		
		this.context.beginPath();
	//	this.context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
		this.context.arc(this.myCircle.x, this.myCircle.y, radius, 0, 2*Math.PI, false);
		this.context.fillStyle = '#0f9';
		this.context.fill();
	//	this.context.lineWidth = 1;
	//	this.context.strokeStyle = '#000';
	//	this.context.stroke();
		*/
		
		_buildCircle.call(this);
		
		
	//	var self = this;
	//	TweenLite.ticker.addEventListener('tick', _drawCircle.bind(self));
		
	//	fn = fn.bind(this);
	//	el.addEventListener('evt', fn, false)
		
	//	var fc = _drawCircle.bind(this);
	//	this.fc = _drawCircle.bind(this);
		
	//	this.fc = this.draw.bind(this);
		
		
		
	//	this.hoverProxy = $.proxy(_hover, this);
	//	$(this).on('mouseenter', this.hoverProxy);
		
	//	this.fc.hover = _hover.bind(this);
	//	this.addEventListener('mouseover', this.fc.hover, false);
		
		
		
	//	TweenLite.ticker.addEventListener('tick', _drawCircle.bind(self));
	//	TweenLite.ticker.addEventListener('tick', this.drawCircle);
	};
	
	
	Circle.prototype.bindEvents = function() {
		
	};
	
	
	Circle.prototype.unbindEvents = function() {
		
	};
	
	
	Circle.prototype.draw = function() {
	//	console.log('draw circle', this);
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		this.context.fillStyle = this.color;
		this.context.fill();
	};
	
	
	Circle.prototype.mouseEnter = function() {
		if(this.isHover) return false;
		else this.isHover = true;
		
	//	console.log('enter :', this.name);
		
		/*
		if(this.fc.tickLeave) {
			TweenLite.ticker.removeEventListener('tick', this.fc.tickLeave, false);
			this.fc.tickLeave = null;
		}
		
		this.fc.tickEnter = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickEnter, false);
		
		var self = this;
		TweenLite.to(this, 0.5, {radius:this.radiusO+this.radiusO*30/100, ease:Quad.easeOut, onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickEnter, false);
			self.fc.tickEnter = null;
		}});
		*/
		
		TweenLite.to(this, 0.5, {radius:this.radiusO+this.radiusO*30/100, ease:Quad.easeOut});
	};
	
	
	Circle.prototype.mouseLeave = function() {
		if(!this.isHover) return false;
		else this.isHover = false;
		
	//	console.log('leave :', this.name);
		
		/*
		if(this.fc.tickEnter) {
			TweenLite.ticker.removeEventListener('tick', this.fc.tickEnter, false);
			this.fc.tickEnter = null;
		}
		
		this.fc.tickLeave = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickLeave, false);
		
		var self = this;
		TweenLite.to(this, 0.5, {radius:this.radiusO, ease:Quad.easeOut, onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickLeave, false);
			self.fc.tickLeave = null;
		}});
		*/
		
		TweenLite.to(this, 0.5, {radius:this.radiusO, ease:Quad.easeOut});
	};
	
	
	var _buildCircle = function() {
		var posStart = _getPosStart.call(this);
		this.x = posStart.startX;
		this.y = posStart.startY;
	//	var toX = Math.round(Math.random()*this.canvas.width);
	//	var toY = Math.round(Math.random()*this.canvas.height);
		this.radiusO = this.radius = Math.round(Math.random()*this.RADIUS_VARIATION+this.RADIUS_MIN);
		this.color = _getRandomColor();
		var duration = Math.round(Math.random()*40+10)/10;
		
		/*
		this.fc.tickBuild = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickBuild, false);
		
		var self = this;
		TweenLite.to(this, duration, {x:toX, y:toY, ease:Quart.easeOut, onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickBuild, false);
			self.fc.tickBuild = null;
		}});
		*/
		TweenLite.to(this, duration, {x:this.toX, y:this.toY, ease:Quart.easeOut});
	};
	
	
	var _getPosStart = function() {
		var x = null;
		var y = null;
		var start = parseInt(Math.random()*4);
		var windowW = APP.Main.windowW;
		var windowH = APP.Main.windowH;
		
		if(start === 0 ) { // top
			x = Math.random()*(windowW+200)-100;
			y = -this.RADIUS_MAX;
		} else if(start == 1){ // right
			x = windowW+this.RADIUS_MAX;
			y = Math.random()*(windowH+200)-100;
		} else if(start == 2){ // bottom
			x = Math.random()*(windowW+200)-100;
			y = windowH+this.RADIUS_MAX;
		} else if(start == 3){ // left
			x = -this.RADIUS_MAX;
			y = Math.random()*(windowH+200)-100;
		}
		
		var pos = {
			startX : x,
			startY : y
		};
		
		return pos;
	};
	
	
	var _getRandomColor = function() {
		var hex = '0123456789ABCDEF'.split('');
		var color = '#';
		for(var i = 0; i < 6 ; i++) color = color+hex[Math.floor(Math.random()*16)];
		
		return color;
	};
	
	
	return Circle;
	
	
})(window);

