package myPackage1;

import java.util.List;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;

public class InitMaterial {
	public static String filePos=System.getProperty("user.dir")+"/pictures/";
	public static BufferedImage pic_bg=null;//±³¾°
	public static BufferedImage pic_ob=null;//Ç½
	public static List<BufferedImage> pic_snake=new ArrayList<BufferedImage>();//ÉßµÄÍ¼Æ¬
	public static List<BufferedImage>pic_food=new ArrayList<BufferedImage>();//Ê³ÎïµÄÍ¼Æ¬
	public static void in(){
		try {
			pic_bg=ImageIO.read(new File(filePos+"background.png"));
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		try {
			pic_ob=ImageIO.read(new File(filePos+"ob1.png"));
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		for(int i=1;i<=3;i++){	
			try {
				pic_snake.add(ImageIO.read(new File(filePos+"snake"+i+".png")));
			} catch (IOException e) {
				e.printStackTrace();
			}	
		}
		
		for(int i=1;i<=5;i++){	
			try {
				pic_food.add(ImageIO.read(new File(filePos+"food"+i+".png")));
			} catch (IOException e) {
				e.printStackTrace();
			}	
		}
	}

}
