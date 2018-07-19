
   function getStyle(obj,name){ //用来获取非行间样式，下面的做法是为了兼容浏览器
     if(obj.currentStyle){  //如果浏览器支持currentStyle
       return obj.currentStyle[name];
     }
     else{
       return getComputedStyle(obj,false)[name];//如果浏览器支持getComputedStyle
     }
   }

function startMove(obj,atrr,iTarget){  //此时的运动框架增加了一个属性的参数，用来给不同的属性带来运动效果
  clearInterval(obj.timer);
  obj.timer=setInterval(function(){
    var cur=0;
    if(atrr=='opacity'){  //opacity的值是在0到1之间的小数，如果用parseInt就只能变成0了，所以要区别对待
      cur=Math.round(parseFloat(getStyle(obj,atrr))*100); //这里使用Math.round（）可以解决浏览器误差的问题
    }
    else{
      cur=parseInt(getStyle(obj,atrr));
    }

    var speed=(iTarget-cur)/6;
    speed=speed>0?Math.ceil(speed):Math.floor(speed);

    if(cur==iTarget){
      clearInterval(obj.timer);
    }
    else{
      if(atrr=='opacity'){
        obj.style.filter='alpha(opacity:'+(cur+speed)+')';
        obj.style.opacity=(cur+speed)/100;
      }
      else{
        obj.style[atrr]=cur+speed+'px';
      }
    }
  },30);
};
