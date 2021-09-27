# 04 - Array Cardio Day 1
## 任務介紹
運用 array-methods 整理資料。
## JavaScript
- 如何將 NodeList 轉為 Array ？
  1. `array.from(NodeList)`
  2. `[...NodeList]` => 展開運算子會解放資料，但解放完畢又被 [] 包起來了
- array.reduce
  - https://w3c.hexschool.com/blog/a2cb755f
  - `arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)`
  	- `accumulator` 
  	  - 如果有預設值，那麼第一輪 loop 時，accumulator = 預設值
  	  - 如果沒有預設值，那麼第一輪 loop 時就是 array 的第一個元素
  	  - 第二輪 loop 之後 accumulator = callback return 回來的值
  	- `currentValue`
  	  - 如果有預設值，那麼第一輪 loop currentValue = array 的第一個元素
  	  - 如果沒有預設值，那麼第一輪 loop 時就是 array 的第二個元素
  	  - 之後就會以此類推
    - `initialValue` 預設值
      - 可以是數字，也可以是空陣列[]、物件{}
  - 像第 8 題就是運用 `initialValue` 預設值得出每個元素出現幾次
  - 不用 array.reduce 的話也可以用 
  ```javascript
  const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
  let testObj = {};
  data.forEach(d => {
  	if (testObj[d]) {
  	  testObj[d]++;	
  	} else {
  	  testObj[d] = 1;
  	}
  });
  console.log(testObj); // {car: 5, truck: 3, bike: 2, walk: 2, van: 2}
  ```
