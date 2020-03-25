package myPackage1;

import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;


public class SnakeNode implements Collision{
	private String name="";
	private int type;
	public int intervalSleep=100;
	public v2 pos=new v2(0,0);
	
	public BufferedImage show=null;//一个显示的图片
	
	public SnakeNode(int x,int y,int type){//type是图片类型
		this.pos.set(x,y);
		this.type=type;
		this.show=InitMaterial.pic_snake.get(type);
	}
	
	public boolean VisCollision(v2 otherPos) {
		if(Math.abs(this.pos.x-otherPos.x)<29&&Math.abs(this.pos.y-otherPos.y)<29){
			return true;
		}else{
			return false;
		}
	}
	
	
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
		this.show=InitMaterial.pic_snake.get(type);
	}
	
	public void setShow(BufferedImage show) {
		this.show = show;
	}
	public BufferedImage getshow() {
		return show;
	}
	

}
