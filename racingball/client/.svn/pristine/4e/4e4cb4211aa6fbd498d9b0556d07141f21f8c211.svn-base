/**
 * Author:terran
 * Email:terran.tian@foxmail.com
 * 
 * Time:上午9:56 2016年12月17日
**/

class Emiter{
    static CONST = {break:{}};

    private maps = {};
    private uid = 0;

    private add(name,handler,thisObject,priority,isOnce)
    {
        thisObject = thisObject || null;
        priority = priority || 0;
        let queue_id =this.uid++; 
        let item =this.maps[name] || [];
        item.push([queue_id,handler,thisObject,priority,isOnce]);
        this.maps[name]= item;

        //倒序
        item.sort((a,b)=>a[3] < b[3]); 
        
        return  queue_id;
    }

    on(name,handler,thisObject?,priority?) { return  this.add(name,handler,thisObject,priority,false);}
    once(name,handler,thisObject?,priority?) { return  this.add(name,handler,thisObject,priority,true);}
    race(names:any[],handler,thisObject?,priority?){
        let events = [];
        let hasDone = false;
        let call = (name,...args)=>{
           hasDone = true;
        //    $dev&&egret.log(events);
           events.forEach(item=>this.rm(item[0],item[1]));
           handler.apply(thisObject,[name,...args]);
        }
        for(let name of names) {
            if(hasDone) break
            events.push([this.once(name, Utils.closure(call,name),thisObject,priority),name])
        }
    }

    private _duringEmit = false;
    rm(id,name?){
        let names = name?[name] : Object.keys(this.maps);
        for(let name of names){
            let handlers = this.maps[name];
            if(!handlers) continue;
            
            if(this._duringEmit){
                this.maps[name] = handlers = handlers.concat();
            }
            
            let index = 0;
            while(index < handlers.length){
                let [queue_id,handler,thisObject,priority,isOnce] = handlers[index];
                if(queue_id == id){
                    handlers.splice(index,1)
                    return true;
                }else{index++;}
            }
        }
        return false;
    }

    rmall(name?){
        if(name == undefined)
            this.maps = {};
        else
            delete this.maps[name];   
    }

    emit(name,data?){
        let handlers = this.maps[name];
        if(handlers && handlers.length>0){
            let index = 0;
            while(index < handlers.length){
                let [queue_id,handler,thisObject,priority,isOnce] = handlers[index];
                isOnce?handlers.splice(index,1):index++;
                this._duringEmit = true;
                let result = handler.call(thisObject,data)
                this._duringEmit = false;
                if(result == Emiter.CONST.break)
                    break
            }
            return true;
        }
        return false;
    }
}