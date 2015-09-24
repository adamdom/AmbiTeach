		$(document).ready(function(){
			var left;
			var count = 0;
			function scroll()
			{		
					count++;
					$("#1").animate({left: ((window.innerWidth)*(0-count%4)).toString()},1000);
					$("#2").animate({left: ((window.innerWidth)*(1-count%4)).toString()},1000);
					$("#3").animate({left: ((window.innerWidth)*(2-count%4)).toString()},1000);
					$("#4").animate({left: ((window.innerWidth)*(3-count%4)).toString()},1000);
			}
			var check=setInterval(function(){scroll();},6001);	
		});