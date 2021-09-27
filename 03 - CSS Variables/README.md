# 03 - CSS Variables
## 任務介紹
透過表單（range, color）更改圖片的 padding, background-color
  - 當 input 的 value 觸發變更換 img 的 CSS 屬性
    - change event => 更換 CSS 的值
## CSS
- 透過 CSS variable，讓之後 CSS 的設定可以更加方便。 => 道理類似 SCSS 
- 宣告 CSS variable 
  - 一般都宣告在 `:root` 裡（對 HTML 來說 `:root` = `<html>`），變數命名的規則 --變數名稱
  - 使用變數只能用 `var`
- 記得要在對應的元素中使用 CSS variable
```
// 宣告
:root {
	--main: #fdfdfd;
	--second: #111;
}

// 使用
div {
	background-color: var(--main);
}
```
## JavaScript
- ele.dataset 會回傳一個物件，裡面有該元素的自創屬性值（data-xxx）
- change event 配 input => 當 input 的 value 更動時會觸發
- `this` 會指向呼叫該方法的物件
