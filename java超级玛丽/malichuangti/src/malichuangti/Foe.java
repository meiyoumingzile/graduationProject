package malichuangti;

import java.awt.image.BufferedImage;

public class Foe implements Runnable{//敌人是会动的，需要线程；
	private int x,y,type;
	public void setx(int x) 	  {	this.x = x;		 }
	public void sety(int y) 	  {	this.y = y;		 }
	public void settype(int type) {	this.type = type;}
	public int getx() {		return x;	}
	public int gety() {		return y;	}
	public int gettype(){	return type;}
	
	private int uptime=0;
	public static int dieting=0,diex,diey; 
	
	String st_dog;
	public String getst_dog() 			 {		return st_dog;	}
	public void setst_dog(String st_dog) {	this.st_dog = st_dog;}

	private String sst;//初始的方向
	private int ysudu_dog=5;
	private int xsudu_dog=5;
	
	private String st_hua;
	
	private int sx,sy;//初始位置
	private int rilimx=0,uplimy=0;//////极限坐标
	private int lelimx=0,downlimy=0;
	public int getsx() {	return sx;}
	public void setsx(int sx) {	this.sx = sx;}
	public int getsy() {	return sy;}
	public void setsy(int sy) {	this.sy = sy;}
	public int getrilimx() {	return rilimx;}
	public void setrilimx(int rilimx) {	this.rilimx = rilimx;}
	public int getuplimy() {	return uplimy;}
	public void setuplimy(int uplimy) {	this.uplimy = uplimy;}
	public int getlelimx() {	return lelimx;}
	public void setlelimx(int lelimx) {	this.lelimx = lelimx;}
	public int getdownlimy() {	return downlimy;}
	public void setdownlimy(int downlimy) {	this.downlimy = downlimy;}

	
	private BufferedImage show=null;
	public BufferedImage getshow() {	return show;}
	
	private Ground bg;
	public Ground getBg() {	        return bg;   }
	public void setBg(Ground bg){  this.bg=bg;   }

	//private boolean fp=true;//true左，false右
	private int foenum=0;
	Thread t=new Thread(this);
	
	//
	public Foe(int x,int y,String st_dog,int type,Ground bg){
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.sst=st_dog;
		this.type=type;
		this.bg=bg;
		this.x+=this.xsudu_dog;
		

		
		if(type==1){
			this.show=Sucai.dog.get(0);		
		}
		this.st_dog=st_dog;
		t.start();	
		t.suspend();//把线程挂机	
		
	}
	//重载构造方法用于食人花
	public Foe(int x,int y,String st_hua,int type,int uplimy,
			int downlimy,Ground bg		){
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.sst=st_hua;
		this.uplimy=uplimy;
		this.downlimy=downlimy;
		this.st_hua="up";
		this.type=type;
		this.bg=bg;
		if(type==2){
			this.show=Sucai.hua.get(0);
			
		}
		t.start();
	}
	
	
	public void rimove(){
		if(this.st_dog.indexOf("zou")!=-1||this.st_dog!="stop"){
			xsudu_dog=0;
			this.st_dog="stop";
		}else if(this.st_dog=="stop"){
			xsudu_dog=10;
			this.st_dog="stop_right";	
		}
	}
	

	public void lemove(){
		if(this.st_dog.indexOf("zou")!=-1||this.st_dog!="stop"){
			xsudu_dog=0;
			this.st_dog="stop";
		}else if(this.st_dog=="stop"){
			xsudu_dog=-10;
			this.st_dog="stop_left";	
		}
		
	}
	
	
	public void jump(){

		
	}
	
