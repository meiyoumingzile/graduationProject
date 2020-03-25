package malichuangti;
import java.util.List;
import java.awt.image.BufferedImage;
import java.util.ArrayList;


//场景类，需要把其他类放入场景里面，在Ground内实现
public class Ground {
	private BufferedImage bg=null;
	BufferedImage getbg() {
		return bg;
	}
	
	private int gsort=1;//场景顺序
	public int getgsort() {		return gsort;}
	public void setgsort(int gsort) {		this.gsort = gsort;	}

	private boolean gfg=false;//场景是否是最后一个
	
	private List <OB>zaw=new ArrayList<OB>();//障碍物
	public List<OB> getzaw() {		return zaw;	}

	private List <OB>diezaw=new ArrayList<OB>();//没了的障碍物
	public List <OB>getdiezaw() {	return diezaw;  }

	private List <Foe>dr=new ArrayList<Foe>();//敌人
	public List <Foe>getdr() {	return dr;	 	 }
	private List <Foe>diedr=new ArrayList<Foe>();//死了的敌人
	public List <Foe>getdiedr(){	return diedr;}
	public Ground(int gsort,boolean gfg){//需要设为类方法
		
		/*if(gfg){
			bg=Sucai.ef;		
		}
		else{
			bg=Sucai.f;
		}*/	
		/*
		 * 接下来布置关卡
		 */
		if(gsort==1){//如果在第一个场景
			
			this.zaw.add(new OB(0,540,9));
			for(int i=0;i<17;i++)		
					this.zaw.add(new OB(i*60,540,9));	
			for(int i=0;i<5;i++)		
				this.zaw.add(new OB(1320+i*60,540,9));	
			for(int i=0;i<3;i++)		
				this.zaw.add(new OB(1620+i*60,540,9,"down_up","s",540,1500,1320+i*60,1320+i*60,20));
			this.zaw.add(new OB(1200,540,9,"down_up","s",540,1500,1200,1200,10));
			this.zaw.add(new OB(1140,540,9,"down_up","s",540,1500,1140,1140,10));
			this.zaw.add(new OB(1080,540,9,"down_up","s",540,1500,1080,1080,10));
			this.zaw.add(new OB(1020,540,9,"down_up","s",540,1500,1020,1020,10));			
			for(int i=0;i<9;i++)		
				this.zaw.add(new OB(1800+i*60,540,9));
			this.zaw.add(new OB(2340,480,9));
			this.zaw.add(new OB(2400,480,9,"down_up","s",480,600,2400,2400,10));
			this.zaw.add(new OB(2460,60,10,"down_up","u",60,480,2460,2460,20));
			for(int i=1;i<=6;i++)this.zaw.add(new OB(2460,60+i*60,10,"down_up","u",60+i*60,1500,2460,2460,20));
			for(int i=0;i<9;i++)this.zaw.add(new OB(2760+i*60,960,9,"up-down","u",360,840,2760+i*60,2760+i*60,10));
			
				
			/*
			 * ?砖
			 */
			this.zaw.add(new OB(360,360,4));
			
			this.zaw.add(new OB(480,360,4));
			
			this.zaw.add(new OB(420,180,4));
			this.zaw.add(new OB(2040,480,4));
			this.zaw.add(new OB(2100,480,4));
			this.zaw.add(new OB(2100,420,4));
			this.zaw.add(new OB(2160,480,4));
			this.zaw.add(new OB(2160,360,4));
			this.zaw.add(new OB(2160,420,4));
			//this.zaw.add(new OB(2220,480,4));
			//this.zaw.add(new OB(2220,420,4));
			//this.zaw.add(new OB(2280,480,4));
			
			for(int i=0;i<2;i++){
				this.zaw.add(new OB(1500+i*60,360,4));
				this.zaw.add(new OB(1500+i*60,180,4));
				this.zaw.add(new OB(1800+i*60,180,4));
				this.zaw.add(new OB(1800+i*60,180,4));
			}
			for(int i=0;i<3;i++){
				this.zaw.add(new OB(1620+i*60,360,4,"down-up","s",360,1500,1620+i*60,1620+i*60,20));
				this.zaw.add(new OB(1620+i*60,180,4,"down-up","s",180,1500,1620+i*60,1620+i*60,20));
			}
			//以上？砖
			
			this.zaw.add(new OB(300,360,0));
			this.zaw.add(new OB(420,360,0));
			this.zaw.add(new OB(540,360,0));
			this.zaw.add(new OB(60,480,0));
			this.zaw.add(new OB(180,360,0,"right_up","u",0,420,0,540,5));
			//以上是绘砖
			
			/*
			 * 隐藏砖
			 */
			this.zaw.add(new OB(660,180,3));
			this.zaw.add(new OB(540,180,3));
			this.zaw.add(new OB(600,180,3));
			this.zaw.add(new OB(660,180,3));
			this.zaw.add(new OB(660,300,3));
			this.zaw.add(new OB(720,180,3));
			this.zaw.add(new OB(1020,360,3));
			for(int i=0;i<2;i++){
				this.zaw.add(new OB(1620+i,0,3));
				this.zaw.add(new OB(1620+i,60,3));
				this.zaw.add(new OB(1620+i,240,3));	
			}
			//这是一个隐藏砖块
			
			this.zaw.add(new OB(660,540,8));
			this.zaw.add(new OB(720,540,5));
			this.zaw.add(new OB(660,480,6));
			this.zaw.add(new OB(720,480,7));
			
			this.zaw.add(new OB(1260,540,8));
			this.zaw.add(new OB(1320,540,5));
			this.zaw.add(new OB(1260,480,8));
			this.zaw.add(new OB(1320,480,5));
			this.zaw.add(new OB(1260,420,6));
			this.zaw.add(new OB(1320,420,7));
			
			this.zaw.add(new OB(1260,540,8));
			this.zaw.add(new OB(1320,540,5));
			this.zaw.add(new OB(1260,480,8));
			this.zaw.add(new OB(1320,480,5));
			this.zaw.add(new OB(1260,420,6));
			this.zaw.add(new OB(1320,420,7));
			
			
			/*this.zaw.add(new OB(1260,540,8));
			this.zaw.add(new OB(1320,540,5));
			this.zaw.add(new OB(1260,540,8));
			this.zaw.add(new OB(1320,540,5));
			this.zaw.add(new OB(1260,480,8));
			this.zaw.add(new OB(1320,480,5));
			this.zaw.add(new OB(1260,420,6));
			this.zaw.add(new OB(1320,420,7));*/
			//一上是水管
			
			/*一下绘制敌人
			 * 1狗，2花，3龟
			*/
			this.dr.add(new Foe(600,480,"right",1,this));
			this.dr.add(new Foe(960,480,"left",1,this));
			this.dr.add(new Foe(690,540,"up",2,420,540,this));
			this.dr.add(new Foe(1290,480,"up",2,360,480,this));
			this.dr.add(new Foe(480,240,"right",1,this));
			this.dr.add(new Foe(900,240,"left",1,this));
			this.dr.add(new Foe(480,480,"zou_left",3,this));
		}
		else if(gsort==2){
			for(int i = 0; i<this.getdr().size(); i++){
				this.dr.remove(this);		
			}
			for(int i = 0; i<this.getzaw().size(); i++){
				this.zaw.remove(this);		
			}
			
		}
	}
	
	//public void 
	
	public void foebegin(){
		for(int i=0;i<this.dr.size();i++){
			this.dr.get(i).startrun();
		}
	}
	//接下来是重置方法，负责把玛丽死亡后重新开始游戏
	public void repackfround(){	
		//把没了的全都放回去
		this.dr.addAll(this.diedr);
		this.zaw.addAll(this.diezaw);
		//调用敌人的重置方法
		for(int i=0;i<this.dr.size();i++){
			this.dr.get(i).reFoe();
		}
		
		for(int i=0;i<this.zaw.size();i++){
			this.zaw.get(i).reOB();
		}
	}
		
}
