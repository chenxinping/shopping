// JavaScript Document


function documentReady(fn){
	if(document.addEventListener)document.addEventListener('DOMContentLoaded', fn, false);  //dom内容加载完毕
	else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
};



var tools={
	
	//页面居中中心显示-----------------------------------------------------------------------------
	showCenter:function(obj){
		obj.style.display="block";
		function center(){
			var screenW=document.documentElement.clientWidth;
			var screenH=document.documentElement.clientHeight;
			obj.style.left=(screenW-obj.offsetWidth)/2+'px';
			obj.style.top=(screenH-obj.offsetHeight)/2+'px';
		};
		center();
		
		window.onresize=function(){
			center();
		};
	},
	
	
	
	//拖拽功能------------------------------------------------------------------------------------
	drag:function (obj,title){//对象  对象内部的标题
		title=title || obj;
		title.onmousedown=function(ev){
			ev=ev||window.event;
			//计算偏移距离
			var disX=ev.clientX-obj.offsetLeft;    //distance 距离
			var disY=ev.clientY-obj.offsetTop; 
			//开始拖动------------------------------------------
			document.onmousemove=function(ev){
				ev=ev||window.event;
				var l=ev.clientX-disX; //鼠标x
				var t=ev.clientY-disY;//鼠标y	
				console.log(l,t);
				//先判断,后赋值
				if(l<0){
					l=0;
				};
				if(t<0){
					t=0;
				};
				var screenW=document.documentElement.clientWidth;
				var screenH=document.documentElement.clientHeight;
				if(l>screenW-obj.offsetWidth){
					l=screenW-obj.offsetWidth;
				};
				if(t>screenH-obj.offsetHeight){
					t=screenH-obj.offsetHeight;
				};
				obj.style.left=l+"px";
				obj.style.top=t+"px";
			};
			
			//停止拖动 动作写在document上-----------------------------
			document.onmouseup=function(){
				document.onmousemove=null;
			};
			//阻止默认事件
			return false;
		};
	},
	
	
	//清除空白节点--------------------------------------------------------------------------------
	cleanSpace:function (elm) {
		for(var i=0; i<elm.childNodes.length; i++){   
			var node = elm.childNodes[i];
			if(node.nodeType==3 && !/\S/.test(node.nodeValue)) node.parentNode.removeChild(node);   
		}   
	},   
	
	//插入节点---------------------------------------------------------------------------------------
	insertAfter:function (newEl, targetEl){
		var parentEl = targetEl.parentNode;//找到父级元素
		if(this.get_lastChild(parentEl) == targetEl) parentEl.appendChild(newEl);
		else parentEl.insertBefore(newEl,this.get_nextSibling(targetEl));
	},
	
	
	//过滤文本和空格
	get_firstChild:function (elm){//父节点
		var x=elm.firstChild;
		while (x.nodeType!=1){
			x=x.nextSibling;//把自己变成节点，while继续向前查找
		}
		return x;
	},
	
	get_lastChild:function (elm){
		var x=elm.lastChild;
		while (x.nodeType!=1){
			x=x.previousSibling;//把自己变成节点，while继续向前查找
		}
		return x;
	},
	
	get_previousSibling:function (elm){
		var x=elm.previousSibling;
		while (x.nodeType!=1){
			x=x.previousSibling;//把自己变成节点，while继续向前查找
		}
		return x;
	},
	
	
	get_nextSibling:function (elm){
		var x=elm.nextSibling;
		while (x.nodeType!=1){
			x=x.nextSibling;
		}
		return x;
	},
	
	
	//计算offsetTop---------------------------------------------------------------------
	offsetTop:function (elm){ //span和图片的父级盒子
		var top = elm.offsetTop; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			top += parent.offsetTop; 
			parent = parent.offsetParent; 
		}; 
		return top; 
	}, 
	
	
	//计算offsetLeft-----------------------------------------------------------------------
	offsetLeft:function(elm){ //span和图片的父级盒子
		var left = elm.offsetLeft; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			left += parent.offsetLeft; 
			parent = parent.offsetParent; 
		}; 
		return left; 
	},


	//判断上下半屏---------------------------------------------------------------------------------
	halfScreen:function(elm){
		var scroll_top=document.documentElement.scrollTop || document.body.scrollTop;
		var top=this.offsetTop(elm);
		var screen_h=document.documentElement.clientHeight;
		return top<scroll_top+screen_h/2 ? true : false;
	},
	
	
	//事件监听--------------------------------------------------------------------------------------
	addEvent:function(obj,ev,fn){
		obj.attachEvent? obj.attachEvent('on'+ev,fn):obj.addEventListener(ev,fn,true);
	},
	
	
	//判断是否有父级----------------------------------------------------------------------------------
	isParent:function (oParent,obj){
		while(obj){
			if(obj==oParent)return true;
			obj=obj.parentNode;
		}	
		return false;
	},


	//鼠标移入--------------------------------------------------------------------------------------
	mouseenter:function (obj,fn){
		var _this=this;
		obj.onmouseover=function(ev){
			var oEv=ev||event;
			var formElm=oEv.formElm||oEv.relatedTarget;
			if( _this.isParent(this,formElm) ) return;
			fn && fn();
		};
	},
	
	
	//鼠标移出--------------------------------------------------------------------------------------------
	mouseleave:function (obj,fn){
		var _this=this;
		obj.onmouseout=function(ev){
			var oEv=ev||event;
			var toElm=oEv.toElm||oEv.relatedTarget;
			if( _this.isParent(this,toElm) ) return;
			fn && fn();
		};
	},
	
	
	//----------------------------------------------------------------------------
	getByClass:function (oParent,cls){
		var arr=[];
		if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
		else{
			var aEl=oParent.getElementsByTagName('*');//所有标签
			for(var i=0;i<aEl.length;i++){
				if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);//向数组中添加
			}
		return arr;
		}
	},
	
		
	//addClass---------------------------------------------------------------------------------------
	addClass:function (obj,newClassName){
		return obj.className+=" "+newClassName;
	},
	
	//--------------------------------------------------------------------------------------------
	addClass:function(obj, className){
		if(elm.length){
			for(var i=0; i<obj.length;i++){
				obj[i].className+=' '+className; 
			}
		}else{
			obj.className+=' '+className; 
		}
	},
	
	
	//----------------------------------------------------------------------------------------
	removeClass:function (obj,className){
		if(obj.length){
			for(var i=0; i<obj.length;i++){
				obj[i].className=obj[i].className.replace(new RegExp(className,'g'),'');
			};
		}else{
			obj.className=obj.className.replace(new RegExp(className,'g'),'');
		};
	},
	
	
	//滚轮-----------------------------------------------
	"mouseWheel":function(obj,fn){
		if(window.navigator.userAgent.indexOf('Firefox')!=-1){	
			obj.addEventListener('DOMMouseScroll',wheelFn,false);
		}else obj.onmousewheel=wheelFn;
		
		function wheelFn(ev){
			var oEv=ev||event;
			var direct=oEv.wheelDelta ? oEv.wheelDelta<0 : oEv.detail>0;
			fn && fn(direct);//将direct作为参数传递出去
			if(window.event){//IE
				oEv.returnValue = false; //ie 阻止默认事件
				return false;//ie9 以上阻止回车
			}
			else{
				oEv.preventDefault();//阻止默认事件 firefox
			}
		};
	},
	
	
	//读取样式------------------------------------------------------------------------
	getStyle:function (obj,styleName){
		var value=obj.currentStyle ? obj.currentStyle[styleName] : getComputedStyle(obj,false)[styleName];
		if(styleName=='opacity'){
			value=Math.round(parseFloat(value)*100);	
		}else{
			return parseInt(value);	
		};
		return value;
	},
	
	

	//对象运动模式动画 封装函数------------------------------------------------------------------------
	move:function (obj,modeJson,fn,time){//对象  运动模式  终点  速度
	
		//为传入的时间设定预设参数
		var def_speed={
			soon:600,
			faster:800,
			normal:1000,
			slow:2000,
			veryslow:3000
		};
		
		if(time){
			if(typeof time=='string'){
				time=def_speed[time];
			}else{
				time=time;	
			};
			
		}else{
			time=def_speed.normal;	
		};
		
		/*var start=getStyle(obj,mode);//自动获取初始值
		var dis=end-start;//移动的距离*/
		
		var start={};
		var dis={};
		
		for(var key in modeJson){
			start[key]=this.getStyle(obj,key);//自动获取初始值
			dis[key]=modeJson[key]-start[key];//移动的距离
		};
		
		var count=parseInt(time/30)  //时间分段
		
		var i=0;
		
		clearInterval(obj.timer);
		
		obj.timer=setInterval(function(){
			i++;
			var a=1-i/count;//计算缓动公式
			for(var key in modeJson){
				var m_dis=start[key]+dis[key]*(1-a*a*a);
					if(key=='opacity'){
						obj.style.opacity=m_dis/100;
						obj.style.filter='alpha(opacity:"+m_dis+")';//兼容IE8
					}else{
						obj.style[key]=m_dis+'px';
				};
				
			};
			
			if(i==count){
				clearInterval(obj.timer);
				fn && fn();
			};
		},30);
	},
	
	
	//------------淡进  淡出-------------------------------------------
	move1:function(obj,moveMode,end,stopTime,fn){//对象 终点 运动终点  运动方式
		
		//距离=终点-起点;
		var start=this.getStyle(obj, moveMode);//起点数值
	
		var dis=end-start;//距离 distance
		
		//定时器---------------------------------------------
		var count=parseInt(stopTime/30);////次数
		var n=0;//步进
	
		clearInterval(obj.timer);//使用对象属性，定义计时器变量
		
		obj.timer=setInterval(function(){
			n++;
			
			var a=1-n/count;  //a的值会越来越小
			var step_dis=start+dis*(1-a*a*a);
			
			if(moveMode=='opacity'){//透明
				obj.style.filter='alpha(opacity:'+step_dis+')';
				obj.style.opacity=step_dis/100;
			}
			else{//其他
				obj.style[moveMode]=step_dis+'px';
			}
			
			//取消定时器
			if(n==count){
				clearInterval(obj.timer);
				fn && fn();
			};
		
		},30);
	}

	
	
}







