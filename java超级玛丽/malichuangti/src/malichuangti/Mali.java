package malichuangti;

import java.awt.image.BufferedImage;

import javax.swing.JOptionPane;

public class Mali implements Runnable {// ������Ҫ�߳̿��������ƶ�
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

	private Ground bg;// һ����������������������ȡ�����ϰ�������

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

	private Thread t = null;// ///////////��ʼ��һ���̶߳������̵߳Ĺ��췽��run��ʵ����д����
	private int xsudu = 0;

	double ysudu = 0;

	private int uptime = 0;// ����ʱ��
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

	private int malibu = 0;// ������·��ͼƬ˳��
	private String st;

	private BufferedImage show;

	public BufferedImage getshow() {
		return show;
	}

	// ���췽��
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

	// �������ķ�����Ҫ�õ��̣߳�

	public void lemove() {
		// ��Ҫ�ı��ٶ�
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

	public void jump(int s,int t) {// ����������Ծ
		if (this.st.indexOf("jumping") == -1) {// ���
			if (this.st.indexOf("le") != -1) {
				this.st = "jumping_le";
			} else {//
				this.st = "jumping_ri";
			}
			ysudu = -t;

			uptime = s;
		}

	}

	public void down() {// ������������
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

		while (true) {// ��ѭ��

			boolean canri = true, canle = true, // �жϿɷ��ƶ�������
			canupzhan = false, candown = false;
			for (int i = 0; i < this.bg.getzaw().size(); i++) {// ������ָ��Ҫ�ж�ÿ���ϰ����Ƿ����ߣ���һ����ס�Ͳ��߰�can**��Ϊfalse
				OB ob = this.bg.getzaw().get(i);
				// ��������������ϰ������������x������ֹ��
				if (ob.gettype() != 12) {
				
					if (ob.getx() <= this.x + 50 && ob.getx() - this.x >= 45
							&& ob.gety() + 60 > this.y
							&& ob.gety() - 60 < this.y && ob.gettype() != 3) {
						this.x = ob.getx() - 50;
						//canri = false;
					}
					// ��������������ϰ������������x������ֹ��
					if (this.x - ob.getx() <= 50 && this.x - ob.getx() >= 45
							&& ob.gety() + 60 > this.y
							&& ob.gety() - 60 < this.y && ob.gettype() != 3) {
						this.x = ob.getx() + 50;
						//canle = false;
					}
					// �����ж�y������Ƿ���ֹ���Ƿ����ϰ��������
					if (ob.gety() <= this.y + 60
							&& ob.gety() >= this.y - 20
							&& (ob.getx() + 50 > this.x
									&& ob.getx() - 50 < this.x && ob.gettype() != 3)) {
						this.y = ob.gety() - 60;
						canupzhan = true;
						if (ob.isBo()) {// ���ʵ�黹����ȡ��֮������ƶ�
							this.y += ob.ysu;
							this.x += ob.xsu;
						}
					}

					// �ж��Ƿ񶥵�����////!!
					if (ob.gety() + 60 >= this.y
							&& ob.gety() + 60 - this.y <= 20
							&& (ob.getx() + 50 > this.x && ob.getx() - 50 < this.x)
							&& uptime > 0) {
						// ����ש��
						this.y = ob.gety() + 60;
						if (ob.gettype() == 0) {
							// this.bg.getzaw().remove(ob);
							// ������ô���£����ñ����Ա��´�����
							ob.settype(12);// ��type��set�������иı䣬�����¾�ı�ͼƬ
							ob.gengxinOB();
							//ob.st_ob="die";
						}

						// ��������ש��
						if (ob.gettype() == 3 && uptime > 0) {
							ob.settype(2);// ��type��set�������иı䣬�����¾�ı�ͼƬ
							ob.gengxinOB();
							//ob.st_ob="die";
						}
						// ����ש��
						if (ob.gettype() == 4) {
							ob.settype(2);// ��type��set�������иı䣬�����¾�ı�ͼƬ
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
			} else {// �������Ҳ���ǲ���վ,��ȥ��y����һ���ٶ���һ��
				if (this.st.indexOf("le") != -1) {
					this.st = "jumping_le";
				} else {//
					this.st = "jumping_ri";
				}
				if (uptime != 0) {// �����junp()�������õ�ʱ�䲻��0
					uptime--;// ��ȥ���٣�
				} else {// ��0�˲��������˾�ȥ����
					this.down();
				}

				y += ysudu;
			}

			// �������������ж�
			for (int i = 0; i < this.bg.getdr().size(); i++) {
				Foe e = this.bg.getdr().get(i);
				// �������
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

				// /////////�Ƿ�ȵ�����
				if (e.gety() <= this.y + 60 && this.y + 60 - e.gety() < 20
						&& (e.getx() + 60 > this.x && e.getx() - 60 < this.x)
						&& this.st.indexOf("jumping") != -1 && uptime <= 0) {// ����ע���п���վ��̨�������ֲ���
					this.y = e.gety() - 60;
					cai(e);
				}
			}

			if (this.y > 600)// ��IF�½����棬���������У�������
				this.Malidie();//
			if ((canle && xsudu < 0)/* ���������߲��ҿ���ȥ�߲��� */|| (canri && xsudu > 0)) {
				x += xsudu;// ��x������иı䣬�Ա���drawimage������ͼ��
				if (x < 0)
					x = 0;
			}
			int fangxiang = 0;// ��ʾ����ͼƬ����ʱ����
			// ������������
			if (this.st.indexOf("le") != -1) {// .inexOf("")�����ж��ַ����Ƿ����
				fangxiang += 5;
			}
			// ������
			if (this.st.indexOf("mo") != -1) {// ��·
				fangxiang += malibu;
				malibu++;
				if (malibu == 4)
					malibu = 0;
			}
			if (this.st.indexOf("jumping") != -1) {// �������jumping˵����������Ҫ������ͼƬ
				fangxiang += 4;// ����֮ǰ�Ѿ����˶����ҵ��жϣ����ﲻ���жϷ�����+4��ô��������ͼ
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
