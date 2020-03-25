package myPackage1;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;


public class Sence {
	long t = System.currentTimeMillis();//获得当前时间的毫秒数
    Random rd = new Random(t);//作为种子数传入到Random的构造器中
    
	private BufferedImage bg=null;
	BufferedImage getbg() {return bg;}
	
	public static ArrayList<v2> blankDot=new ArrayList<v2>();
	public static v2 mappSize=new v2(36,24);
	public static String[][] mapp=new String[mappSize.x][mappSize.y];
	public ArrayList<Ob> ob=new ArrayList<Ob>();
	public ArrayList<Food> food=new ArrayList<Food>();
	Snake snake1=null;
	Snake snake2=null;
	
	public Sence(){
		for(int i=0;i<mappSize.x;i++){
			for(int j=0;j<mappSize.y;j++){
				mapp[i][j]=" ";
			}
		}
		for(int i=0;i<MainForms.size.x;i+=30){
			for(int j=20;j<MainForms.size.y;j+=30){
				v2 v=new v2(i,j);
				blankDot.add(v);
			}
		}
		
		for(int i=0;i<MainForms.size.x;i+=30){//画得到墙
			this.addOb(new v2(i,20));
		}
		for(int i=0;i<MainForms.size.x;i+=30){//画得到墙
			this.addOb(new v2(i,MainForms.size.y-30));
		}
		for(int i=50;i<MainForms.size.y-30;i+=30){//画得到墙
			this.addOb(new v2(0,i));
		}
		for(int i=50;i<MainForms.size.y-30;i+=30){//画得到墙
			this.addOb(new v2(MainForms.size.x-30,i));
		}
		/*for(int i=0;i<10;i++){
			this.addRandOb();
		}*/
		/*for(int i=0;i<MainForms.size.x-360;i+=30){//画得到墙
			this.addOb(new v2(i,80));
		}
		for(int i=0;i<MainForms.size.x;i+=30){//画得到墙
			this.addOb(new v2(i,350));
		}
		for(int i=80;i<MainForms.size.y-330;i+=30){//画得到墙
			this.addOb(new v2(360,i));
		}*/
		
		
		for(int i=0;i<1;i++){
			this.addFood();
		}
		
		snake1=new Snake(new v2(300,50),new v2(1,0),3,1,"snake1");
		snake2=new Snake(new v2(1200,680),new v2(-1,0),3,1,"snake2");
		
	}
	
	public void addOb(v2 pos){
		
		for(int i=0;i<blankDot.size();i++){
			if(blankDot.get(i).x==pos.x&&blankDot.get(i).y==pos.y){
				blankDot.remove(i);
				this.ob.add(new Ob(pos.x,pos.y,1));
				mapp[pos.x/30][(pos.y-20)/30]="O";
				break;
			}
		}
		
	}
	public void addRandOb(){
		int randNum=this.rd.nextInt(blankDot.size());//生成随即整数
		this.ob.add(new Ob(blankDot.get(randNum).x,blankDot.get(randNum).y,1));
		
	}
	public void addFood(){
		int randNum=this.rd.nextInt(blankDot.size());//生成随即整数
		int kind=this.rd.nextInt(5);
		this.food.add(new Food(blankDot.get(randNum).x,blankDot.get(randNum).y,kind));
	}
	public void removeFood(int i){
		Sence.mapp[this.food.get(i).pos.x/30][(this.food.get(i).pos.y-20)/30]="S";
		this.food.remove(i);
		
	}
}
