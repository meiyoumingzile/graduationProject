package malichuangti;

import java.util.List;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class Sucai {
	public static String s=System.getProperty("user.dir")+"/sucai/";
	public static ImageReader start=null;/////////////
	public static ImageInputStream f=null;////三个背景图片、、、、
	public static ImageInputStream ef=null;////////////////
	public static ImageInputStream malidie=null;//玛丽死亡
	public static List<ImageInputStream> mali=new ArrayList<ImageInputStream>();//玛丽的图片
	public static List<ImageInputStream> hua=new ArrayList<ImageInputStream>();//食人花
	public static List<ImageInputStream> dog=new ArrayList<ImageInputStream>();//狗
	public static List<ImageInputStream> gui=new ArrayList<ImageInputStream>();//乌龟
	public static List<ImageInputStream> ob=new ArrayList<ImageInputStream>();//障碍物；
	
	//初始化；
public static void in(){
	try {
		start=ImageReader.read(new File(s+"start.gif")); 
	} catch (IOException e1) {
		e1.printStackTrace();
	}
	try {
		f=(ImageInputStream) ImageIO.read(new File(s+"first.gif"));
	} catch (IOException e1) {
		e1.printStackTrace();
	}
	try {
		ef=(ImageInputStream) ImageIO.read(new File(s+"efirst.gif"));
	} catch (IOException e1) {
		e1.printStackTrace();
	}
	try {
		malidie=(ImageInputStream) ImageIO.read(new File(s+"die.gif"));
	} catch (IOException e1) {
		e1.printStackTrace();
	}
	
	for(int i=1;i<=10;i++){
		try {
			mali.add((ImageInputStream) ImageIO.read(new File(s+""+i+".gif")));
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	for(int i=1;i<=2;i++){	
		try {
			hua.add((ImageInputStream) ImageIO.read(new File(s+"hua"+i+".gif")));
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	for(int i=1;i<=3;i++){	
		try {
			dog.add((ImageInputStream) ImageIO.read(new File(s+"dog"+i+".gif")));
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	for(int i=1;i<=5;i++){	
		try {
			gui.add((ImageInputStream) ImageIO.read(new File(s+"gui"+i+".gif")));
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	for(int i=1;i<=12;i++){	
		try {
			ob.add((ImageInputStream) ImageIO.read(new File(s+"ob"+i+".gif")));
		} catch (IOException e) {
			e.printStackTrace();
		}	
	}
	
	try {
			ob.add((ImageInputStream) ImageIO.read(new File(s+"ob"+4+".gif")));
		} catch (IOException e) {
				// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
	
}
	
}
