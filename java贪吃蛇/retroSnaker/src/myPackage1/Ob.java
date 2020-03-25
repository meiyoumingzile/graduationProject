package myPackage1;

import java.awt.image.BufferedImage;


public class Ob {
	public v2 pos;
	private int type;
	public BufferedImage show=null;//一个显示的图片
	public Ob(int x,int y,int type){
		this.pos=new v2(x,y);
		this.type=type;
		this.show=InitMaterial.pic_ob;
		this.arriveDot(x,y);
	}
	public void add(v2 pos){
		this.pos.set(pos);
	}
	public void arriveDot(int x,int y){
		for(int i=0;i<Sence.blankDot.size();i++){
			if(Sence.blankDot.get(i).x==x&&Sence.blankDot.get(i).y==y){
				Sence.blankDot.remove(i);
				Sence.mapp[x/30][(y-20)/30]="O";
				break;
			}
		}
	}
}
