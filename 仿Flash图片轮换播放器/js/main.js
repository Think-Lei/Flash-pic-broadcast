// 先封装一个根据类名获取元素的小函数，通常在比较复杂的项目中使用类名来获取元素是比较合适的
function getByClass(oParent,sClass){
  var aEle=document.getElementsByTagName('*');
  var aResult=[];

  for(var i=0;i<aEle.length;i++){
    if(aEle[i].className==sClass){
      aResult.push(aEle[i]);
    }
  }
  return aResult;
}

var oDiv=document.getElementById("wrapper");
var oBtnPrev=getByClass(oDiv,'prev')[0];
var oBtnNext=getByClass(oDiv,'next')[0];
var oMarkLeft=getByClass(oDiv,'mark_left')[0];
var oMarkRight=getByClass(oDiv,'mark_right')[0];

var oDivSmall=getByClass(oDiv,'small_image')[0];
var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
var aLiSmall=oDivSmall.getElementsByTagName('li');
var oBig=getByClass(oDiv,'big_image')[0];
var aLiBig=oBig.getElementsByTagName('li');
var nowzIndex=2;
var now=0;

oUlSmall.style.width=aLiSmall.length*aLiSmall[0].offsetWidth+'px';

// 左右按钮
// 当鼠标移入左边区域的时候，左箭头出现
oBtnPrev.onmouseover=oMarkLeft.onmouseover=function(){
  startMove(oBtnPrev,'opacity',100);
}
// 当鼠标移出左边区域的时候，左箭头消失
oBtnPrev.onmouseout=oMarkLeft.onmouseout=function(){
  startMove(oBtnPrev,'opacity',0);
}
// 当鼠标移入右边区域的时候，右箭头出现
oBtnNext.onmouseover=oMarkRight.onmouseover=function(){
  startMove(oBtnNext,'opacity',100);
}
// 当鼠标移出右边区域的时候，右箭头消失
oBtnNext.onmouseout=oMarkRight.onmouseout=function(){
  startMove(oBtnNext,'opacity',0);
}

//封装一个展示图片的函数
function tab(){
  aLiBig[now].style.zIndex=nowzIndex++; //将对应的大图的展示优先级调到目前最先
    aLiBig[now].style.height=0;
    startMove(aLiBig[now],'height',320); //造成图片下拉的效果
    for(var i=0;i<aLiSmall.length;i++){
      startMove(aLiSmall[i],'opacity',60); //一开始的时候让所有小图都处于透明的状态
    };
    startMove(aLiSmall[now],'opacity',100); //使当前的小图处于点亮的状态

    if(now==0){
      startMove(oUlSmall,'left',0);
    }
    else if(now==aLiSmall.length-1){
      startMove(oUlSmall,'left',-(now-2)*aLiSmall[0].offsetWidth);
    }
    else{
      startMove(oUlSmall,'left',-(now-1)*aLiSmall[0].offsetWidth);
    }
}

// 大图切换
for(var i=0;i<aLiSmall.length;i++){
  aLiSmall[i].index=i; //使每一个小图都有自己的一个序号，根据序号找到对应的大图
  aLiSmall[i].onclick=function(){  //为每一个小图绑定一个点击事件，点击即可切换到对应的大图
    if(this.index==now)return;
    now=this.index;
    tab();
  };
  aLiSmall[i].onmouseover=function(){
    startMove(this,'opacity',100);
  };
  aLiSmall[i].onmouseout=function(){
    if(this.index!=now){  //当当前点击的大图序号与目前正在展示的大图序号不一样时，使当前正在展示的大图对应的小图变暗
      startMove(this,'opacity',60);
    }
  };
}

//左右按钮切换大图
oBtnNext.onclick=function(){
  now++;
  if(now==aLiSmall.length){
    now=0;
  };
  tab();
};
oBtnPrev.onclick=function(){
  now--;
  if(now==-1){
    now=aLiSmall.length-1;
  };
  tab();
};

//自动播放+当鼠标移入时暂停自动播放，当鼠标移出时再开始自动播放
var timer=setInterval(oBtnNext.onclick,2000);
oDiv.onmouseover=function(){
  clearInterval(timer);
};
oDiv.onmouseout=function(){
  timer=setInterval(oBtnNext.onclick,2000);
};
