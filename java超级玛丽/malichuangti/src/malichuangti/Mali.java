package malichuangti;

import java.awt.image.BufferedImage;

import javax.swing.JOptionPane;

public class Mali implements Runnable {// 这里需要线程控制玛丽移动
	private static int x;
	private static int y;

	void setx(int x) {
		Mali.x = x;
	}

	void sety(int y) {
		Mali.y = y;
	}

	static int getx() {
		return x;
	}

	static int gety() {
		return y;
	}

	private int life, fen;

	public int getlife() {
		return life;
	}

	public void setlife(int life) {
		this.life = life;
	}

	public int getfen() {
		return fen;
	}

	public void setfen(int fen) {
		this.fen = fen;
	}

	private Ground bg;// 一个场景变量，后面用来获取场景障碍物坐标

	public Ground getbg() {
		return bg;
	}

	public void setbg(Ground bg) {
		this.bg = bg;
	}

	private boolean dead = false;

	public boolean isdead() {
		return dead;
	}

	public void setdead(boolean dead) {
		this.dead = dead;
	}

	public boolean gunping = false;

	private Thread t = null;// ///////////初始化一个线程对象，在线程的构造方法run中实现重写它；
	private int xsudu = 0;

	double ysudu = 0;

	private int uptime = 0;// 上升时间
	private int limuptime = 0;

	public int getlimuptime() {
		return limuptime;
	}

	public void setlimuptime(int limuptime) {
		this.limuptime = limuptime;
	}

	public int getuptime() {
		return uptime;
	}

	public void setuptime(int uptime) {
		this.uptime = uptime;
	}

	private int malibu = 0;// 玛丽走路的图片顺序
	private String st;

	private BufferedImage show;

	public BufferedImage getshow() {
		return show;
	}

	// 构造方法
	public Mali(int x, int y) {
		this.x = x;
		this.y = y;
		this.st = "stop_ri";
		this.show = Sucai.mali.get(0);
		t = new Thread(this);

		t.start();

	}

	public void Malidie() {

		this.life--;
		if (this.life == 0) {
			this.dead = true;
		} else {
		//	this.bg.repackfround();

			Mali.x=0;
			Mali.y=-300;
			this.uptime=0;
			this.xsudu=0;
			this.st ="stop_ri";
		}
	}

	// 接下来的方法需要用到线程；

	public void lemove() {
		// 需要改变速度
		this.xsudu = -5;
		if (this.st.indexOf("jumping") != -1) {
			this.st = "jumping_le";
		} else {
			st = "mo_le";
		}
	}

	public void rimove() {
		this.xsudu = 5;
		if (this.st.indexOf("jumping") != -1) {
			st = "jumping_ri";
		} else {
			st = "mo_ri";
		}
	}

	public void lestop() {
		this.xsudu = 0;

		if (this.st.indexOf("jumping") != -1) {
			st = "jumping_le";
		} else {
			st = "stop_le";
		}
	}

	public void ristop() {
		this.xsudu = 0;

		if (this.st.indexOf("jumping") != -1) {
			st = "jumping_ri";
		} else {
			st = "stop_ri";
		}
		this.xsudu = 0;
	}

	public void jump(int s,int t) {// 仅负责上跳跃
		if (this.st.indexOf("jumping") == -1) {// 如果
			if (this.st.indexOf("le") != -1) {
				this.st = "jumping_le";
			} else {//
				this.st = "jumping_ri";
			}
			ysudu = -t;

			uptime = s;
		}

	}

	public void down() {// 仅负责向下落
		if (this.st.indexOf("jumping") != -1) {
			if (this.st.indexOf("le") != -1) {
				this.st = "jumping_le";
			} else {//
				this.st = "jumping_ri";
			}
			ysudu = 15;
		}
	}

	public void cai(Foe e) {
		if (e.gettype() == 1 && e.st_dog != "die") {
			e.st_dog = "die";
			this.uptime = 10;
			this.ysudu = -15;

		} else if (e.gettype() == 2
				&& (e.getx() + 40 > this.x && e.getx() - 40 < this.x)) {
			this.Malidie();
		} else if (e.gettype() == 3) {
			if (this.x + 60 <= e.getx() + 30) {
				e.rimove();
				this.uptime = 10;
				this.ysudu = -15;

			} else {
				e.lemove();
				this.uptime = 10;
				this.ysudu = -15;

			}
		}
	}

