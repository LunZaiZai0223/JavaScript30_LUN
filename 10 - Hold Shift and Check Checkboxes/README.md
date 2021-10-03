# 10 - Hold Shift and Check Checkboxes
## 任務介紹
講解如何運用 JavaScript + HTML checkbox 達到像 Gmail shift 選取多個 / 取消選取多個 checkbox。
  - shift 點擊複選 / 取消複選
這個任務我覺得蠻難的 ~~（到底哪個我覺得容易？）~~ 一開始自己想的時候還往先監聽是否按 shift (`keyup event`)再來監聽是否有點擊到 checkbox (`click event`)。結果後來看影片實作發現 `click event` 本身就有一個 `shiftKey` property (boolean) 用來確認點擊的時候是否有按 shift 鍵。
## JavaScript 
這個挑戰讓我知道動作拆解的重要性，因為這樣子才會符合電腦運行模式，才可以正確地輸入代碼請電腦執行任務。
### 要選擇哪個 event ？
如上述，其實只要有 `click event` 就可以用其中的 `shiftKey` property 監聽有沒有案 shift 鍵了，所以不用 `keyup / keydown` 或者其餘的 event。 

>拆解前要記得：JavaScript 是按照順序執行的！！

### 動作拆解（盡可能將動作完全拆解）
#### 單選
1. 直接點擊一個 checkbox 就可以了
    - 選了就會直接打勾 / 再次點擊就會取消選取
#### 複選
1. 要先點擊一個 checkbox 
    - 當作基準點（A 點）
2. 按下 shift 再按第二個 checkbox，此時兩點之間的 checkboxes 就會被選取
    - 有按下 shift 就會觸發任務 => 選取 A, B 兩點間的 checkboxes
    - 所以電腦要知道哪一個是 A 點、哪一個是 B 點以及哪些是 A, B 兩點中要一併被選取的 checkboxes
    - 要先點一次才可以知道哪個是 A 點
    - 新增一個開關（boolean），這個開關可以讓電腦知道哪些是 A, B 兩點之間的 checkboxes
```javaScript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// 要讓電腦知道第二點在哪裡 => 將變數放在函式外層，確保之後還用得到該變數
let lastChecked;
function handler (event) {
  // 開關，藉由此開關可以讓電腦知道哪些是 A, B 兩點之間的 checkboxes(也要被選取)
  let inBetween = false;
  // 如果有按下 shift 才執行任務
  // lastChecked !== undefined => 確定有 A 點才會執行任務
  // lastChecked !== this => 案一次後 lastChecked 就會 = 最近一次點選的 checkbox，
  // 如果 lastChecked === this(B點與最近一次點選的 checkbox 相同)，就代表沒有 B 點，不用複選。
  if (event.shiftKey && this.checked && lastChecked !== undefined && lastChecked !== this) {
  	//複選的任務

  	// 陣列 loop
  	// Q: 為什麼這樣子可行？
  	// A: lastChecked = 上一次點選的 checkbox，this = 此次點的 checkbox。checkbox 有點就會 選取 / 取消選取，兩個點已經選取，沒選的是中間。
  	// 到 A 點 (lastChecked)開關打開(選取)，到 B 點(this)關閉開關。所以電腦知道哪些是中間的點了。
    checkboxes.forEach(checkbox => {
     if (checkbox === this || checkbox === lastChecked) {
       // 開關不寫死，視情況再開 / 再關
       inBetween = !inBetween;
       if (inBetween) {
       	// checkbox 裡面有 checked property 可以控制是否選取
        checkbox.checked = true;
       }
     }
    });
  }
  // 重新賦值
  // 要先點一次才可以確認 A 點
  lastChecked = this;
}
```
#### 取消複選
1-1. 原路回去 => 複選完之後馬上 shift + 點擊原本的 A 點 or <br>
1-2. 先點一點選取的 checkbox 當作新 A 點 <br>
2. 再點另一點已選取的 checkbox 當作新 B 點，此時 A, B 兩點已選擇的 checkboxes 都會取消選取
    - 點擊一點，該點就會 選取 / 取消選取，所以要注意的就是如何讓電腦知道 A, B 點之間的 checkboxes 是哪些
```javaScript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;
function handler (event) {
  console.log('****lastChecked****', lastChecked);
  let inBetween = false;
  if (event.shiftKey && this.checked && lastChecked !== undefined && lastChecked !== this) {
       checkboxes.forEach(checkbox => {
       	console.log('checkbox');
       	if (checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
          console.log('start');
       	}
       	if (inBetween) {
       	  checkbox.checked = true;
       	}
       });
	}
  // 同理回推取消複選
  // 有案 shift 才執行任務
  // 有點擊就會把原本已選取的點取消
  if (event.shiftKey && !this.checked) {
    checkboxes.forEach(checkbox => {
      console.log('checkox');
      // foeEach 會從陣列的頭到尾 loop
      // 如果到 B 點(this)，就觸發開關，直到碰到 A 點(lastChecked)
      if (checkbox === this || checkbox === lastChecked) {
      	inBetween = !inBetween;
      }
      if (inBetween) {
      	checkbox.checked = false;
      	// 因為沒手動選到 A 點(所以要再寫任務幫他關掉，要不然原本的點還會留著)
      	lastChecked.checked = false;
      }
    });
  }
    // A 點的賦值位置很重要，JavaScript 是按照順序跑的！
	lastChecked = this;
	console.log('****lastChecked****', lastChecked);
}
```
## CSS
看影片影片發現點選 checkbox，文字(p)就會有 text-decoration: line-through 的效果，一開始還以為是用 JS 來新增 class，結果右鍵查看代碼才發現原來 CSS 本身就可以達到這個效果了 `input:checked`。
這次排版的樣子也很適合拿來做 todolist！也許下個專案可以拿來用！
## 感謝
此次挑戰其實就只有全選的功能而已，取消複選是我自己想要挑戰的。結果想著想著...竟然過了 1 小時都沒任何想法，好險看了其他大神們之前的[挑戰筆記](https://guahsu.io/2017/07/JavaScript30-10-Hold-Shift-and-Check-Checkboxes/)，才有一些突破，真的是很感謝在網路上分享筆記的大神們！
10/03 更新：在 stackoverflow 炸到大神用 jQuery 實作的[範例](https://stackoverflow.com/questions/659508/how-can-i-shift-select-multiple-checkboxes-like-gmail)
