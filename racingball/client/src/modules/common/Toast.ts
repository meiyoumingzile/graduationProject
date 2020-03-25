class Toast extends eui.Component implements eui.UIComponent {
	public constructor(private toastText) {
		super();
	}

	private text_node: eui.Label;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.text_node.text = this.toastText;
		this.width = Context.stage.stageWidth;
	}
}