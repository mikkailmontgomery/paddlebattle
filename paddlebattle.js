//old code adaption
//var Canvas = document.getElementById('myCanvas');
var clearrects = new Array();
var screentext = "";
var hptext = "";
var scoretext = "";
var wKey = false;
var aKey = false;
var sKey =false;
var dKey =false;
var spaceKey =false;
var touched = false;
var ability0 = false;
var pKey = false;
var LOW = 1;
var HIGH = 100;
var Canvas //= document.getElementById("myCanvas");
var ctx ; //= Canvas.getContext('2d');
var winwidth = window.document.width - 20;//Canvas.width - 20;
var winheight = window.document.height - 20;//Canvas.height - 20;
var tnow ;//= new Date();
var ticks ;//= now.getTime();
var bgscrollcount = 0;
var compmisslesinuse = 0;
var backgroundcanvas;
var bctx;
var img;
var controlcanvas;
var joystick;
var buttons;
var ingame=false;
var pausepressed=false;
var pausedtime=0;
var messages;
var nextLevel = false;

//missing objects were here.  Moved to objects.js


function myFunction(){

}

function myKeyDown(e){
  e = e || event;
  //alert("keydown!");
  if (e.keyCode == 65){aKey = true;}
    if (e.keyCode == 83){sKey = true;}
      if (e.keyCode == 68){dKey = true;}
        if (e.keyCode == 87){wKey = true;}
          if (e.keyCode == 32){spaceKey = true;}
            if (e.keyCode == 80){pKey = true;}
}


function myKeyUp(e){
  e = e || event;
  //alert("keydown!");
  if (e.keyCode == 65){aKey = false;}
    if (e.keyCode == 83){sKey = false;}
      if (e.keyCode == 68){dKey = false;}
        if (e.keyCode == 87){wKey = false;}
          if (e.keyCode == 32){spaceKey = false;}
            if (e.keyCode == 80){pKey = false;}
}

function movemouse(e){
    if(e.touches)
    {
      touched = true;
        event.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            var x = touch.pageX;
            var y = touch.pageY;
            var id = touch.identifier;


     // if((x > 0 && x < controlcanvas.height * 0.33) && (y > 0 && y < controlcanvas.width * 0.20))
     // {
     //  //alert("clicked");
     //      Hum.abilities[0].clickdown();
     //      return;
     // }


            joystick.movement(x,y,id);
            //buttons.addtouches(e);
            buttons.movement(x,y,id);
            if(IntersectRect(0,new rectangle(Canvas.width * 0.80,0,Canvas.width,Canvas.width * 0.20),new rectangle(x,y,x,y)))
            {
                pausepressed = true;
            }
        }
    }
    else
    {
        joystick.movement(e.clientX,e.clientY,0);
        buttons.movement(e.clientX,e.clientY,0)
    }
}


function canvasclickup(e)
{
    if(e.touches)
    {
    touched = false;
         event.preventDefault();
         for (var i = 0; i < e.changedTouches.length; i++) {
             var touch = e.changedTouches[i];
             var x = touch.pageX;
             var y = touch.pageY;
             var id = touch.identifier;
             joystick.movementend(x,y,id);
             buttons.movementend(x,y,id);
         }
    }
    else
    {
          joystick.movementend(e.clientX,e.clientY,0);
          joystick.left = false;
          joystick.right = false;
          joystick.up=false;
          joystick.down=false;
          buttons.movementend(e.clientX,e.clientX,0);
    }
}

/*
function canvasclickup(e){
  Hum.abilities[0].clickup();
}
*/

function canvasclickdown(e){
  var x = e.clientX;
  var y = e.clientY;
  //alert("x=" + x + " y=" + y + "clicked");
  if(Math.pow(x-Hum.abilities[0].buttoncircle.left,2)+Math.pow(y-Hum.abilities[0].buttoncircle.top,2) < Math.pow(Hum.abilities[0].buttoncircle.radius,2)){
  //alert("clicked");
  Hum.abilities[0].clickdown();
  }
 }



