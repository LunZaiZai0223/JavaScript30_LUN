# 08 - Fun with HTML5 Canvas
## 任務介紹
運用 HTML Canvas 元素搭配 JavaScript 實作畫畫功能。<br>
哇，原本還以為這個很簡單，沒想到是一個大坑...瀏覽器要畫畫的原理其實還蠻死的...看完一次後還是決定不會的地方回頭看影片。
## JavaScript
### 要怎麼畫畫呢？
- 畫的東西會在 `getContext` 之上，所以一開始選取到 canvas 的元素時要設定要畫 2d 還是 3d
```javaScript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
// 顏色
ctx.strokeStyle = '#BADA55';
// 交會時會呈現圓角
ctx.lineJoin = 'round';
// 每筆畫結束時會以圓角結束（就不會方方的）
ctx.lineCap = 'round';
// 筆畫的粗細
ctx.lineWidth = 25;
```
### 思考畫畫時滑鼠的邏輯
- 我看影片老師很快地就丟出不同的事件，大略講解一下就開始設定了，結果我自己後來再思考的時候腦袋當機，一直卡著= =
- 滑鼠左鍵按著的狀態 `mousedown event` + 移動 `mousemove event` 就可以畫畫。反之，如果滑鼠左鍵沒有按著只滑滑鼠是畫不出來的
- 設個開關，確保正確的狀態才會畫畫
```javaScript
// 開關
let isDrawing = false; 

function draw () {
  // 如果開關是關的話就不會畫畫
  if (!isDrawing) return;
  //
  // 畫畫的任務
  //
}

// 滑鼠移動就會觸發事件 => 畫畫
canvas.addEventListener('mousemove', draw);
// 滑鼠左鍵為按下狀態會觸發事件 => 把畫畫的開關打開
canvas.addEventListener('mousedown', () => isDrawing = true);
// 滑鼠左鍵放開就會觸發事件 => 把畫畫的開關關掉，此時滑鼠不管怎麼動都不會再畫畫了(即使有觸發滑鼠移動的事件)
canvas.addEventListener('mouseup', () => isDrawing = false);
```
### 但是瀏覽器要知道座標才知道要怎麼畫R！
- 要記得，畫畫任務是在 `mousemove` 事件成立才會開始，而且只要滑鼠有移動，`mousemove` 就會成立！
```javaScript
function draw (event) {
  // 不是畫畫的狀態就不會觸發畫畫的任務
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hug}, 100%, 50%)`;
  // 畫畫的任務
  ctx.beginPath(); // 開始
  ctx.moveTo(lastX, lastY); // 從哪裡開始
  // event.offsetX, event.offsetY => 當滑鼠目前的座標
  ctx.lineTo(event.offsetX, event.offsetY); // 滑一條線到 
  ctx.stroke(); // 結束

  // mousemove 只要滑鼠有移動就會一直觸發
  // Q: 為什麼少了這兩行畫出來的東西會很奇怪？
  // A: 因為畫線條的原理是從 A 點到 B 點，而且只要滑鼠移動就會觸發事件，
  //    所以就會一直從起始點新增線條到 B 點（也就是滑鼠游標目前的範圍）
  //    加了初始化起點，這時起點就會隨著滑鼠游標更改，所以實際是 A 點 B
  //    點一直更新，且一直從 A 點冒出線到 B 點
  lastX = event.offsetX;
  lastY = event.offsetY;
  // 改顏色用
  hug ++;
  console.log(ctx.lineWidth);
  console.log(direction);
  if (hug >= 360) { hug = 0;}
  // 轉換筆刷的粗細
  if (ctx.lineWidth >= 25 || ctx.lineWidth <= 5) {
    // 一行轉換 true / false 
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth ++;
  } else {
    ctx.lineWidth --;
    }
  }

```
