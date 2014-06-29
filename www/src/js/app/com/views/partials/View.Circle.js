

APP.Views = APP.Views || {};


APP.Views.Circle = (function(window){
	
	
	function Circle(canvas, context, id) {
		APP.View.call(this);
		
		this.name = 'Circle'+id;
		
		this.canvas = canvas;
		this.context = context;
		
		this.fc = {};
		
		this.isHover = false;
		
		/*
		this.myCircle = {
			x : 0,
			y : 0,
			width : 0,
			height : 0,
			radius : 0
		};
		*/
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.radiusO = 0;
		this.radius = 0;
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
		this.context.fillStyle = '#0f9';
		this.context.fill();
	};
	
	
	Circle.prototype.mouseEnter = function() {
		console.log('hover', this.isHover);
		
		if(this.isHover) return false;
		else this.isHover = true;
		
		this.fc.tickHover = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickHover, false);
		
		var self = this;
		TweenLite.to(this, 0.3, {radius:this.radiusO+10, ease:Quart.easeOut, onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickHover, false);
			self.fc.tickHover = null;
		}});
	};
	
	
	Circle.prototype.mouseLeave = function() {
		if(!this.isHover) return false;
		else this.isHover = false;
		
		
		this.fc.tickLeave = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickLeave, false);
		
		var self = this;
		TweenLite.to(this, 0.3, {radius:this.radiusO, ease:Quart.easeOut, onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickLeave, false);
			self.fc.tickLeave = null;
		}});
	};
	
	
	var _buildCircle = function() {
		
		var centerX = Math.round(Math.random()*this.canvas.width);
		var centerY = Math.round(Math.random()*this.canvas.height);
		this.radiusO = this.radius = Math.round(Math.random()*30+3);
	//	var radius = Math.round(Math.random()*30+3);
		var duration = Math.round(Math.random()*20+5)/10;
		console.log(duration);
		
		this.fc.tickBuild = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickBuild, false);
		
		var self = this;
		TweenLite.to(this, duration, {x:centerX, y:centerY, ease:Quart.easeOut, onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickBuild, false);
			self.fc.tickBuild = null;
		}});
	};
	
	
	var _hover = function() {
		console.log('hover');
		
		/*
		this.fc.tickHover = APP.Views.Index.drawCanvas.bind(APP.Views.Index);
		TweenLite.ticker.addEventListener('tick', this.fc.tickHover, false);
		
		var self = this;
		TweenLite.to(this.myCircle, 0.5, {radius:(this.myCircle.radius+10), onComplete:function(){
			TweenLite.ticker.removeEventListener('tick', self.fc.tickHover, false);
			self.fc.tickHover = null;
		}});
		*/
	};
	
	
	return Circle;
	
	
})(window);

