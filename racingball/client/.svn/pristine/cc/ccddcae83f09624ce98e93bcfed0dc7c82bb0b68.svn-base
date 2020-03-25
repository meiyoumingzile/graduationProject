/** 
 * @terran
**/
class HttpServer{
    private encodeValue(key:string, value:any) {
        if (value instanceof Array) {
            return this.encodeArray(key, value);
        }
        
		return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }

    private encodeArray(key:string, value:string[]) {
        if (!key)
            return "";
        if (value.length == 0) {
            return encodeURIComponent(key) + "=";
        }
        return value.map(v=> encodeURIComponent(key) + "=" + encodeURIComponent(v)).join("&");
    }
    private toString(data):string {
        if (!data) {
            return "";
        }
        let stringArray:string[] = [];
        for (let key in data) {
            stringArray.push(this.encodeValue(key, data[key]));
        }
        return stringArray.join("&");
    }

	private request(param:{
			url:string,
			method:string,
			data?:any,
			rawData?:any,
			responseType?:"text"|"arraybuffer",
			timeout?:number,
			headers?:string[],
			onload:(data:any)=>void,
			onerror?:(e)=>void,
			onabort?:()=>void,
			onprogress?:(v:number)=>void,
			ontimeout?:()=>void
		}){
		let http = new XMLHttpRequest();
		http.responseType = param.responseType !== "arraybuffer" ? "text" : "arraybuffer";
		http.timeout = param.timeout || 0;
	
		http.onerror = function(e):void {
			console.log(`[http][${param.method}][error] [${http.status}:${http.statusText}] ${param.url}`);
			param.onerror && param.onerror(e);
		}
		http.onabort = function(e):void {
			console.log(`[http][${param.method}][abort] ${param.url}`);
			param.onabort && param.onabort();
		}
		http.onprogress = function(e):void {
			if (e && e.lengthComputable && param.onprogress) param.onprogress(e.loaded / e.total);
		}
		http.onload = function(e):void {
			var status:Number = http.status !== undefined ? http.status : 200;
			if (status === 200 || status === 204 || status === 0) {
				let result = http.response || http.responseText as any;
				console.log(`[http][${param.method}][loaded] ${param.url}:${result}`);
				param.onload(result);
			} else {
				console.log(`[http][${param.method}][error] [${http.status}:${http.statusText}] ${param.url}`);
				param.onerror && param.onerror(e);
			}
		}

		let payload = this.toString(param.data);
		let reUrl = param.url;
		if(param.method == "GET" && payload){
			reUrl = param.url + "?" + payload;
			payload = null;
		}
		http.open(param.method, reUrl, true);

		if(param.method == "POST"){
			// http.setRequestHeader('Content-Encoding', "gzip");
			if(param.rawData){
				http.setRequestHeader("Content-Type", "application/json");
				payload = JSON.stringify(param.rawData);
			}else{
				http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
		}
		if (param.headers) {
			for (var i:int = 0; i < param.headers.length; i++) {
				http.setRequestHeader(param.headers[i++], param.headers[i]);
			}
		}
		http.send(payload);
		console.log(`[http][${param.method}] ${param.url}:${JSON.stringify(param.data)}`)

		return http;
	}

    post(url:string,data:any){
		return new Promise<any>((resolve,reject)=>{
			this.request({
				url,data,
				method:"POST",
				onload:resolve,
				onerror:reject,
				ontimeout:reject
			})
		})
    }

    get(url:string,data:any){
		return new Promise<any>((resolve,reject)=>{
			this.request({
				url,data,
				method:"GET",
				onload:resolve,
				onerror:reject,
				ontimeout:reject
			})
		})
    }
}