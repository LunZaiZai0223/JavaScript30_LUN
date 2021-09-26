# 01 - JavaScript Drum Kit
## JavaScript
按下對應的案件可以觸發事件播出對應的音檔，並透過 CSS 做出按鍵效果。
- 用鍵盤事件 keydown 完成播放音樂的任務
  - 每個鍵都有自己對應的 [keyCode](https://keycode.info/)，在 HTML 可以自創屬性（data-*自創的屬性名稱*）將按鈕與音檔連接起來
- 如何選取特定的標籤？比方來說特定的 div + data-key=65
  - const key = document.querySelector(`div[data-key="${event.keyCode}"`);
- 如何用 JavaScript 做出新增 class 後再馬上刪除該 class？（就是該 class 顯示完就丟掉）
  - CSS transition 屬性變形後會觸發 JavaScript 的 transitionend
  - 在 transitionend 事件內新增 remove class 的任務即可
## CSS 
- 外層容器
  - display: flex, justify-content: center, align-items : center 讓裡面元素置中，但不換行。所以內容器寬度太小就會擠在中間，但如果超過範圍就會維持平分最大化
