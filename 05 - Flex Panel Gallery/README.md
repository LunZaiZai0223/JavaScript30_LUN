# 05 - Flex Panel Gallery
## 任務介紹
運用 JavaScript 配合 CSS 達到滑鼠點擊 toggle class ，造成畫面更動。
## CSS
看完影片就想說練習一下 flex 的運用，所以決定自己切一個和課程相同的版面（結果花了比預期多一點的時間，但摸完就更清楚 flex 了）
- flex (flex-grow || flex-shrinl || flex-basis)
  - flex-grow 會依照數字放大外層容器剩下的空間
- display: flex 也可以影響自己
  - 像範例裡面的 p 元素就是自己變成 flex，再設定 `justify-content: center;` + `align-items: center;` 達到字置中對齊
- CSS 選取器
  - `className > *` => 選取該 className 所有的子元素
  - `className > *:first-child / last-child` => 選取該 className 第一個 / 最後一個子元素
  - `className > *:nth-child(x)` => 選取該 className 第 x 個元素
- 增加 className 在外層容器然後在 CSS 再寫外層容器同時有兩個 className 子元素要怎樣比較方便
  - 要不然都下在子元素很麻煩XD！
## JavaScript 
- 分段觸發事件
  - 一開始以為都是用 `click` 觸發事件，但是這樣子會導致同時 toggle className，畫面效果同時出現
  - 影片是 `click + transitioned` 事件，click 事件的任務是 toggle className(新增 transition 效果)，有 CSS transition 就可以用 transitioned 事件監聽，再 toggle className(讓字移動)，這樣子畫面就會看起來有順序