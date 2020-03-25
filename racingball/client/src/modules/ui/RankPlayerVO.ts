class RankPlayerVO {
	public constructor() {

	}
	name: string = "";
	photo: string = "";
	id: string = "";
	score: number = 0;

	//for exceed effect purpose!
	tip = "";

	originalRank: number = 1;

	extraData: { skin: number };

	get skin() {
		return this.extraData && this.extraData.skin || 1
	}

	toJSON() {
		return {
			id: this.id,
			score: this.score,
			extraData: this.extraData
		}
	}

	static createFromJSON(data) {
		let vo = new RankPlayerVO();
		vo.id = data.id;
		vo.score = data.score;
		if (typeof data.extraData == "string") {
			try {
				vo.extraData = JSON.parse(data.extraData);
			} catch (e) { }
		} else {
			vo.extraData = data.extraData;
		}

		return vo;
	}

	/**从排行榜中的一项创建数据 */
	static createFromLeaderBoardEntry(data: FBInstant.LeaderboardEntry) {
		let p = data.getPlayer();

		let vo = new RankPlayerVO();
		vo.name = p.getName();
		vo.photo = p.getPhoto();
		vo.id = p.getID();
		vo.score = data.getScore();
		vo.originalRank = data.getRank();

		let extraDataStr = data.getExtraData();
		vo.extraData = extraDataStr ? JSON.parse(extraDataStr) : {};

		return vo;
	}

	static createFromContextPlayer(data: FBInstant.ConnectedPlayer | FBInstant.ContextPlayer | FBInstant.FBPlayer): RankPlayerVO {
		let vo = new RankPlayerVO();
		vo.name = data.getName();
		vo.photo = data.getPhoto();
		vo.id = data.getID()

		return vo;
	}
}