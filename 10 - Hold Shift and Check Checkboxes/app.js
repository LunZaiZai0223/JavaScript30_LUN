const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
console.log(checkboxes);
const body = document.querySelector('body');

// function handlerShift (event) {
//   if (event.shiftKey === true) {
//   	console.log(event.currentTarget);
//     console.log(`shift被按了`);
//   }
// }
let lastChecked; 

function handler (event) {
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
  if (event.shiftKey && !this.checked) {
    checkboxes.forEach(checkbox => {
      console.log('checkox');
      if (checkbox === this || checkbox === lastChecked) {
      	inBetween = !inBetween;
        console.log('***');
      }
      if (inBetween) {
      	checkbox.checked = false;
      	lastChecked.checked = false;
      }
    });
  }
	lastChecked = this;
	console.log(lastChecked);
}

// body.addEventListener('keydown', handlerShift);


checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', handler);
});

// function handlerShift (event) {
//   console.log(event);
// }

// window.addEventListener('keydown', handlerShift);
