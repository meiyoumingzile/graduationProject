// class Explode extends eui.Component implements eui.UIComponent {
//     constructor() {
//         super();
//     }
//     /**爆炸中心点 */
//     startPos: number[] = [300, 600];
//     /**弹射方向，true为左,false为右 */
//     ejectDirection: boolean = true;
//     /**终点坐标 */
//     endPos: number[] = [500, 100];
//     /**爆炸半径 */
//     radius: number = 20;
//     /**数量 */
//     quantity: number = 10;
//     /**icon */
//     icon: string = "home-star.png"
//     stars: eui.Image[] = [];
//     init() {
//         for (let i = 0; i < this.quantity; i++) {
//             let img = new eui.Image();
//             img.source = this.icon;
//             [img.x, img.y] = this.startPos;
//             this.stars.push(img);
//         }
//     }
//     start() {
//     }
// } 
//# sourceMappingURL=Explode.js.map