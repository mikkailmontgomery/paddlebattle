function rectangle(left,top,right,bottom){//(top,left,bottom,right){
  this.top = top;
  this.left= left;
  this.bottom= bottom;
  this.right = right;
  //return this;
}

function circle(top,left,radius){
 this.top = top;
 this.left = left;
 this.radius = radius;
}

function control(rect){
  this.rect = rect;
  //this.touchdown = function(){};
  //this.touchup = function(){};
}

function controlcircle(x1,y1,r){
    this.left=false;
    this.right=false;
    this.up=false;
    this.down=false;
    this.circlex = x1;
    this.circley = y1;
    this.radius = r;
    var circlex = x1;
    var circley = y1;
    var radius = r;
    var touches = new Array();
    this.drawcontrol = function(context)
    {
          context.fillStyle = 'green';
          context.font="20px Georgia";  
          context.beginPath();
          context.arc(circlex, circley, radius, 0, 2 * Math.PI, false);
          context.fillStyle = 'green';
          //context.fill();
          context.lineWidth = 5;
          context.strokeStyle = '#003300';
          context.stroke();
          context.closePath();
          if (this.left == true){
            context.beginPath();
          
            context.arc(circlex, circley, radius, 0.75 * Math.PI, 1.25 * Math.PI, false);
            context.lineWidth = 5;
            context.strokeStyle = 'lightgreen';
            context.stroke();
            context.closePath();
          }
          if (this.up == true){
            context.beginPath();
            
            context.arc(circlex, circley, radius, 1.25 * Math.PI, 1.75 * Math.PI, false);
            context.lineWidth = 5;
            context.strokeStyle = 'lightgreen';
            context.stroke();
            context.closePath();
          }
          if (this.right == true){
            context.beginPath();
            
            context.arc(circlex, circley, radius, 1.75 * Math.PI, 0.25 * Math.PI, false);
            context.lineWidth = 5;
            context.strokeStyle = 'lightgreen';
            context.stroke();
            context.closePath();
          }
          if (this.down == true){
            context.beginPath();
            
            context.arc(circlex, circley, radius, 0.25 * Math.PI, 0.75 * Math.PI, false);
            context.lineWidth = 5;
            context.strokeStyle = 'lightgreen';
            context.stroke();
            context.closePath();
          }
    }
    this.movement = function(x,y,id)
    {
          if(id == 0){
            this.left = false;
            this.right = false;
            this.up=false;
            this.down=false;
          }
          for (i =0;i<touches.length;i++)
          {
            if (touches[i] == id)
            {
              this.left = false;
              this.right = false;
              this.up=false;
              this.down=false;
            }
          }
          var angle = calcangle(x,y,circlex,circley);
          if (Math.pow(x-(circlex),2) + Math.pow(y-(circley),2) < Math.pow(radius,2))
          {

      var touchfound = false;
        for (i =0;i<touches.length;i++)
        {
            if (touches[i] == id)
            {
              touchfound = true;
            }
        }
        if(touchfound == false)
        {
          touches.push(id); 
        }



          //   for (i =0;i<touches.length;i++)
          //   {
          //       if (touches[i] == id)
          //       {
              
          //       }
          //       else
          //       {
          //         //alert("e");
          //        touches.push(id); 
          //       }
          //   }
          // if(touches.length == 0){
          //   touches.push(id); 
          // }
                if(0 <= angle && angle <= 22.5){
                  this.right = true;
                }
                  if(22.5 <= angle && angle <= 67.5){
                  this.right = true;
                  this.down = true;
                }
                  if(67.5 <= angle && angle <= 112.5){
                  this.down = true;
                }
                  if(112.5 <= angle && angle <= 157.5){
                  this.left = true;
                  this.down = true;
                }
                  if(157.5 <= angle && angle <= 202.5){
                  this.left = true;
                }
                  if(202.5 <= angle && angle <= 247.5){
                  this.left = true;
                  this.up = true;
                }
                  if(247.5 <= angle && angle <= 292.5){
                  this.up = true;
                }
                  if(292.5 <= angle && angle <= 337.5){
                  this.right = true;
                  this.up = true;
                }
                  if(337.5 <= angle && angle <= 360){
                  this.right = true;
                }
            }
    }
    this.movementend = function(x,y,id){
          for (i =0;i<touches.length;i++)
          {
                if (touches[i] == id)
                {
                          this.left = false;
                          this.right = false;
                          this.up=false;
                          this.down=false;
                          touches.splice(i,1);
                          return;
                }
          }
    }
}

