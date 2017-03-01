// JavaScript Document

documentReady(function(){
	
//菜单栏--------------nav  start---------------------------------------------------------
	function nav_list(){
		var oClassBtn=document.getElementById('classIfication');
		var oDiv= document.getElementById('nav');
		var timer;
		
		//点击按钮  出现菜单
		oClassBtn.onclick=function(){
			clearInterval(timer);
			oDiv.className='main1 clearfix';
		};
		
		//鼠标离开按钮  盒子延时消失
		oClassBtn.onmouseout=function(){
			timer=setInterval(function(){
				oDiv.className='main1 clearfix hide';
			},20);
		};
		//鼠标进入菜单盒子  定时器关闭
		oDiv.onmouseover=function(){
			clearInterval(timer);
		};
		//鼠标离开菜单盒子  盒子隐藏
		oDiv.onmouseleave=function(){
			oDiv.className='main1 clearfix hide';
		};
		
	};
	nav_list();
	
//放大镜--------------Magnifier  start---------------------------------------------------------
	function Magnifier(){
		
//-------------找对象--------------------------
		var bannerBox=document.getElementById('banner_box');
		var mirrorBox=document.getElementById("mir");
		var oSpan=bannerBox.getElementsByTagName('span')[0];
		var bigImg=mirrorBox.getElementsByTagName("img")[0];
		var bannerImg=document.getElementById('bannerImg');
		
		
		
//--------------整理图片(将banner显示图和bigImg整理成数组形式)-------------------------	
		var bannerImg_arr=["57ad359dNd4a6f130_2","57b12a31N8f4f75a3_2","57ad8846N64ac3c79_2"];//banner 显示图
		var bigImg_arr=["57ad359dNd4a6f130_3","57b12a31N8f4f75a3_3","57ad8846N64ac3c79_3"];//大显示图
		
		
//-------------当鼠标放到小图上，banner位置显示对应的banner图-------------------------

		var picItems=document.getElementById('picItems');
		var aLi=picItems.getElementsByTagName('li');
		
		for(var i=0;i<aLi.length;i++){
			(function(n){
				aLi[i].onmouseover=function(){
					for( var j=0; j<aLi.length; j++){
						aLi[j].className="";
						bannerImg.src=""
						bigImg.src=""
					};
					this.className='ac';
					bannerImg.src="images/"+bannerImg_arr[n]+".jpg"
					bigImg.src="images/"+bigImg_arr[n]+".jpg"
				};
			}(i))
		};

//------------当鼠标进入banner图区域时，放大镜显示框出现(制作放大镜效果)--------------------
		bannerBox.onmousemove=function(ev){
			ev=ev||event;
			
			var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;//滚动条高度
			var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;//滚动左边距
			mirrorBox.style.display=oSpan.style.display="block";//当鼠标进入bannerBox后，显示oSpan和显示框
			//找到鼠标进入盒子的坐标
			var l=ev.clientX+scrollLeft-tools.offsetLeft(bannerBox)-oSpan.offsetWidth/2;
			var t=ev.clientY+scrollTop-tools.offsetTop(bannerBox)-oSpan.offsetHeight/2;
			
			//限制oSpan的移动范围
			if(l<0){l=0};
			if(t<0){t=0};
			if(l>bannerBox.offsetWidth-oSpan.offsetWidth){l=bannerBox.offsetWidth-oSpan.offsetWidth};
			if(t>bannerBox.offsetHeight-oSpan.offsetHeight){t=bannerBox.offsetHeight-oSpan.offsetHeight};
			
			//计算比率
			var rate_l=l/(bannerBox.offsetWidth-oSpan.offsetWidth);
			var rate_t=t/(bannerBox.offsetHeight-oSpan.offsetHeight);
			
			//移动oSpan
			oSpan.style.left=l+'px';
			oSpan.style.top=t+'px';
			
			//移动img
			bigImg.style.left=-rate_l*(bigImg.offsetWidth-mirrorBox.offsetWidth)+'px';
			bigImg.style.top=-rate_t*(bigImg.offsetHeight-mirrorBox.offsetHeight)+'px';
		};
		
//------------当鼠标离开banner图区域时，oSpan和放大区域隐藏--------------------		
		bannerBox.onmouseout=function(){
			mirrorBox.style.display=oSpan.style.display="none";
		};
		
	};//------------Magnifier  end-----------------------------
	
	Magnifier();//创建即调用
	
	
	
//选择部分的-------------choose start------------------------------------------
	function choose(){
		//这个层级比较多，所以需要分层级去寻找对象
		var chooseShop=document.getElementById("chooseShop");
		var aDl=chooseShop.getElementsByTagName('dl');
		
		//找到每一个dl中的dd
		for( var i=0; i<aDl.length; i++){
			//鼠标划过对应的dl中的dd
			aDl[i].onmouseover=function(){
				var oDd=this.getElementsByTagName('dd')[0];
				var aA=oDd.getElementsByTagName('a');
				var aI=oDd.getElementsByTagName('i');
				
				//对于当前这个dd下面所有的a标签  点击a标签  清空所有的类，i标签显示   同时给自己加上ac类  对应的i标签显示
				for( var j=0; j<aA.length; j++){
					(function(n){
						aA[j].onclick=function(){
							for( var q=0; q<aA.length; q++){
								aA[q].className="";
								aI[q].style.display='none';
							};
								this.className="ac";
								aI[n].style.display='block';
						};
					}(j))
				};
			};
		};
	};//-------choose end----------------------
	
	choose();//创建即调用
	

//购物车数量-------buy start----------------------------
	function buy(){
		
		//找到按钮对象
		var addBtn=document.getElementById('addBtn');//加
		var redBtn=document.getElementById('redBtn');//减
		var numberBtn=document.getElementById('numberBtn');//数字显示框
		
		if(numberBtn.value<=1){//预先定义鼠标的样式
				redBtn.style.cursor='not-allowed';
			};
		
		addBtn.onclick=function(){//点击add  value递加
			numberBtn.value++;
			redBtn.style.cursor='pointer';
		};
		
		redBtn.onclick=function(){//点击red  value递减，并且当value小于等于1时 判断
			numberBtn.value--;
			if(numberBtn.value<=1){
				numberBtn.value=1;
				redBtn.style.cursor='not-allowed';
			};
		};
	};//----------buy end---------------------------
	
	buy();//创建即调用
		
		
//----------产品推荐  选项卡--------product start-----------------

	function product(){
		
		//找到相关对象
		var navList=document.getElementById("navList");
		var aLi=navList.getElementsByTagName('li');//所有的li 标题
		var midWarp=document.getElementById("midWarp");
		var aMidInner=midWarp.getElementsByClassName("mid_inner");//对应的显示框
		
		//为每一个li绑定事件
		for( var i=0; i<aLi.length; i++){
			(function(n){
				aLi[i].onclick=function(){
					for( var j=0; j<aLi.length; j++){
						aLi[j].className="";
						aMidInner[j].className="mid_inner hide";
					};
					this.className="ac";
					aMidInner[n].className="mid_inner";
				};
			}(i))
		};
	};//---------------product end------------
	product();//创建即调用


/*//--------mid 切换图片 --------------
	function switchPic(){
		var productList=document.getElementById('productList');
		var aProduct=productList.children;
		var li_w=hxsd_tools.getStyle(aProduct[0],"width")+hxsd_tools.getStyle(aProduct[0],"marginRight");
		var oBox=document.getElementById('box');
		productList.style.width=li_w*aProduct.length+'px';
		var pBtn=document.getElementById('arrowPrev');
		var nBtn=document.getElementById('arrowNext');
		var iNow=0;
		
		//点击pbtn
		pBtn.onclick=function(){
			iNow--;
			if(iNow<0){
				iNow=0;
			};
			hxsd_tools.move(productList,{"left":-iNow*li_w})
		};
		nBtn.onclick=function(){
			iNow++;
			if(iNow>=(productList.offsetWidth-oBox.offsetWidth)/li_w){
				iNow=(productList.offsetWidth-oBox.offsetWidth)/li_w;
			};
			hxsd_tools.move(productList,{"left":-iNow*li_w});
	
		};
		
	};
	switchPic();
	
*/	




})