	public void run() {

		while (true) {// 主循环

			boolean canri = true, canle = true, // 判断可否移动向左右
			canupzhan = false, candown = false;
			for (int i = 0; i < this.bg.getzaw().size(); i++) {// 这里是指需要判断每个障碍物是否能走，有一个挡住就不走把can**变为false
				OB ob = this.bg.getzaw().get(i);
				// 仅仅横坐标如果障碍物等于玛丽的x坐标阻止右
				if (ob.gettype() != 12) {
				
					if (ob.getx() <= this.x + 50 && ob.getx() - this.x >= 45
							&& ob.gety() + 60 > this.y
							&& ob.gety() - 60 < this.y && ob.gettype() != 3) {
						this.x = ob.getx() - 50;
						//canri = false;
					}
					// 仅仅横坐标如果障碍物等于玛丽的x坐标阻止左
					if (this.x - ob.getx() <= 50 && this.x - ob.getx() >= 45
							&& ob.gety() + 60 > this.y
							&& ob.gety() - 60 < this.y && ob.gettype() != 3) {
						this.x = ob.getx() + 50;
						//canle = false;
					}
					// 仅仅判断y坐标的是否阻止，是否处在障碍物的上面
					if (ob.gety() <= this.y + 60
							&& ob.gety() >= this.y - 20
							&& (ob.getx() + 50 > this.x
									&& ob.getx() - 50 < this.x && ob.gettype() != 3)) {
						this.y = ob.gety() - 60;
						canupzhan = true;
						if (ob.isBo()) {// 多次实验还是在取整之后进行移动
							this.y += ob.ysu;
							this.x += ob.xsu;
						}
					}

					// 判断是否顶到东西////!!
					if (ob.gety() + 60 >= this.y
							&& ob.gety() + 60 - this.y <= 20
							&& (ob.getx() + 50 > this.x && ob.getx() - 50 < this.x)
							&& uptime > 0) {
						// 处理砖块
						this.y = ob.gety() + 60;
						if (ob.gettype() == 0) {
							// this.bg.getzaw().remove(ob);
							// 不能这么完事，还得保存以便下次重置
							ob.settype(12);// 对type用set方法进行改变，用于下句改变图片
							ob.gengxinOB();
							//ob.st_ob="die";
						}

						// 处理隐藏砖块
						if (ob.gettype() == 3 && uptime > 0) {
							ob.settype(2);// 对type用set方法进行改变，用于下句改变图片
							ob.gengxinOB();
							//ob.st_ob="die";
						}
						// 处理？砖块
						if (ob.gettype() == 4) {
							ob.settype(2);// 对type用set方法进行改变，用于下句改变图片
							ob.gengxinOB();
							//ob.st_ob="die";
						}

						uptime = 0;
					}
				}

			}

			if (canupzhan && uptime == 0) {
				if (this.st.indexOf("le") != -1) {
					if (xsudu != 0)
						this.st = "mo_le";
					else
						this.st = "stop_le";
				} else {
					if (xsudu != 0)
						this.st = "mo_ri";
					else
						this.st = "stop_ri";
				}
			} else {// 如果不是也就是不能站,则去给y加上一个速度走一下
				if (this.st.indexOf("le") != -1) {
					this.st = "jumping_le";
				} else {//
					this.st = "jumping_ri";
				}
				if (uptime != 0) {// 如果在junp()方法设置的时间不是0
					uptime--;// 就去减少；
				} else {// 是0了不能再上了就去下落
					this.down();
				}

				y += ysudu;
			}

			// 玛丽死亡进行判断
			for (int i = 0; i < this.bg.getdr().size(); i++) {
				Foe e = this.bg.getdr().get(i);
				// 左边碰到
				if (e.getx() + 50 > this.x && e.getx() - 50 < this.x
						&& e.gety() + 60 > this.y && e.gety() - 45 < this.y) {
					if (e.gettype() == 1 && e.st_dog != "die")
						this.Malidie();
					if (e.gettype() == 2 && e.getx() + 45 > this.x
							&& e.getx() - 45 < this.x) {
						this.Malidie();
					}
					if (e.gettype() == 3
							&& (e.st_dog.indexOf("right") != -1 || e.st_dog
									.indexOf("left") != -1)) {
						this.Malidie();
					}
				}

				// /////////是否踩到东西
				if (e.gety() <= this.y + 60 && this.y + 60 - e.gety() < 20
						&& (e.getx() + 60 > this.x && e.getx() - 60 < this.x)
						&& this.st.indexOf("jumping") != -1 && uptime <= 0) {// 这里注意有可能站在台阶上这种不算
					this.y = e.gety() - 60;
					cai(e);
				}
			}

			if (this.y > 600)// 在IF下降后面，如果掉入坑中，就死亡
				this.Malidie();//
			if ((canle && xsudu < 0)/* 正在向左走并且可以去走才走 */|| (canri && xsudu > 0)) {
				x += xsudu;// 对x坐标进行改变，以便在drawimage方法绘图；
				if (x < 0)
					x = 0;
			}
			int fangxiang = 0;// 显示玛丽图片的临时变量
			// 左右玛丽方向
			if (this.st.indexOf("le") != -1) {// .inexOf("")方法判断字符串是否包含
				fangxiang += 5;
			}
			// 左右走
			if (this.st.indexOf("mo") != -1) {// 走路
				fangxiang += malibu;
				malibu++;
				if (malibu == 4)
					malibu = 0;
			}
			if (this.st.indexOf("jumping") != -1) {// 如果包含jumping说明正在跳需要用跳的图片
				fangxiang += 4;// 由于之前已经有了对左右的判断，这里不用判断方向了+4怎么都是跳的图
			}
			
			this.show = Sucai.mali.get(fangxiang);
			try {
				
					Thread.sleep(50);
				
			} catch (InterruptedException e) {

				e.printStackTrace();
			}

		}
	}

}
