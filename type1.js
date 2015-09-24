var d = new Date();
var startTime;
var endTime = 50000;

function Canvas (id, relative, type)
{
	this.time_1 = new Array(2160);
	this.time_2 = new Array(2160);
	for(var i = 0; i < 2160; i++)
	{
		this.time_1[i] = new Array(100);
		this.time_2[i] = new Array(100);
		for(var u = 0; u < 1000; u++)
		{
			this.time_1[i][u] = -1;
			this.time_2[i][u] = -1;
		}
	}
	this.stamp = 0;
	this.c = document.getElementById(id);
	this.ctx = document.getElementById(id).getContext("2d");
	this.relative = relative;
	this.type = type;
	if(type <= 3 && type > 0)
	{
		document.getElementById(id).width = window.innerWidth * this.relative;
		document.getElementById(id).height = window.innerWidth * this.relative;
	}
	if(type == 4)
	{
		this.c.width = window.innerWidth * this.relative;
		this.c.height = window.innerWidth * this.relative;
	}
	
	this.width = this.c.width;
	this.height = this.c.height;
}

Canvas.prototype.redrawCanvas = function()
{
	this.c.width = window.innerWidth * this.relative;
	this.c.height = window.innerWidth * this.relative;
	this.width = window.innerWidth * this.relative;
	this. height = window.innerWidth * this.relative;
	this.ctx.beginPath();
	this.ctx.fillStyle = "#FFFFFF";
	this.ctx.fillRect(0,0,this.width, this.height);
	this.ctx.fill();
	this.ctx.strokeStyle = "#000000";
	for(var a = 0; a <= this.width*1.00; a+=Math.floor(this.width/50.0))
	{
			this.ctx.moveTo(a,this.height);
			this.ctx.lineTo(a,this.height*0.98);
			this.ctx.stroke();
			this.ctx.moveTo(0,a);
			this.ctx.lineTo(this.width*0.02,a);
			this.ctx.stroke();
	}
	
	for(var i = 1; i <= 5; i++)
	{
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000000";
		this.ctx.moveTo(i*this.width*0.2,this.height*0.950);
		this.ctx.lineTo(i*this.width*0.2,0);
		this.ctx.moveTo(this.width,i*this.height*0.2);
		this.ctx.lineTo(this.width*0.035,i*this.width*0.2);
		this.ctx.stroke();

		this.ctx.fillStyle = "#000000";
		this.ctx.font= (.05*this.width).toString() + "px Trebuchet MS";
		this.ctx.fillText(6-i,this.width*0.05,i*(this.width/5.0)-(.12*this.width));
		this.ctx.fillText(i,(i*(this.width/5.0))-17,this.width*0.965);
		
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000000";
		this.ctx.moveTo(i*this.width*0.2,this.height*0.950);
		this.ctx.lineTo(i*this.width*0.2,this.height);
		this.ctx.moveTo(0,i*this.height*0.2);
		this.ctx.lineTo(this.width*0.05,i*this.width*0.2);
		this.ctx.stroke();		
	}

}
Canvas.prototype.setPoint = function (x, y, r)
{
	if(this.type == 1)
		this.ctx.fillStyle = "rgba(" + 255 + "," + 55 + "," + 85 + ", 1.0)";
	if(this.type == 2)
		this.ctx.fillStyle = "rgba(" + 255 + "," + 166 + "," + 0 + ", 1.0)";
	if(this.type == 3)
		this.ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 100 + ", 1.0)";
	this.ctx.beginPath();
	this.ctx.arc(x, y, r, 0, 2 * Math.PI);
	this.ctx.fill();
	this.ctx.strokeStyle = "#000000";
	this.ctx.arc(x, y, r, 0, 2 * Math.PI);
	this.ctx.stroke();
}
function getData()
{
	
	var rand = new Array(100);
	
	for(var i = 0; i < 100; i++)
	{
		var temp = new Array(2);
		temp[0] = Math.random()*5;
		temp[1] = Math.random()*5;
		rand[i] = temp;
	}
	return rand;
}
Canvas.prototype.storeData = function (list)
{
	for(var i = 0; i < list.length; i++)
	{	
		if(list[i][0] != -1 && list[i][1] != -1)
		{
			this.time_1[this.stamp][i] = list[i][0];
			this.time_2[this.stamp][i] = list[i][1];
		}
	}
	this.stamp++;
}
Canvas.prototype.drawData = function ()
{
	var current = getData();
	this.storeData(current);
	for(var i = 0; i < current.length; i++)
	{
		this.setPoint(current[i][0]*(this.width/5.0),current[i][1]*(this.height/5.0),(this.height/50.0));
	}
}
Canvas.prototype.collection = function ()
{
	this.redrawCanvas();
	this.drawData();
}
Canvas.prototype.endCollection = function ()
{
	
}
Canvas.prototype.drawDial = function(center_x, center_y, width, height, color, angleOutOf360, radiusOfInnerFactor)
{
	angleOutOf360 = 360 - angleOutOf360;
	this.ctx.clearRect(0,0,this.width,this.height);
	this.c.height = window.innerWidth * this.relative;
	this.c.width = window.innerWidth * this.relative;
	this.width = window.innerWidth * this.relative;
	this.height = window.innerWidth * this.relative;
	this.ctx.beginPath();
	this.ctx.fillStyle = color;
	var vari = 2.0*Math.PI*(angleOutOf360/360.0);
	this.ctx.fill();
	
	this.ctx.arc(center_x,center_y,width * 0.48, 0, 2.0*Math.PI);
	this.ctx.fill();
	this.ctx.beginPath();
	this.ctx.fillStyle = "#FFFFFF";
	this.ctx.arc(center_x,center_y,width * 0.44, 0, 2.0*Math.PI);
	this.ctx.fill();
	

	this.ctx.beginPath();
	this.ctx.arc(center_x,center_y,width * 0.48, 0, 2.0*Math.PI);
	this.ctx.stroke();
	
	this.ctx.beginPath();
	this.ctx.strokeStyle = "#FFFFFF";
	this.ctx.arc(center_x,center_y,width * 0.44, 0, 2.0*Math.PI);
	this.ctx.stroke();
	
	this.ctx.strokeStyle = "#000000";
	
	this.ctx.globalCompositeOperation = 'destination-out';
	this.ctx.beginPath();
	this.ctx.moveTo(center_x + 0.5 * width, center_y);
	this.ctx.lineTo(center_x,center_y);
	this.ctx.lineTo(center_x+width*0.5*Math.cos(vari),center_y+width*0.5*Math.sin(vari));
	if(vari/(Math.PI * 2) <= 0.25)
	{
		this.ctx.lineTo(center_x + width * 0.5, center_y + 0.5 * height);
		this.ctx.lineTo(0,center_y + 0.5 * height);
		this.ctx.lineTo(0,0);
		this.ctx.lineTo(center_x + 0.5 * width,0);
	}
	else if(vari/(Math.PI * 2) <= 0.5)
	{
		this.ctx.lineTo(0,center_y + 0.5 * height);
		this.ctx.lineTo(0,0);
		this.ctx.lineTo(center_x + 0.5 * width,0);
	}
	else if(vari/(Math.PI * 2) <= 0.75)
	{
		this.ctx.lineTo(0,0);
		this.ctx.lineTo(center_x + 0.5 * width,0);
	}
	else
	{
		this.ctx.lineTo(center_x + 0.5 * width,0);
	}
	this.ctx.closePath();
	this.ctx.fill();
	
	this.ctx.fillStyle = "#000000";
	this.ctx.arc(center_x,center_y,width*0.5*radiusOfInnerFactor,0,Math.PI*2);
	this.ctx.fill();
	
	this.ctx.beginPath();
	this.ctx.fillStyle = "#FFFFFF";
	this.ctx.arc(center_x,center_y,width*0.5*radiusOfInnerFactor,0,Math.PI*2);
	this.ctx.fill();
	
	this.ctx.globalCompositeOperation = 'source-over';
	
	this.ctx.beginPath();
	this.ctx.fillStyle = "rgba(0,0,0,0.4)";
	this.ctx.arc(center_x,center_y,width*0.5*radiusOfInnerFactor,0,2*Math.PI);
	this.ctx.fill();
	
	
	
	this.ctx.beginPath();
	this.ctx.arc(center_x,center_y,width*0.5*radiusOfInnerFactor,0,Math.PI*2);
	this.ctx.stroke();
	
	this.ctx.beginPath();
	this.ctx.moveTo(center_x + width*.48, center_y);
	this.ctx.lineTo(center_x + width*0.5*radiusOfInnerFactor, center_y);
	this.ctx.stroke();
	
	this.ctx.beginPath();
	this.ctx.moveTo(center_x + Math.cos(vari)*0.48*width, center_y + Math.sin(vari)*.48*width);
	this.ctx.lineTo(center_x + Math.cos(vari)*0.5*radiusOfInnerFactor*width, center_y + width*Math.sin(vari)*0.5*radiusOfInnerFactor);
	this.ctx.stroke();
	
	this.ctx.fillStyle = "#FFFFFF";
	var secs = Math.floor((endTime-(d.getTime()-startTime))/1000);
	this.ctx.font= (.25*width).toString() + "px Trebuchet MS";
	var mid = ":";
	var end = "";
	var beg = "";
	if((secs - secs%60)/60 < 10)
		beg = " " + beg;
	if(secs%60 < 10)
			end = "0";
	
	this.ctx.fillText(beg+ (secs - secs%60)/60 + mid + end + secs%60 ,width*.18,height/1.7);
}
function start(length)
{
	startTime = d.getTime();
	endTime = length;
	var one = new Canvas("myCanvas", 0.215, 1);
	one.collection();
	var two = new Canvas("myCanvas2", 0.215, 2);
	two.collection();
	var three = new Canvas("myCanvas3", 0.215, 3);
	three.collection();
	var four = new Canvas("myCanvas4", 0.15, 4);
	four.drawDial(four.width/2, four.height/2, four.width, four.height, "#FFFFFF", ((d.getTime() - startTime)/endTime)*360, .8);
	var aa = setInterval(function(){d = new Date(); four.drawDial(four.width/2, four.width/2, four.width, four.height, "#FFFFFF", ((d.getTime() - startTime)/(endTime))*360.0, .8);},100);
	var bb = setInterval(function() {one.collection(); two.collection(); three.collection(); five.collection();},2500);
	setInterval(function(){
		d = new Date();
		if(endTime - ((d.getTime() - startTime)) < 1001)
		{
			clearInterval(aa);
			clearInterval(bb);
		}
	
	},100);
}
start(1000*60);

