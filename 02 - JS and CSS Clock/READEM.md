# 02 - JS and CSS Clock
## JavaScript
- 重複執行任務（函式）
  - setInterval(*handler*, time)
- 0 秒、分、時的時候讓角度為 90，會瞬間逆時針一圈有點醜
  - 因為有 transition-duration 0.05s => 動畫會執行 0.05s，但是肉眼還是會看到因為角度變小逆轉回去的過程
  - 如果角度 = 90 度，就把 transition-duration = 0s，一次到位不執行動畫

## CSS
- 更改元素的角度
  - transform: rotate(_deg);
  - 正值為順時針旋轉，負值則逆時針
- 更改元素角度的起始位置
  - transform-origin: 50%(default) => 元素的中心點
  - transform-origin: 100% => 元素的最右邊
- 讓指針有來回動的感覺
  - transition: transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1);