	public int dogdown(){						
		ysudu_dog=10;				
		return ysudu_dog;
	}
	 
	
	public void run() {
	
		while(true){
			boolean canri=true,canle=true,//判断可否移动向左右
					canupzhan=false,candown=false;
			if(type==1){//判断敌人类型根据类型显示
				if(this.st_dog.indexOf("left")!=-1){//包含左
					this.x-=5;
				}else if(this.st_dog.indexOf("right")!=-1){//包含右
					this.x+=5;
				}
				
				//交替显示敌人图片；,狗
				if(st_dog=="die"){
					foenum=2;
				}else if(foenum==0){
					foenum=1;
				}else{
					foenum=0;
				}
				
				//这里是定义横坐标极限位置，但是也可以按照碰撞极限来
				/*if(this.fp&&this.x==this.lelimx){
					this.fp=false;//经过上面的判断fp为false会x+=2;
				}
				if(!this.fp&&this.x==this.rilimx){
					this.fp=true;//经过上面的判断fp为false会x+=2;
				}*/
				
				//首先判断是否可以走
				for(int i=0;i<this.bg.getzaw().size();i++){//这里是指需要判断每个障碍物是否能走，有一个挡住就不走把can**变为false
					OB ob=this.bg.getzaw().get(i);
					//仅仅横坐标如果障碍物等于的x坐标阻止右
					if(ob.getx()==this.x+50&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
						canri=false;
					}
					//仅仅横坐标如果障碍物等于的x坐标阻止左
					if(ob.getx()==this.x-50&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
						canle=false;
					}	
					//阻挡它落下
					if(ob.gety()==this.y+60&&(ob.getx()+60>this.x
							&&ob.getx()-60<this.x)&&st_dog!="die"){				
						canupzhan=true;
					}
		
				}
				
				//是否会掉下去
				if(!canupzhan){			
					this.y=this.y+dogdown();
				}
				if(this.x>1080||this.x<-360){
					this.x=this.sx;
				}else if(!canle&&this.st_dog.indexOf("left")!=-1||this.x==-360){///////////不能向左并且正在向左，且已经到了最左边
					this.st_dog="right";
				}else if(!canri&&this.st_dog.indexOf("right")!=-1||this.x==1080){//不能向右并且正在向右，且已经到了最右边
					this.st_dog="left";
				}
								
					
				
						this.show=Sucai.dog.get(foenum);
				
			}
					
			if(type==2){
				if(this.st_hua.indexOf("up")!=-1){
					this.y-=3;
				}else if(this.st_hua.indexOf("down")!=-1){
					this.y+=3;
				}
				
				//交替显示敌人图片；,食人花
				if(foenum==0){
					foenum=1;
				}else if(foenum==1){
					foenum=0;
				}
				
				
				//如果花到达极限坐标
				if(this.st_hua.indexOf("up")!=-1&&this.y==this.uplimy){
					this.st_hua="down";//经过上面的判断fp为false会y+=2;
				}
				if(this.st_hua.indexOf("down")!=-1&&this.y==this.downlimy){
					this.st_hua="up";//经过上面的判断fp为frue会y+=2;
				}
				this.show=Sucai.hua.get(foenum);
			}
				
			
			if(type==3){//狗和龟用同一个构造方法/////////////
					//判断敌人类型根据类型显示
					this.x+=this.xsudu_dog;
					
					
					//首先判断是否可以走
					for(int i=0;i<this.bg.getzaw().size();i++){//这里是指需要判断每个障碍物是否能走，有一个挡住就不走把can**变为false
						OB ob=this.bg.getzaw().get(i);
						//仅仅横坐标如果障碍物等于的x坐标阻止右
						if(ob.getx()<=this.x+60&&ob.getx()-this.x>=40&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
							canri=false;
						}
						//仅仅横坐标如果障碍物等于的x坐标阻止左
						if(ob.getx()>=this.x-60&&ob.getx()-this.x<=40&&ob.gety()+60>this.y&&ob.gety()-60<this.y){
							canle=false;
						}	
						//阻挡它落下
						if(ob.gety()==this.y+60&&(ob.getx()+60>this.x
								&&ob.getx()-60<this.x)){				
							canupzhan=true;
						}
					
					}
					
					//是否会掉下去
					if(!canupzhan){			
						this.y=this.y+dogdown();
					}
					
					
					if(this.x>1080||this.x<-360){
						this.x=this.sx;
						this.y=this.sy;
					}else if(!canle&&this.st_dog.indexOf("left")!=-1||this.x==-360){///////////不能向左并且正在向左，且已经到了最左边
						if(this.st_dog.indexOf("zou")!=-1){
							xsudu_dog=5;
							this.st_dog="zou_right";
						}else{
							xsudu_dog=10;
							this.st_dog="stop_right";
						}
					}
					if(!canri&&this.st_dog.indexOf("right")!=-1||this.x==1080){//不能向右并且正在向右，且已经到了最右边
						if(this.st_dog.indexOf("zou")!=-1){
							xsudu_dog=-5;
							this.st_dog="zou_left";
						}else{
							xsudu_dog=-10;
							this.st_dog="stop_left";
						}
					}
						
					//交替显示敌人图片
					if(this.st_dog.indexOf("zou_left")!=-1){
						xsudu_dog=-5;
						if(foenum==0){
							foenum=1;
						}else if(foenum==1){
							foenum=0;
						}else{
							foenum=0;
						}
					}else if(this.st_dog.indexOf("zou_right")!=-1){
						xsudu_dog=5;
						if(foenum==2){
							foenum=3;
						}else if(foenum==3){
							foenum=2;
						}else{
							foenum=2;
						}
					}else if(this.st_dog.indexOf("stop")!=-1){
						foenum=4;
					}
						
					//if()
					this.show=Sucai.gui.get(foenum);			
			}
			
			
			
 
			
			 
			
			
			
			
			try {
 				Thread.sleep(50);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}	
			///if(st_dog=="die")
			///	this.die();
		}
	}
	
	public void startrun(){
		
			t.resume();//启动挂机的线程
	}
	
	public void reFoe() {
		this.x=sx;
		this.y=sy;
		this.st_dog=sst;
		this.st_hua=sst;
		//死亡的图片重置
		if(this.type==1){
			this.show=Sucai.dog.get(0);
		}else if(this.type==2){
			this.show=Sucai.hua.get(0);
		}else if(this.type==3){
			this.show=Sucai.gui.get(0);
		}
		
	}
	//public void die(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     /// 	
	//	this.bg.getdr().remove(this);
		//this.bg.getdiedr().add(this);
	//}
}
