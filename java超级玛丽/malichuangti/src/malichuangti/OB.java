package malichuangti;
import java.awt.image.BufferedImage;


//障碍物类
public class OB implements Runnable{
	public int uplimy, dolimy, rilimx,lelimx;
	private int x,y,type,stype,//障碍物类型
				sx,sy;//初始位置，用于场景滚动的后人物死亡
	int xsu=0;
	int ysu=0;
	private int q;
	public int getxsu() {		return sx;}
	public void setxsu(int sx) {	this.sx = sx;}
	public int getysu() {	return sy;}
	public void setysu(int sy) {	this.sy = sy;}
	public int getq() {	return q;}
	public void setq(int q) {	this.q = q;}
	public int getsx() {	return sx;}
	public void setsx(int sx) {	this.sx = sx;}
	public int getsy() {	return sy;	}
	public void setsy(int sy) {		this.sy = sy;	}
	public void setx(int x) {	this.x = x;}
	public void sety(int y) {	this.y = y;}
	public void settype(int type) {	this.type = type;}
	public void setstype(int stype) {	this.stype = stype;}
	public int  gettype(){return type;}
	public int  getx() 	{return x;}
	public int  gety() 	{return y;}
	
	String st_ob="";//初始状态//改变
	private String sst_ob="";//死后要返回的状态
	private String fst="";//表示移动类型
	
	private boolean Bo=false;
	public boolean isBo() {	return Bo;}
	

	private BufferedImage show=null;//一个临时显示障碍物的图片
	public void setshow(BufferedImage show) {this.show = show;}
	public BufferedImage getshow() {return show;}
	
	private Ground bg;
	
	Thread t=new Thread(this);
	
	//用来显示图片地方法，和类同名地方法
	public OB(int x,int y,int type){
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.type=type;
		this.stype=type;
		this.st_ob="";
		
		gengxinOB();
	}
	public OB(int x,int y,int type,String st_ob,String fst,int uplimy,
			int dolimy,int lelimx,int rilimx,int q){//重载方法，会动的障碍
		this.x=x;
		this.y=y;
		this.sx=x;
		this.sy=y;
		this.q=q;
		this.uplimy=uplimy;
		this.dolimy=dolimy;
		this.lelimx=lelimx;
		this.rilimx=rilimx;
		this.type=type;
		this.stype=type;
		this.st_ob=st_ob;
		this.sst_ob=st_ob;
		this.fst=fst;
		gengxinOB();
		t.start();
	}
	//更新障碍物地方法形成动画
	public void gengxinOB(){
		show=Sucai.ob.get(type);//根据类型显示障碍物图片，ob的list第type个	
	}
	
	public void range_move(){//下落地方法
		if(this.x==rilimx){
			xsu=-xsu;
			st_ob=st_ob.replace("right","left");
		}
		if(this.x==lelimx){
			xsu=-xsu;
			st_ob=st_ob.replace("left","right");
		}
		if(this.y==uplimy){
			ysu=-ysu;
			st_ob=st_ob.replace("up","down");
		}
		if(this.y==dolimy){
			ysu=-ysu;
			st_ob=st_ob.replace("down","up");
		}
	}
	
	public void die(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     /// 	
		this.bg.getzaw().remove(this);
		this.bg.getdiezaw().add(this);
	}
	
	public void move(){
		if(this.st_ob.indexOf("up")!=-1){
		
			this.ysu=-q;
		}else if(this.st_ob.indexOf("down")!=-1){
			
			this.ysu=q;
		}
		if(this.st_ob.indexOf("right")!=-1){
			this.xsu=q;
			
		}else if(this.st_ob.indexOf("left")!=-1){
			this.xsu=-q;
		
		}
	}
    
	//死后需要重置障碍物
	public void reOB(){	
		this.x=sx;
		this.y=sy;
		Bo=false;
		this.st_ob=sst_ob;
		this.type=stype;//变成初始图片类型
		this.gengxinOB();//改变显示一下图片
		
	}
	
	
	
	public void run() {
		while(true){
			if(this.x>1200||this.x<-300||this.y>900||this.y<-300)
				st_ob+="-stop";
			else{
				st_ob=st_ob.replace("stop","");
			}
			if(this.st_ob.indexOf("stop")==-1){
			boolean canri=true,canle=true,//判断可否移动向左右
					canupzhan=false,candown=false;
			if(fst=="m"){
				this.move();
				this.range_move();	
				this.x+=xsu;
				this.y+=ysu;
			}else if(fst=="s"){//s代表触发从上面走会掉的砖
				if(this.y==Mali.gety()+60&&this.x+40>Mali.getx()
						&&this.x-40<Mali.getx()||Bo){
					Bo=true;
					this.move();
					this.range_move();	
					this.x+=xsu;
					this.y+=ysu;
					}
			}else if(fst=="u"){//u代表触发从底下走动的砖
				if(Mali.gety()-this.y<=160&&this.x+40>Mali.getx()
						&&this.x-40<Mali.getx()||Bo){
					Bo=true;
					this.move();
					this.range_move();	
					this.x+=xsu;
					this.y+=ysu;;
					}
				//System.out.println(ysu);
			}
			
			///if(this.st_ob=="die")
			///	this.die();
			
			show=Sucai.ob.get(type);
			try {
 				Thread.sleep(50);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			}
		}	
	}
}