function calcangle(x1,y1,x2,y2){
  //returns angle in degrees.  used to calc line angle for circle center to click.
  var degrees = Math.atan2(y1-y2,x1-x2) * (180 / Math.PI);
  if (Math.abs(degrees) == degrees){
      //  return degrees;
  }
  else
  {
  return (180 - Math.abs(degrees)) + 180;
  }
  return Math.atan2(y1-y2,x1-x2) * (180 / Math.PI);
}

function controlrect(rleft,rtop,rright,rbottom){
  this.myrect = new rectangle(rleft,rtop,rright,rbottom);
  this.left = false;
  this.middle = false;
  this.right = false;
  this.leftimg = new Image();
  this.leftimg.src = 'compbullitmask.gif';
  this.rightimg = new Image();
  this.middleimg = new Image();
  this.middleimg.src = 'compbullitmask.gif';
  this.rightimg.src = 'compbullitmask.gif';
  this.leftcount =0;
  this.middlecount=0;
  this.rightcount=0;

  var touches = new Array();
  this.touchesarr = new Array();
  this.addtouches = function(event)
  {
    touchesarr.push(event);
  }
  this.drawcontrol = function(context)
  {
    context.drawImage(
      this.leftimg,
      this.myrect.left,
      this.myrect.top,
      (this.myrect.right - this.myrect.left) * 0.33,
      this.myrect.bottom - this.myrect.top
      );
    context.drawImage(
      this.middleimg,
      (this.myrect.right - this.myrect.left) * 0.33,
      this.myrect.top,
      (this.myrect.right - this.myrect.left) * 0.33,
      this.myrect.bottom - this.myrect.top
      );
    context.drawImage(
      this.leftimg,
      (this.myrect.right - this.myrect.left) * 0.66,
      this.myrect.top,
      (this.myrect.right - this.myrect.left) * 0.33,
      this.myrect.bottom - this.myrect.top
      );
    context.fillStyle = 'green';
    context.font="20px Georgia";  
    context.beginPath();
    context.rect(
      this.myrect.left,
      this.myrect.top,
      this.myrect.right - this.myrect.left,
      this.myrect.bottom - this.myrect.top
      );
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.rect(
      (this.myrect.right - this.myrect.left) * 0.33,
      this.myrect.top,
      (this.myrect.right - this.myrect.left) * 0.33,
      this.myrect.bottom - this.myrect.top
      );
    context.stroke();
    context.closePath();
    if(this.left == true)
    {
    //alert('this');
    context.beginPath();
    context.rect(this.myrect.left,this.myrect.top,(this.myrect.right - this.myrect.left) * 0.33,this.myrect.bottom - this.myrect.top);
    context.lineWidth = 5;
    context.strokeStyle = 'lightgreen';
    context.stroke();
    context.closePath();
    }
    if(this.middle == true)
    {
          context.beginPath();
    context.rect((this.myrect.right - this.myrect.left) * 0.33,this.myrect.top,(this.myrect.right - this.myrect.left) * 0.33,this.myrect.bottom - this.myrect.top);
    context.lineWidth = 5;
    context.strokeStyle = 'lightgreen';
    context.stroke();
    context.closePath();
    } 
    if(this.right == true)
    {
               context.beginPath();
    context.rect((this.myrect.right - this.myrect.left) * 0.66,this.myrect.top,(this.myrect.right - this.myrect.left) * 0.33,this.myrect.bottom - this.myrect.top);
    context.lineWidth = 5;
    context.strokeStyle = 'lightgreen';
    context.stroke();
    context.closePath(); 
    }

    context.font="20px Georgia";          
    context.fillText(this.leftcount,this.myrect.left + 5,this.myrect.top + 15);
    context.fillText(this.middlecount,((this.myrect.right - this.myrect.left) * 0.33) + 5,this.myrect.top + 15); 
    context.fillText(this.rightcount,((this.myrect.right - this.myrect.left) * 0.66) + 5,this.myrect.top + 15);      

  }
  this.changeimage = function(newimage,button)
  {
    if(button == 0)
    {
      this.leftimg.src = newimage;
    }
    if(button == 1)
    {
      this.middleimg.src = newimage;
    }
    if(button == 2)
    {
      this.middleimg.src = newimage;
    }
  }

  this.movement = function(x,y,id)
  {
    if(id == 0){
      this.left = false;
      this.right = false;
      this.middle=false;
    }
    for (i =0;i<touches.length;i++)
    {
      if (touches[i] == id)
      {
        this.left = false;
        this.right = false;
        this.middle = false;
      }
    }

    

    if(IntersectRect(0,this.myrect,new rectangle(x,y,x,y)))
    {
      //alert('this');


      var touchfound = false;
        for (i =0;i<touches.length;i++)
        {
            if (touches[i] == id)
            {
              touchfound = true;
            }
        }
        if(touchfound == false)
        {
          touches.push(id); 
        }

        // for (i =0;i<touches.length;i++)
        // {
        //     if (touches[i] == id)
        //     {
          
        //     }
        //     else
        //     {
        //       //alert("e");
        //      touches.push(id); 
        //     }
        // }
        //   if(touches.length == 0){
        //     touches.push(id); 
        //   }


         // return;
        if(IntersectPoint(0,new
          rectangle(
            this.myrect.left,
            this.myrect.top,
            (this.myrect.right - this.myrect.left) * 0.33,
            this.myrect.bottom
            )
          ,x,y))
        {
         //alert((this.myrect.right - this.myrect.left) * 0.33);
         //alert(x);
         this.left = true;
        }
         if(IntersectPoint(0,new rectangle((this.myrect.right - this.myrect.left) * 0.33,this.myrect.top,(this.myrect.right - this.myrect.left) * 0.66,this.myrect.bottom),x,y))
        {
          this.middle = true;
        }
        if(IntersectPoint(0,new rectangle((this.myrect.right - this.myrect.left) * 0.66,this.myrect.top,(this.myrect.right - this.myrect.left),this.myrect.bottom),x,y))
        {
          this.right = true;
        }
    }
  }

  this.movementend = function(x,y,id)
  {
          for (i =0;i<touches.length;i++)
          {
                if (touches[i] == id)
                {
                          this.left = false;
                          this.right = false;
                          this.middle = false;
                          touches.splice(i,1);
                          return;
                }
          }
  }
}


