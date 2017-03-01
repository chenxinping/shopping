// JavaScript Document

documentReady(function(){
	
//banner图滑动切换----------picSwitch start----------------------------
	
	function picSwitch(){
		//相关对象
		var oDiv=document.getElementById('bannerA');
		var oUl=oDiv.children[0];
		var aLi=oUl.children;
		
		var aBtn=oDiv.children[1].children;
		var li_w=aLi[0].offsetWidth;
		
		oUl.style.width=li_w*aLi.length+'px';//ul的宽度

		var prevBtn=oDiv.children[2];//前一张
		var nextBtn=oDiv.children[3];//下一张
		
		var iNow=0;
		var timer=null;
		//开定时器 让图片自动滑动
		function start(){//函数封装
			timer=setInterval(function(){
				for(var j=0; j<aBtn.length;j++){
					aBtn[j].className='';
				};
				aBtn[iNow].className='ac';
				tools.move(oUl,{'left':-li_w*iNow})	
				iNow++;
				if(iNow==aBtn.length){
					iNow=0;
				};
			},2000);
		};
		start();//创建即调用
		
		//鼠标进入盒子 自动切换关闭 显示前后切换图标
		oDiv.onmouseover=function(){
			prevBtn.style.display='block';
			nextBtn.style.display='block';
			clearInterval(timer);
		};
		oDiv.onmouseout=function(){
			prevBtn.style.display='none';
			nextBtn.style.display='none';
			start();
		};
		
		
		//函数封装
		function run(){
			for(var j=0; j<aBtn.length;j++){
				aBtn[j].className='';
			};	
			aBtn[iNow].className='ac';
			tools.move(oUl,{'left':-li_w*iNow})	
		};
		
		
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].index=i;
			aBtn[i].onclick=function(){//点击序号跳转对应图片
				iNow=this.index;
				run();//函数调用
			};
		};
		
		prevBtn.onclick=function(){//上一张
			iNow--;
			if(iNow<0)iNow=aLi.length-1;
			tools.move(oUl,{'left':-li_w*iNow})
			run();//函数调用
		};
		
		
		nextBtn.onclick=function(){//下一张
			iNow++;
			if(iNow>=aLi.length){iNow=0};
			tools.move(oUl,{'left':-li_w*iNow})
			run();//函数调用
		};
	};//-------------banner picSwitch end-----------------------
	
	picSwitch();
	
	
	
//猜你喜欢----------Exchange start----------------------------------------------
	function Exchange(){
		var oDiv=document.getElementById('main2');
		var oBtn=oDiv.children[0].children[1];//切换按钮
		var oList=oDiv.getElementsByClassName('pic')[0];
		var aList=oList.getElementsByClassName('clearfix');//切换对象
		//console.log(aList)
		//alert(aList)
		var n=1;//定义显示框初始值
		oBtn.onclick=function(){//为按钮绑定事件
			for(var i=0;i<aList.length;i++){//先隐藏所有的list
				aList[i].className='clearfix hide';
			};
			
			aList[n].className='clearfix';//点击按钮，切换到第二个显示框
			n++;
			
			if(n>=aList.length){n=0};//如果n值 大于等于list的长度 n=0
			//console.log(n)
		};
		
	};//--------------Exchange end-----------------
	
	Exchange();//创建即调用
	
	
	

//选项卡切换----------Tab start---------------------------------------------------------
	function tab(){
		function run(n){
			var aTab=document.getElementsByClassName('tab');
			var oTitle=aTab[n].children[0];
			var oUl=oTitle.children[1];
			var aLi=oUl.children;
			var aTabItem=aTab[n].children[1].children;
			
			//console.log(aTabItem)
			for(var i=0;i<aLi.length;i++){
				aLi[i].index=i;
				aLi[i].onclick=function(){
					for(var j=0;j<aLi.length;j++){
						aLi[j].className='';
						aTabItem[j].className='tabItem hide clearfix';
					};
					this.className='ac';	
					aTabItem[this.index].className='tabItem clearfix';
				};
			};
			
		};	
		var aTab=document.getElementsByClassName('tab');
		for(var k=0;k<aTab.length;k++){
			run(k);
		};
	};
	//选项卡切换----------Tab end--------------------

	tab();//创建即调用


})