function setup(){
    messages = document.getElementById('messages');
    winwidth = Canvas.width 
    winheight = Canvas.height;

    Comp.reset();
    Comp.myrect = new rectangle((winwidth/2) - 50,50,((winwidth/2) - 50) + 80,75);
    Comp.stmove = 5;
    Comp.imageobj = new Image();
    Comp.imageobj.src = 'compmask.gif';

    Hum.reset();
    Hum.myrect = new rectangle(Comp.myrect.left,winheight - 75,Comp.myrect.right,winheight - 50)
    Hum.stmove = 0;    
    Hum.imageobj = new Image();
    Hum.imageobj.src = 'compmask.gif';

    for(ii = 0;ii < 25; ii++)
    {
    Hum.shots[ii].inuse = false;
    Hum.shots[ii].boom = false;
    Comp.shots[ii].itop = 0;
    Comp.shots[ii].inuse = false;
    Comp.shots[ii].boom = false;
    }
   
    sBall.myrect = new rectangle(winwidth / 2,winheight / 2,(winwidth / 2) + 25,(winheight / 2) + 25);
    sBall.movex = 0;
    sBall.movey = -5;
    sBall.imageobj = new Image();
    sBall.imageobj.src = 'ballsmask.gif';

    mycount = 0;
    noofcontact = 0;
    tnow = new Date();
    ticks = tnow.getTime();
    dwTime = ticks;
    Hum.abilities[0] = new missles(0,Hum,Comp);
    Hum.abilities[1] = new sheild(1,Hum,Comp);
    document.getElementById('pausemenu').style.display = 'block';
}

