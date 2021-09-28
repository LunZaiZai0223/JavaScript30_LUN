# 06 - Type Ahead
## 任務介紹
監聽表單，待達成事件觸發的條件後發送 request 給 API 再依照使用者輸入文字回傳相符的結果。
這個挑戰是我目前覺得最難的挑戰...原本想說維持看完影片再自我實作，但後來還是回到不會的地方回頭看影片的模式...
## JavaScript 
- `fetch` 
  - https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html
  - 語法結構類為 `promise` 的語法 => .then(callback) / .catch(callback)
  - 但是第一次會回傳 帶有Response(回應)物件的已實現Promise物件
    - 接下來可以運用不同的方法「解析」回傳的物件（有點類似第一次回來的物件還需再次解碼才是我要的資料）
    - `.then(response => response.json()).then(data => console.log(data));`
- `keyup` event
  - 使用者的鍵盤鈕起來時就觸發
- 大量新的觀念警報：正則表達式、fetch
  - 之後再好好整理

### 如何進行多個判斷？
- 通常單個輸入會有符合多個不同的結果，這時後就可以運用 正則表達式（Regular Expression, regex）幫忙判斷（就不用寫複雜又長的 if...）
- https://pjchender.dev/javascript/js-regex/
- 哪個方法可以幫忙判斷？
  - string.match(regexp) 
    - 判別字串是否有某特定文字
    - 只接受 regExp（正規表達式的物件）
  - 可以用建構子的方式新增
  - `const regexp = new RegExp('a', '要有哪些規則？');`
    - 規則的部分之後上網查就好了，此次挑戰是用 'gi' => 搜尋全部且不會區分大小寫
  - 課程代碼說明
    - `filter` 會先 loop 陣列，最後會回傳一陣列，陣列的資料是符合條件的
      - 條件： loop 的物件中的 city 及 state value match regex
```javaScript
function findMatch(wordToMatch, cities) {
        return cities.filter((place) => {
           /**
             * g: global search
             * i: case insensitive search
            **/
           let regex = new RegExp(wordToMatch, 'gi');
           return place.city.match(regex) || place.state.match(regex);
  });
}
```
### 有了資料要如何推到 DOM 裡？
- 現在已經有了相符的資料的 Array，但還是需要有東西當作基地，讓 Array 中符合基地的資料被提取出來丟到 DOM 裡
  - array.map 資料符合的 array
  - 在中間新增條件，限定回來的 array 只要有需要的東西（也就是整理好的 HTML 標籤）
  - 最後用 array.join('')，將 array 轉為 string （中間沒有東東隔開）
```javaScript
function createDOM (searchValue, searchResult) {
  const html = searchResult.map(place => {
    const regexp = new RegExp(searchValue, 'gi');
    const cityName = place.city.replace(regexp, `<span class="hl">${searchValue}</span>`);
    const stateName = place.state.replace(regexp, `<span class="hl">${searchValue}</span>`);
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `
  }).join('');
  suggestionsUl.innerHTML = html;
}
```
### 如何實作千位數新增, 
```javaScript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
```