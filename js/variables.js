let storyTellingBool;

console.log(localStorage.getItem('TellingTheBool'));
if (localStorage.getItem('TellingTheBool') === 'true') {
  storyTellingBool = false;
  console.log(storyTellingBool);
} else {
  storyTellingBool = true;
  console.log(storyTellingBool);
  localStorage.setItem('TellingTheBool', true);
}

let theStartInterval; // to set a counter on corner
let onSky;
