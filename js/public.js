// JavaScript Document
documentReady(function(){
	
	//侧边导航---------------------
	
	function nav(){
		//左侧选择菜单相关对象
		var oWrap=document.getElementById('wrap');
		var oUl=oWrap.getElementsByTagName('ul')[0];
		var aLi=oUl.getElementsByTagName('li');
		
		//右侧显示框相关对象
		var oPop=document.getElementById('popup');
		var aCate=oPop.getElementsByClassName('cate');
		var timer=null;
		var dun=null;
		//清空所有ac 隐藏所有aCate oPop
		function run(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className='';
				aCate[j].style.display='none';
			};
			oPop.style.display='none';
		};
		
		//给左侧所有的li绑定事件
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			
				//鼠标进入Li
				aLi[i].onmouseenter=function(){
					clearInterval(timer);
						run();//调用
						this.className='ac';
						oPop.style.display='block';
						aCate[this.index].style.display='block';
				};
			
			//鼠标离开 Li
			aLi[i].onmouseleave=function(){
				timer=setInterval(function(){
					run();
				},20);
			};
			
			//鼠标进入oPop
			oPop.onmouseenter=function(){
				clearInterval(timer);
			};
			
			//鼠标离开oPop
			oPop.onmouseleave=function(){
				run();
			};
		};
		
	};//侧边导航结束----------
	
	nav();//创建即调用
	
	//左侧浮动导航
	function FloorList(){
		var aTab=document.getElementsByClassName('tab');
		var LocationFloorList=document.getElementsByClassName('LocationFloorList')[0];
		var aLi=LocationFloorList.getElementsByTagName('li');
		var aFloor=document.getElementsByClassName('tab');
		var arr=[];
			
		//-------------------------------------------------
			
		for(var i=0; i<aFloor.length; i++){
			var json={};
			json.name=i;
			json.offsetTop=aFloor[i].offsetTop;
			arr.push(json);
		};
		
		//console.log(arr)
		
		window.onscroll=function(){
			//显示楼层编号-------------------------------------------------
			var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrolltop>1000){
				LocationFloorList.style.display='block';
			}else{
				LocationFloorList.style.display='none';
			};
			//设置楼层标题图标样式
			for(var i=0;i<aTab.length;i++){
				var oI=aTab[i].getElementsByTagName('i')[0];
				if(scrolltop>=aTab[i].offsetTop-400 && scrolltop<=(aTab[i].offsetTop+aTab[i].offsetHeight) ){
					oI.className='ac';
				}else{
					oI.className='';
				};
			};
			
			// 根据楼层滚动位置，定位编号------------------------------------------------
			var last_arr=[];
			for(var j=0; j<arr.length; j++){
				if(arr[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
					last_arr.push(arr[j].name);
				}
			};
			
			//console.log(last_arr);
			var li_index=last_arr[last_arr.length-1];
	
			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			//页面上部如果有内容，没有楼层会放入新数组，产生错误
			last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
		};
		
		//点击编号，跳转到相对楼层-----------------------------------------------
		for(var i=0; i<aFloor.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				move(start,end)
			}
		};
		//move-------------------------------------------------------
		var timer;
		function move(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var step_dis=start+dis*(1-a*a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(timer);
				};
			},30)
		};
	};
	
	FloorList();//创建即调用
	





	
	

})

