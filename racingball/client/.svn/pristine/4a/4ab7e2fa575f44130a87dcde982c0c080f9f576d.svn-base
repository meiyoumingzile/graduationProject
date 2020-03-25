/**
 * Author:terran
 * Email:terran.tian@foxmail.com
 * 
 * Time:下午4:50 2016年12月29日
**/


abstract class Facade {
	static inst: Facade;

	private _responders = [];

	private emiter: Emiter;
	constructor() {
		// if(Facade.inst) throw "singleton error";
		Facade.inst = this;

		this.emiter = new Emiter();
	}

	public registResponser(res: IResponder) {
		if (this._responders.some(item => item.res == res))
			throw "this responser has been registed already!"

		let arr = res.listResponse();
		let ids = [];
		for (let name of arr) {
			let id = this.emiter.on(name, (data) => {
				res.doResponse(name, data);
			})
			ids.push({ name, id })
		}
		this._responders.push({ res, ids });
	}

	public unregistResponser(res: IResponder) {
		for (let item of this._responders) {
			if (item.res == res) {
				let ids = item.ids;
				for (let value of ids) {
					this.emiter.rm(value.id, value.name);
				}
				this._responders.splice(this._responders.indexOf(item), 1);
				break;
			}
		}
	}

	private _commands = {};
	public registCommand(name:string|number,cmd){
		if(this._commands[name]) throw "cmd has been registed already!!!";
		 
		let id = this.emiter.on(name,(data)=>{
			console.log("cmd",name);
			(new cmd() as ICommand).excute(data,name);
		})

		this._commands[name] = id; 
	}

	public unregistCommand(name:string|number){
		let id = this._commands[name];
		if(id){
			this.emiter.rm(id,name);
		}
	}

	public notify(name, data?) {
		return this.emiter.emit(name, data);
	}

	dispose() {
		this.emiter.rmall();
		this._responders.length = 0;
	}
}