function bullet(hitball,hiteachother,myrect,itop,boomx,boomy,udmove,boom,imageobj){
    this.hitball = hitball;
    this.hiteachother = hiteachother;
    this.myrect = new rectangle(0,0,0,0);
    this.itop = itop;
    this.boomx = boomx;
    this.boomy =boomy;
    this.boomimg = new Image();
    this.boomimg.src = 'boommask.gif'
    this.udmove = udmove;
    this.boom = boom;
    this.inuse = false;
    this.imageobj = new Image();
    this.imageobj.src = 'compbullitmask.gif';
    this.use = function(){
      return 0;
    }
    this.checkintersect = function(){

    }
    this.init = function(){

    }
}


function missles(ctrlID,owner,opponent){
    this.bullets = new Array();
    for (var i = 0; i < 25; i++){
      this.bullets.push(new bullet());
    }
    this.imageobj = new Image();
    this.imageobj.src = 'compbullitmask.gif';
    this.exhaustion = false;
    this.ctrlID = ctrlID;
    this.use = function(myrect){
    if (this.exhaustion == false)// && (spaceKey == true || ability0 == true))
    {
          for(i=0;i<25;i++)
          {
          if(this.bullets[i].inuse == true)
          {
               1;
          }
          else
          {
               if(i % 2 == 0)
               {
                     this.bullets[i].inuse = true;
                     this.bullets[i].myrect.left = myrect.left + 25;
                     this.bullets[i].myrect.right = myrect.left + 35;
                     this.bullets[i].myrect.top = myrect.top - 25;
                     this.bullets[i].myrect.bottom = myrect.top;
                     //Hum.fired += 1;
               }
               else
               {
                     this.bullets[i].inuse = true;
                     this.bullets[i].myrect.left = myrect.left + 65;
                     this.bullets[i].myrect.right = myrect.left + 75;
                     this.bullets[i].myrect.top = myrect.top - 25;
                     this.bullets[i].myrect.bottom = myrect.top;
                     //Hum.fired += 1;
               }
               exhaustion = true;
               return;
          }
        }

     }
   }

    this.doprocesses = function(){
      var mcount = 0;
      for(i=0;i<25;i++)
      {
        this.move(i);
        this.checkinbounds(i,document.body.clientWidth,document.body.clientHeight);
        this.checkintersectplayer(i,Comp.myrect);
        if(this.bullets[i].inuse == true){
        mcount = mcount+1;
        }
      }
    switch (this.ctrlID){
    case 0:
      buttons.leftcount = mcount;
      break;
    case 1:
      buttons.middlecount = mcount;
      break;
    case 2:
      buttons.rightcount = mcount;
      break;
  }
        
      
    }
    this.init = function(){

    }

    this.move = function(num){
          if(this.bullets[num].inuse == true)
          {
                this.bullets[num].myrect.top -= 5;
                this.bullets[num].myrect.bottom -= 5;
          }  
    }
    this.checkinbounds = function(num,width,height)
    {
          if(this.bullets[num].myrect.right < 0 ||
             this.bullets[num].myrect.left > width  ||
             this.bullets[num].myrect.top > height ||
             this.bullets[num].myrect.bottom < 0)
          {
            this.bullets[num].inuse = false;
            this.bullets[num].myrect.left = 0;
            this.bullets[num].myrect.right = 0;
            this.bullets[num].myrect.top = 0;
            this.bullets[num].myrect.bottom = 0;
          }
    }

        this.checkintersectplayer = function(num,myrect){
          if (this.bullets[num].inuse == true && IntersectRect(0, myrect, this.bullets[num].myrect)  != false)
          {
                this.bullets[num].boom = true;
                this.bullets[num].inuse = false;
                this.bullets[num].boomx = this.bullets[num].myrect.left;
                this.bullets[num].boomy = this.bullets[num].myrect.top;
                Comp.hp = Comp.hp - 1;
                // if(Comp.sheildsup == false)
                // {
                //      Comp.frozen = true;
                //      Comp.hp -= 10;
                //      Comp.freezetime = dwTime;
                //      Comp.udmove = -102;
                // }
                // if(Comp.udmove + Comp.myrect.top < 0)
                // {
                //      Comp.udmove = -102 + Math.abs(Comp.myrect.top - 102);
                // }

                //return true;
          }
       }
    this.draw = function(context){
      for(ii = 0;ii < 25; ii++)
      {
      
          if(this.bullets[ii].inuse == true)
          {
               ctx.drawImage(this.bullets[ii].imageobj, 0,20,10,20,this.bullets[ii].myrect.left,this.bullets[ii].myrect.top,10,20);
          }
          else
          {  
                if(this.bullets[ii].boom == true)
                {
                     ctx.drawImage(this.bullets[ii].boomimg,this.bullets[ii].boomx,this.bullets[ii].boomy);
                     this.bullets[ii].boom = false;
                }
          }
      }
    }
}

