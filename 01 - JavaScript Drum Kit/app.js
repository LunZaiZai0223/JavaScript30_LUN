function removePlayingClass (event) {
  if (event.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

function playSound (event) {
  const keyboard = document.querySelector(`div[data-key="${event.keyCode}"`);
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if (!audio) return;
  
  // toggle 有觸發到才會 新增 / 刪除 class 
  // 與目前的需求：顯示後馬上恢復成原本的不同，所以不能使用
  // 要思考的點是：如何 add 後馬上 remove
  keyboard.classList.add('playing');
  // keyboard.addEventListener('transitionend', function (event) {
  // 	// Q: 為什麼會出現 6 次 ww?
  // 	// A: 只要有因為 CSS transition 而更改的屬性都會觸發 'transitionend'
  //   // console.log('結束 transitionend');
  //   if (event.propertyName !== 'transform') return;
  //   keyboard.classList.remove('playing');
  // });
  // audioObj.currentTime 設為 0 = 讓瀏覽器知道只要條件符合就一直播
  audio.currentTime = 0;
  // audio 標籤可以用 .play() 來播放 src
  audio.play();
}

// 一個函式負責一個任務，所以把移除 class 的任務移出來
const keyboards = document.querySelectorAll('.key');
  keyboards.forEach(key =>{
    key.addEventListener('transitionend', removePlayingClass);
});

window.addEventListener('keydown', playSound);