//http://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
function IntersectRect(r0, r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function IntersectPoint(r0,r1,x4,y4) {
  //alert('f');
  if(r1.left < x4 &&
     r1.right > x4 &&
     r1.top < y4 &&
     r1.bottom > y4)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function GetRandom(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function WaitThread(){
    // if(pausedtime + 500 < gettickcount()){
    //   if (spaceKey == true  || touched == true){
    //     ingame = true;
    //   }
    // }
}

function AI(){
       //   if(Comp.sheildtime + 50 < dwTime && Comp.sheildsup == true)
       // {
       //      Comp.sheildpower -= 1;
       //      Comp.sheildtime = dwTime;
       // }
                  
       // if(Comp.sheildtime + 200 < dwTime && Comp.sheildsup == false && Comp.sheildpower < 100)
       // {
       //      Comp.sheildpower += 1;
       //      Comp.sheildtime = dwTime;
       // }
       
                  
       // if(GetMenuState(GetMenu(hwnd), ID_HUMAN_MISSILE_OFF, MF_BYCOMMAND) != MF_CHECKED && Comp.sheildpower > 85 && Comp.sheildsup == false)
       // {
       //      Comp.sheildsup = true;
       //      Comp.sheildtime = dwTime;
       // }
       
                  
       // if(Comp.sheildpower == 70)
       // {
       //      Comp.sheildsup = false;
       // }
                  
       // if(Comp.frozen == true)
       // {
       //      if(Comp.freezetime + 150 < (new Date()).getTime())
       //      {
       //            Comp.frozen = false;
       //      }
       //      //goto nextmove; 6-13-2015
       // }
     //var compmid = Comp.myrect.left + (( Comp.myrect.right - Comp.myrect.left) / 2)


     // if(((Comp.myrect.left + (( Comp.myrect.right - Comp.myrect.left) / 2)) > (sBall.myrect.left + (sBall.myrect.right - sBall.myrect.left) / 2 )) 
     //  && (Comp.myrect.left - 5) >= 0)
     // {
     //      Comp.stmove = -6;
     // }
                
     // if(((Comp.myrect.left + (( Comp.myrect.right - Comp.myrect.left) / 2)) < (sBall.myrect.left + (sBall.myrect.right - sBall.myrect.left) / 2 )) 
     //  && (Comp.myrect.right +5 ) <= winwidth)
     // {
     //       Comp.stmove = 6;
     // }
     if(GetRandom(1,10) <= 5)
     {
        return;
     }
     if(Comp.myrect.left > sBall.myrect.left)
     {
        Comp.stmove = -6;
     }
     if(Comp.myrect.right < sBall.myrect.right)
     {
        Comp.stmove = 6;
     }
                
     if (
            (
            (sBall.myrect.left >= Comp.myrect.left 
            && sBall.myrect.right <= Comp.myrect.right)
            && Comp.myrect.bottom <= winheight / 2 
            )
            ||  
            (sBall.movey > 0 && Comp.myrect.bottom <= winheight / 2)
        )
     {
           Comp.udmove = 6;            
     }
     if(!(sBall.myrect.left >= Comp.myrect.left 
            && sBall.myrect.right <= Comp.myrect.right) && sBall.movey < 0)
     {
           if(Comp.myrect.top - 6 > 0 )
           {
                Comp.udmove = -6;
           }
     }
                
     // if(sBall.myrect.top < Comp.myrect.top && Comp.myrect.top > 0)
     // {
     //       Comp.udmove = -6;
     // }
                
                
     // if(Hum.myrect.top - Comp.myrect.bottom < 150 && Comp.myrect.top > 0)
     // {
     //      Comp.udmove = -6;
     // }
}



function GameProc(){
     // var touchcount = buttons.touchesarr.length;
     // for (i = 0;i<touchcount;i++)
     // {
     //   buttons.movement(buttons.touchesarr[i].pageX,buttons.touchesarr[i].pageY,
     //    buttons.touchesarr[i].identifier)
     // }

     Hum.stmove = 0;
     Hum.udmove = 0;
     //Comp.stmove = 0;
     //Comp.udmove = 0;
     closecall = 0;
     var direction;

     sBall.move();

     hptext = "Computer Health = " + Comp.hp + "\nYour Health = " + Hum.hp + "\nShots Fired = " + Hum.fired + "\nBlasts left = " + Hum.blastcount;
                
     if(Comp.hp <= 0 || Comp.hp > 100000)
     {
          //-clearTimeout(idTimer1);
          ingame = false;
          screentext = "You Win";
          return;
     }
                
     if(Hum.hp <= 0 || Hum.hp > 100000)
     {
          //clearTimeout(idTimer1);
          ingame = false;
          screentext = "Computer Wins";
          return;
     }

     //############################### Scoreing code starts ####################           
     if(sBall.myrect.bottom < 0)
     {
          Hum.score += 1;
          ctx.font="20px Georgia";          
          scoretext = "Paddle battle - Computer score = " + Comp.score + " Your score = " + Hum.score;
          setup();
          MyPaintProc();
          /*Computer doesn't grow when scored on.
          if(Hum.score > 0 )
          {
                Comp.x2 += (Comp.x2 - Comp.x) * 2;
                Comp.y2 += (Comp.y2 - Comp.y); 
          }
          */
          ingame=false;
          if(Hum.score == 20)
          {
                screentext = "You Win";
                return;
          }
          screentext = "Press SpaceBar to continue.";
          ingame = false;
     }
                
     //if(sBall.y2 > Hum.y2 + 200) 7-9-15
     if(sBall.myrect.top > Canvas.height)
     {
          Comp.score += 1;
          scoretext = "<p>Paddle battle - Computer score = " + Comp.score + " Your score = " + Hum.score + "</p>";
          var span = document.getElementById("score");
          span.innerHTML = scoretext;
          setup();
          MyPaintProc();
          if(Comp.score == 20)
          {
                screentext = "Computer Wins";
                return;
          }
          screentext = "Press SpaceBar to continue.";
          ingame = false;
     }
     //############################### Scoreing code ends ####################
     
     var unusedpointer;

     if (IntersectRect(unusedpointer, Comp.myrect, sBall.myrect)  != false)
     {
          noofcontact += 1;
          if(noofcontact == 20 && mycount < 14)
          {
                mycount += 1;
                noofcontact = 0;
          }
/* //Disable until testing in html - maybe later.
          if(sound == true && Hum.bumpsound == true)
          {
                PlaySound("contact", hInst,SND_RESOURCE | SND_ASYNC); //| SND_LOOP);
                Hum.bumpsound = false;
                Comp.bumpsound = true;
          }
 */               

          sBall.switchdirections("down");
     }
                
                
     if (IntersectRect(unusedpointer, Hum.myrect, sBall.myrect)  != false)
     {
          noofcontact += 1;
          if(noofcontact == 15 && mycount < 16)
          {
                mycount += 1;
                noofcontact = 0;
          }
//Disable until testing in html - maybe later.  Audio play here.       
          sBall.switchdirections("up");
     }


     if(Hum.blastinuse == true)
     {
          Hum.blastrect.top -= 5;
          Hum.blastrect.bottom -= 5;
     }
                
     if(Hum.blastrect.bottom <= 0)
     {
          Hum.blastinuse = false;
          Hum.blastok = true;
     }
      



     //below is a merge of all missile logic combined into one loop vs being badly spread in old code.
     var misslecount = 0;
     //When missles are made to be one of many ablities - add ablity exhaustion and replace this variable.
     var missleabilityexhaustion = false;
     var ability0exhaustion = false;
     for(ii = 0;ii < 25; ii++)
     {
          /*
          if(Hum.shots[ii].inuse == true)
          {
                Hum.shots[ii].myrect.top -= 5;
                Hum.shots[ii].myrect.bottom -= 5;
          }
          if(Hum.shots[ii].myrect.bottom < 0)
          {
                Hum.shots[ii].inuse = false;
                Hum.shots[ii].myrect.left = 0;
                Hum.shots[ii].myrect.right = 0;
                Hum.shots[ii].myrect.top = 0;
                Hum.shots[ii].myrect.bottom = 0;
          }
          */
          if(Comp.shots[ii].inuse == true)
          {
                misslecount += 1;
                /* Comp shots are not heat seeking 6-23-15
                if(Comp.shots[ii].y > Hum.y2)
                {
                     Comp.shots[ii].y -= 10;
                     Comp.shots[ii].y2 -= 10;
                     Comp.shots[ii].itop = 20;
                }
                */
                Comp.shots[ii].myrect.top += 5;
                Comp.shots[ii].myrect.bottom += 5;
                

                /* Comp shots are not heat seeking 6-23-15
                if(Hum.x > Comp.shots[ii].x2)
                {
                     Comp.shots[ii].x += 5;
                     Comp.shots[ii].x2 += 5;
                }
                if(Hum.x2 < Comp.shots[ii].x)
                {
                     Comp.shots[ii].x -= 5;
                     Comp.shots[ii].x2 -= 5;
                }
                */
                if(Comp.shots[ii].myrect.top > winheight)
                {
                    Comp.shots[ii].inuse = false;
                    Comp.shots[ii].myrect.left = 0;
                    Comp.shots[ii].myrect.right = 0;
                    Comp.shots[ii].myrect.top = 0;
                    Comp.shots[ii].myrect.bottom = 0;
                }
                if (IntersectRect(unusedpointer, Hum.myrect, Comp.shots[ii].myrect)  != false)
                {
                    if(Hum.sheildsup == false)
                    {
                         Hum.frozen = true;
                         Hum.hp -= 15;
                         Hum.freezetime = dwTime;
                         Hum.udmove = +102;
                    }
                    if(Hum.udmove + Hum.myrect.bottom > winheight)
                    {
                          Hum.udmove = winheight - Hum.myrect.bottom; //fix wierd movement?6-23-15
                    }
                    Comp.shots[ii].boom = true;
                    Comp.shots[ii].inuse = false;
                    Comp.shots[ii].boomx = Comp.shots[ii].myrect.left;
                    Comp.shots[ii].boomy = Comp.shots[ii].myrect.top;
                }
            }
            else
            {
                 if (((Comp.myrect.left < Hum.myrect.left && Comp.myrect.right  < Hum.myrect.right) || (Comp.myrect.left < Hum.myrect.left && Comp.myrect.right  < Hum.myrect.right)) && missleabilityexhaustion == false)
                 { 
                      if (ii % 2 == 0)
                      {
                           Comp.shots[ii].inuse = true;
                           Comp.shots[ii].myrect.left = (Comp.myrect.right - Comp.myrect.left) / 4 - 5 + Comp.myrect.left;
                           Comp.shots[ii].myrect.right = (Comp.myrect.right - Comp.myrect.left) / 4 + 5 + Comp.myrect.left;
                           Comp.shots[ii].myrect.top = Comp.myrect.bottom;
                           Comp.shots[ii].myrect.bottom = Comp.myrect.bottom + 20;
                      }
                      else
                      {
                           Comp.shots[ii].inuse = true;
                           Comp.shots[ii].myrect.left = (Comp.myrect.right - Comp.myrect.left) / 4 - 5 + Comp.myrect.left + 40;
                           Comp.shots[ii].myrect.right = (Comp.myrect.right - Comp.myrect.left) / 4 + 5 + Comp.myrect.left + 40;
                           Comp.shots[ii].myrect.top = Comp.myrect.bottom;
                           Comp.shots[ii].myrect.bottom = Comp.myrect.bottom + 20;                
                      }
                      Comp.shots[ii].itop = 0;
                      //break;  used to break loop to prevent pc from firing all missles in 1 game loop, we
                      //have to do this different now as all missle logic is in this loop and would be broken if
                      //we allowed this pc firing to break the loop.  using a varible check now.
                      missleabilityexhaustion = true;
                  }

          }

           /* creating missle object 7-20-15
          */      
          if(Hum.blastinuse == true && IntersectRect(unusedpointer, Comp.shots[ii].myrect, Hum.blastrect) != false)
          {
                Comp.shots[ii].boom = true;
                Comp.shots[ii].inuse = false;
                Comp.shots[ii].boomx = Comp.shots[ii].myrect.left;
                Comp.shots[ii].boomy = Comp.shots[ii].myrect.top;
          }
     }

     compmisslesinuse = misslecount;
     hptext = hptext + "missles =" + compmisslesinuse;

                
          if(IntersectRect(unusedpointer, sBall.myrect, Hum.blastrect) && Hum.blastinuse == true)
          {
                if(Math.abs(sBall.movey) == sBall.movey && sBall.movey != 0)
                {
                     sBall.movey = -3;
                }
                else
                {
                     sBall.movey = -3;
                }
                sBall.movex = Hum.direction;
          }
                
          if(IntersectRect(unusedpointer, Comp.myrect, Hum.blastrect) && Hum.blastinuse == true)
          {
                Comp.frozen = true;
                Comp.hp -= 1;
                Comp.freezetime = dwTime;
                Comp.myrect.top = (rand() % (200 - 10 + 1) + 10);
                Comp.myrect.bottom = Comp.myrect.top + 25;
          }
                

     if(sBall.myrect.left <= 0)
     {
          sBall.movex = 5;
     }
                
     if(sBall.myrect.right >= winwidth)
     {
          sBall.movex = -5;
     }
                
    AI();
     nextmove:
     //int closecall = 0;
     //for(ii = 0; ii < 25; ii++)
     //{

     //}
     
     //disable menu logic - for now missles collide 6-11-2015
     //in new object oriented model - missles don't collide with each other.
     // for now 7-23-15           
     //if(GetMenuState(GetMenu(hwnd), ID_MISSILES_COLLIDE_OFF, MF_BYCOMMAND) != MF_CHECKED)
     //{
      
          for(myi = 0;myi < 25;myi++)
          {
                for(myi2 = 0;myi2 < 25;myi2++)
                {
                     if(Comp.shots[myi2].inuse == true && Hum.abilities[0].bullets[myi].inuse == true && IntersectRect(unusedpointer, Comp.shots[myi2].myrect, Hum.abilities[0].bullets[myi].myrect) != 0)
                     {
                          Hum.abilities[0].bullets[myi].boom = true;
                          Hum.abilities[0].bullets[myi].inuse = false;
                          Hum.abilities[0].bullets[myi].boomx = Hum.abilities[0].bullets[myi].myrect.left;
                          Hum.abilities[0].bullets[myi].boomy = Hum.abilities[0].bullets[myi].myrect.top;
                          Comp.shots[myi2].boom = true;
                          Comp.shots[myi2].inuse = false;
                          Comp.shots[myi2].boomx = Comp.shots[myi2].myrect.left;
                          Comp.shots[myi2].boomy = Comp.shots[myi2].myrect.top;
                     }
                }
          }
          
     //}


     //continue converting here with keycodes 6-11-2015           
     if(Hum.frozen == true)
     {
          if(Hum.freezetime + 75 < (new Date()).getTime())
          {
                Hum.frozen = false;
          }
          //goto skipmove; fix later 6-13-2015
     }
                
     /*   not sure what this was for - 6-12-2015        
     if(GetKeyState(VK_SHIFT) < 0)
     {
          POINT mousexy;
          GetCursorPos(&mousexy);
          Hum.x = mousexy.x;
          Hum.x2 = Hum.x + 80;
          Hum.y = mousexy.y;
          Hum.y2 = Hum.y + 25;
          ShowCursor(false);
     }
     */

     //if((aKey == true || mleft == true) && Hum.x >= 0 )
     //{
     //     Hum.stmove = -10;
     //}
           
     /*disable blast? for now 6-12-2015           
     if(GetKeyState(83) < 0 && Hum.blastok == true && Hum.blastcount != 0)
     {
          Hum.blastcount -= 1;
          Hum.blastinuse = true;
          Hum.blastok = false;
          Hum.blastrect.left = Hum.x -60;
          Hum.blastrect.right = Hum.x2 + 60;
          Hum.blastrect.top = Hum.y - 50;
          Hum.blastrect.bottom = Hum.y;
     }
     */           
     
      Hum.abilities[0].doprocesses();
      Hum.abilities[1].doprocesses();
                
      if(buttons.left == true && typeof Hum.abilities[0] !== 'undefined' && typeof Hum.abilities[0].use === 'function')
      {
        //alert('use');
        Hum.abilities[0].use(Hum.myrect);
      }          
      if(buttons.middle == true)
      {
        Hum.abilities[1].use(Hum.myrect);
      }
      if(buttons.right == true)
      {
        Hum.abilities[2].use(Hum.myrect);
      }

     if(pKey == true  || pausepressed == true)
     {
          pausedtime = gettickcount();
          pausepressed = false;
          screentext = "You Paused the Game.\nPress SpaceBar to continue.";
          ingame = false;
          document.getElementById('pausemenu').style.display = 'block';
          //if (connected == true)
          //{
          //senddata.pause = true;
          //}
     }

     if((aKey == true || joystick.left == true) && Hum.myrect.left >= 0)
     {
          Hum.stmove = -10;
     }
                
     if((sKey == true || joystick.down == true) && Hum.myrect.bottom <= winheight)
     {
          Hum.udmove = 10;
     }
     if((dKey == true || joystick.right == true) && Hum.myrect.right <= winwidth)
     {
          Hum.stmove = 10;
     }
                
     if((wKey == true || joystick.up == true) && Hum.myrect.top >= Comp.myrect.bottom + 100 )
     {
          Hum.udmove = -10;
     }
                
     //static DWORD btimeout = dwTime;
     // Disabled 6-13-2015if((GetMenuState(GetMenu(hwnd), ID_HUMAN_MISSILE_OFF, MF_BYCOMMAND) != MF_CHECKED) && GetKeyState(VK_SPACE) < 0)
     
     skipmove:
     Hum.myrect.left += Hum.stmove;
     Hum.myrect.right += Hum.stmove;
     //always allow - 6-13-2015
    // if(GetMenuState(GetMenu(hwnd), MOVEMENT_UP, MF_BYCOMMAND) == MF_CHECKED)
     //{
          Hum.myrect.top  += Hum.udmove;
          Hum.myrect.bottom  += Hum.udmove;
     //}
     Comp.myrect.left += Comp.stmove;
     Comp.myrect.right += Comp.stmove;
     //always allow - 6-13-2015
     //if(GetMenuState(GetMenu(hwnd), MOVEMENT_UP, MF_BYCOMMAND) == MF_CHECKED)
     //{
          Comp.myrect.top += Comp.udmove;
          Comp.myrect.bottom += Comp.udmove;
     //}
     if(Math.abs(sBall.movey) == sBall.movey)
     {
          sBall.movey += mycount;
     }
     else
     {
          sBall.movey -= mycount;
     }

     
if(sBall.myrect.top > Canvas.height * 0.80)
{
  sBall.switchdirections('up');
}

sBall.domove();
messages.innerHTML = 'Computer HP = ' + Comp.hp + '<br />' +
                     'Your HP = ' + Hum.hp;
}

function MyPaintProc(){
  
                ctx.clearRect(0,0,winwidth,winheight);
                //ctx.font="20px Georgia";          
                //ctx.fillText(hptext,10,40);  

                

                // dont draw sheild for now - 6-13-2015
                //if(Comp.sheildsup == true)
                //{
                //SelectObject(hdcbmp, Comp.sheildimagemask);
                //SelectObject(hdcbuffer, bm);
                //StretchBlt(hdcbuffer, Comp.x -5 , Comp.y -5, /*120*/Comp.x2 - Comp.x +15, /*50*/ Comp.y2 - Comp.y + 15, hdcbmp, 0, 0, 120, 50, SRCAND);
                //SelectObject(hdcbmp, Comp.sheildimage);
                //SelectObject(hdcbuffer, bm);
                //StretchBlt(hdcbuffer, Comp.x -5 , Comp.y -5, /*120*/Comp.x2 - Comp.x +15, /*50*/ Comp.y2 - Comp.y + 15, hdcbmp, 0, 0, 120, 50, SRCPAINT);
                
                //}

                /* Translation draw player 6-13-2015
                */
                

                // - don't draw sheild for now - 6-13-2015
                /*
                if(Hum.sheildsup == true)
                {
                SelectObject(hdcbmp, Hum.sheildimagemask);
                SelectObject(hdcbuffer, bm);
                BitBlt(hdcbuffer, Hum.x - 20, Hum.y - 12, 120, 50, hdcbmp, 0, 0, SRCAND);
                SelectObject(hdcbmp, Hum.sheildimage);
                SelectObject(hdcbuffer, bm);
                BitBlt(hdcbuffer, Hum.x - 20, Hum.y - 12, 120, 50, hdcbmp, 0, 0, SRCPAINT);
                }
                */
                if (typeof Hum.abilities[0] !== 'undefined' && typeof Hum.abilities[0].draw() === 'function') 
                {
                  Hum.abilities[0].draw(ctx);
                }
                if (typeof Hum.abilities[1] !== 'undefined' && typeof Hum.abilities[1].draw() === 'function') 
                {
                  Hum.abilities[1].draw(ctx);
                }
                // (Hum.abilities[0].draw || function(){})();
                // (Hum.abilities[1].draw || function(){})();
               // (Hum.abilities[2].draw || function(){})();
               // // }
               //  if (typeof Hum.abilities[1].draw() == 'function') { 
               //    Hum.abilities[1].draw();
               //  }
               //  if (typeof Hum.abilities[2].draw() == 'function') { 
               //    Hum.abilities[2].draw();
               //  }

                for(ii = 0;ii < 25; ii++)
                {
                    /*
                    if(Hum.shots[ii].inuse == true)
                    {
                         ctx.drawImage(Hum.shots[ii].imageobj, 0,20,10,20,Hum.shots[ii].myrect.left,Hum.shots[ii].myrect.top,10,20);
                    }
                    else
                    {  
                          if(Hum.shots[ii].boom == true)
                          {
                               ctx.drawImage(Hum.shots[ii].boomimg,Hum.shots[ii].boomx,Hum.shots[ii].boomy);
                               Hum.shots[ii].boom = false;
                          }
                    }
                    */
                    //Hum.
                    if(Comp.shots[ii].inuse == true)
                    {
                         ctx.drawImage(Comp.shots[ii].imageobj, 0,0,10,20,Comp.shots[ii].myrect.left,Comp.shots[ii].myrect.top,10,20);
                    }
                    else
                    {
                         if(Comp.shots[ii].boom == true)
                         {
                              ctx.drawImage(Comp.shots[ii].boomimg,Comp.shots[ii].boomx,Comp.shots[ii].boomy);
                              Comp.shots[ii].boom = false;
                         }
                    }

                }
                /*if(Hum.blastinuse == true)
                {
                SelectObject(hdcbmp, Hum.blastmask);
                SelectObject(hdcbuffer, bm);
                BitBlt(hdcbuffer, Hum.blastrect.left, Hum.blastrect.top, 200, 50, hdcbmp, 0, 0, SRCAND);
                SelectObject(hdcbmp, Hum.blast);
                SelectObject(hdcbuffer, bm);
                BitBlt(hdcbuffer, Hum.blastrect.left, Hum.blastrect.top, 200, 50, hdcbmp, 0, 0, SRCPAINT);
                
                }*/
                /*tranlate draw ball 6-13-2015
                */
                ctx.drawImage(sBall.imageobj, 0,0,25,25,sBall.myrect.left, sBall.myrect.top,25,25);
                ctx.drawImage(Hum.imageobj, Hum.myrect.left, Hum.myrect.top);
                ctx.drawImage(Comp.imageobj, Comp.myrect.left, Comp.myrect.top);
                ctx.strokeRect(Canvas.width * 0.80,0,Canvas.width * 0.20,Canvas.width * 0.20);
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#003300';
                //Pause button 
                ctx.moveTo((Canvas.width * 0.20 * 0.33) + (Canvas.width * 0.80),Canvas.width * 0.20 * 0.33);
                ctx.lineTo((Canvas.width * 0.20 * 0.33) + (Canvas.width * 0.80),Canvas.width * 0.20 * 0.66);
                ctx.moveTo((Canvas.width * 0.20 * 0.66) + (Canvas.width * 0.80),Canvas.width * 0.20 * 0.33);
                ctx.lineTo((Canvas.width * 0.20 * 0.66) + (Canvas.width * 0.80),Canvas.width * 0.20 * 0.66);
                ctx.stroke();
                //End Pause Button
                // if(ingame == false)
                // {
                //   ctx.strokeStyle = '#003300';

                // ctx.fillRect(0,Canvas.height * 0.33,Canvas.width,Canvas.height * 0.33);
                // ctx.strokeRect(0,Canvas.height * 0.33,Canvas.width,Canvas.height * 0.33);
                // ctx.font="20px Georgia";          
                // ctx.fillStyle = '#003300';
                // ctx.fillText('Paused',Canvas.width / 2,Canvas.height * 0.50);
                // ctx.fillStyle = '#000000'; 
                // }

}

function MyPaintProcBack(){


      //bctx.clearRect(0,0,backgroundcanvas.width,backgroundcanvas.height)
      //bctx.rect(0,0,backgroundcanvas.width,bgscrollcount);
      var pat=bctx.createPattern(img,"repeat");
      bctx.fillStyle=pat;
      bctx.translate(0,bgscrollcount);
      bctx.fillRect(0,-bgscrollcount,backgroundcanvas.width,backgroundcanvas.height);
      bctx.translate(0,-bgscrollcount);
      if(nextLevel == true){
      bgscrollcount = bgscrollcount + 1;
      }
      //bctx.fillText(bgscrollcount,100,100); 
      //if an the repeated images height.
      if (bgscrollcount == 100){
        bgscrollcount = 0;
      }
      }

function ControlPaintProc(){
      cctx = controlcanvas.getContext('2d');
      /*
                      cctx.lineWidth = 5;
                      cctx.strokeStyle = '#003300';
      cctx.strokeRect(0, 0, controlcanvas.width * 0.20, controlcanvas.height * 0.33);
      cctx.strokeRect(0, controlcanvas.height * 0.33 + 1, controlcanvas.width * 0.20, controlcanvas.height * 0.33);
      cctx.strokeRect(0, (controlcanvas.height * 0.33) * 2 + 2, controlcanvas.width * 0.20, controlcanvas.height * 0.33);
      */
      joystick.drawcontrol(cctx);
      buttons.drawcontrol(cctx);
}

function PaintPause(){
ctx.strokeStyle = '#003300';
ctx.strokeRect(Canvas.width * 0.80,0,Canvas.width * 0.20,Canvas.width * 0.20);
ctx.fillRect(0,Canvas.height * 0.33,Canvas.width,Canvas.height * 0.66);
                ctx.font="20px Georgia";          
                ctx.fillText('Paused',Canvas.width /2,Canvas.height * 0.50); 
}
var Hum = new player;
Hum.blastcount = 10;
Hum.hp = 9990;

var Comp = new player;
Comp.hp = 9990;

var sBall = new ball;
sBall.itop = 0;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
      };
})();