function gettickcount()
{
  var now = new Date();
  return now.getTime();
}

function sheild(ctrlID,owner,opponent){
  var now = new Date();
  this.ctrlID = ctrlID;
  this.charge = 100;
  this.inuse = false;
  this.putinuse = 0;//now.getTime();
  this.putinuse2 = 0;
  this.imageobj = new Image();
  this.imageobj.src = 'sheild.gif';
  switch (this.ctrlID){
    case 0:
      buttons.leftimg.src = 'sheild.gif';
      break;
    case 1:
      buttons.middleimg.src = 'sheild.gif';
      break;
    case 2:
      buttons.rightimg.src = 'sheild.gif';
      break;
  }
  this.use = function(myrect){
           if((this.putinuse + 500) < gettickcount())
       {
    if(this.inuse == true) 
    {
       this.inuse = false;
       this.putinuse = gettickcount();
    }
    else
    {
        this.inuse = true;
        this.putinuse = gettickcount();
        this.putinuse2 = this.putinuse;
    }
  }
  }
  this.doprocesses = function(){
    if(this.inuse == true)
    {
      this.charge = this.charge - (3 * ((gettickcount() - this.putinuse2)/1000));
      this.putinuse2 = gettickcount();
    if(this.charge <= 0)
    {
      this.inuse = false;
      //this.charge = 100;
    }
    }
    else
    {
      if(this.charge < 100)
      {
        if(this.charge > 97)
        {
          this.charge = 100;
        }
        else
        {
          this.charge = this.charge + (3 * ((gettickcount() - this.putinuse2)/1000));
          this.putinuse2 = gettickcount();
        }
      }
    }
    switch (this.ctrlID){
    case 0:
      buttons.leftcount = Math.round(this.charge);
      break;
    case 1:
      buttons.middlecount = Math.round(this.charge);
      break;
    case 2:
      buttons.rightcount = Math.round(this.charge);
      break;
  }
  }
  this.draw = function(context){
    if(this.inuse == true)
    {
      ctx.drawImage(this.imageobj, Hum.myrect.left - 20, Hum.myrect.top - 12);
    }
  }
}

