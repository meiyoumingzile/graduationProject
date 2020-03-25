class GroundSegment {

	mesh: tr.Mesh
	public constructor() {
		this.mesh = new tr.Mesh(GroundSegment.geo, GroundSegment.mtl);
	}

	static height = 104.39
	static geo: tr.Geometry;
	static mtl: tr.Material;
	static init() {
		this.geo = undefined;
		this.mtl = undefined;
		let fbx = Res3DManager.getFBX(`${GameConstant.Map}.fbx`).children.find(c => c.name == "dixing") as tr.Mesh;
		if (fbx) {
			this.geo = fbx.geometry as tr.Geometry;
			this.mtl = fbx.material as tr.Material;
		}
	}

	static init4Theme(insts: GroundSegment[]) {
		this.mtl && Game.inst.materialCtr.remove(this.mtl);
		this.init();
		this.mtl && Game.inst.materialCtr.add(this.mtl);
		insts.forEach(m => {
			m.mesh.geometry = GroundSegment.geo
			m.mesh.material = GroundSegment.mtl
		})
	}
}