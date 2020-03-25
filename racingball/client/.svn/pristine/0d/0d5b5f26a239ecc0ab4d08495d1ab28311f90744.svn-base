class SkinItemData {
	/** 皮肤ID */
	public id: number
	/** 皮肤价格 type:0-默认 1-广告 2-经验 3-邀请好友 */
	public price: {
		type: number,
		num: number
	} = {
		type: 0,
		num: 0
	}

	public fbx: string;
	public tex: string;
	/** 皮肤缩略图 */
	public thumb: string;
	/** 皮肤排序 */
	public order: number;
	public weight: number;

}
const skinDB2SkinData = function (): Array<SkinItemData> {
	const arr: Array<SkinItemData> = [];

	let idx: number = 1;
	
	while(true) {
		const skinDBItem = DB_skin.get(idx);
		if (!skinDBItem) {
			break;
		}
		const skinItem = new SkinItemData();
		skinItem.id = skinDBItem.id;
		skinItem.order = skinDBItem.order;
		skinItem.fbx = skinDBItem.fbx;
		skinItem.tex = skinDBItem.tex;
		skinItem.thumb = skinDBItem.thumb;
		skinItem.weight = skinDBItem.weight;

		if (skinDBItem.price) {
			let arr = skinDBItem.price.split(':')
			skinItem.price.type = parseInt(arr[0]);
			skinItem.price.num = parseInt(arr[1]);
		}
		
		idx++;
		arr.push(skinItem);
	}

	/*for(var i=0;i<4;i++){
		var skinItem = new SkinItemData();
		skinItem.id =idx++;
		skinItem.order = 100+i;
		skinItem.fbx = "dsddsd";
		skinItem.tex = "dsddsd";
		skinItem.thumb =  arr[i].thumb;
		skinItem.weight = arr[i].weight;
		skinItem.price.type = 2;
		skinItem.price.num = 1007;
		arr.push(skinItem);
	}*/


	return arr;
}