function player(mode,myrect,blastrect,blastok,blastinuse,direction,x,y,x2,y2,stmove,udmove,sheildpower,itop,frame,bumpsound,sheildsup,freezetime,sheildtime,imageobj){
  this.mode = mode;
  this.myrect = new rectangle(0,0,0,0);
  this.blastrect = new rectangle(0,0,0,0);
  this.blastok =blastok;
  this.blastinuse =blastinuse;
  this.canuseshots = true;
  this.direction = direction;
  this.fired = 0;
  this.hp = 9990;
  this.x = 0;
  this.y = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.score = 0;
  this.stmove = stmove;
  this.udmove = udmove;
  this.sheildpower = sheildpower;
  this.itop = itop;
  this.frame = frame;
  this.blastcount = 10;
  this.frozen = false;
  this.bumpsound = bumpsound;
  this.sheildsup = sheildsup;
  this.freezetime = freezetime;
  this.sheildtime = sheildtime;
  var myshots = new Array();
  for (var i = 0; i < 25; i++){
      myshots.push(new bullet());
    }
  this.shots = myshots;
  this.imageobj = new Image();
  //var myabilites = new Array();
  // for (var i = 0;i < 3;i++){
  //   myabilites.push(new ability());
  // }
  this.abilities = new Array();//myabilites;
  this.fire = new missles();
  this.reset = function(){
    this.blastok = true;
    this.blastinuse = false;
    this.frozen = false;
    this.canuseshots = true;
    this.direction = 0;
    this.sheildsup = false;
    this.sheildpower = 100;
    this.bumpsound = true;

  }

}

function ball(myrect,itop,x,y,x2,y2,movex,movey,imageobj){
  this.myrect = new rectangle(0,0,0,0);
  this.itop = itop
  this.movex = movex;
  this.movey = movey;
  this.imageobj = new Image();
  this.move = function(){
     if(Math.abs(this.movey) == this.movey && this.movey != 0)
     {
          this.movey = 5;
     }
     else
     {
          this.movey = -5;
     }
  }
  this.switchdirections = function(upORdown){
          if(upORdown == "up")
          {
                this.movey = -5;
          }
          else
          {
                this.movey = 5;
          }
           
          direction = GetRandom(LOW,HIGH);
          if(direction < 20 &&  direction > 1 )
          {
                this.movex = -5;
          }
          if(direction < 40 &&  direction > 20)
          {
                this.movex = 5;
          }
          if(direction < 60 &&  direction > 40)
          {
                if ((GetRandom(LOW,HIGH)) > 50)
                {
                   this.movex = 1;
                }
                else
                {
                    this.movex = -1;
                }
          }
          if(direction < 80 &&  direction > 60)
          {
                this.movex = -10;
          }
          if(direction < 100 &&  direction > 80)
          {
                this.movex = 10;
          }
  }
  this.domove = function(){
     this.myrect.left += this.movex;
     this.myrect.right += this.movex;
     this.myrect.top += this.movey;
     this.myrect.bottom += this.movey;
  }
 }