function animate() {
  requestAnimFrame( animate );
  if(ingame == true){
  GameProc();
  }
  else
  {
  WaitThread();
  PaintPause();
  }
  MyPaintProcBack();
  MyPaintProc();
  ControlPaintProc();
}

//end of old code adaption


function startgame(){

  Canvas = document.getElementById('myCanvas');
ctx = Canvas.getContext('2d');
  Canvas.height = document.body.clientHeight;
  Canvas.width = document.body.clientWidth;
  backgroundcanvas = document.getElementById('background');
  backgroundcanvas.height = Canvas.height;
  backgroundcanvas.width = Canvas.width;
  controlcanvas = document.getElementById('controls');
  controlcanvas.height = Canvas.height;
  controlcanvas.width = Canvas.width;
  Canvas.focus();
  Canvas.addEventListener("keydown",myKeyDown,false);
  Canvas.addEventListener("keyup",myKeyUp,false);
  Canvas.addEventListener("touchstart",movemouse,false);
  Canvas.addEventListener("touchmove",movemouse,false);
  Canvas.addEventListener("touchend",canvasclickup,false);
var mycount = 0;
var noofcontact = 0;
var Hum = new player();
var Comp = new player();
var sBall = new ball();
tnow = new Date();
ticks = tnow.getTime();
dwTime = ticks;
bctx = backgroundcanvas.getContext('2d');
img = new Image();
img.src = 'g.png';

  radius = Math.sqrt(((backgroundcanvas.width * backgroundcanvas.height) * 0.05) / 3.14);
  circlex = (backgroundcanvas.width - radius) - (backgroundcanvas.width * 0.01);
  circley = (backgroundcanvas.height - radius) - (backgroundcanvas.height * 0.01);
joystick = new controlcircle(circlex,circley,radius);
buttons = new controlrect(
  0,
  backgroundcanvas.height * 0.85,
  backgroundcanvas.width * 0.30,
  (backgroundcanvas.height * 0.70) + (backgroundcanvas.height * 0.30) - 5
);
ControlPaintProc();
animate();
setup();
}
