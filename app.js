console.clear();

const elApp = document.querySelector("#app");
const elPlay = document.querySelector('.play');

const machine = {
  initial: "small",
  states: {
    small: { on: { click: "medium" } },
    medium: { on: { play: "large", click: 'small' } },
    large: { on: { click: "small", play: "small" } }, 
  }
};

function activate(state) {
  elApp.dataset.state = state;
}

function transition(state, event) {
  return machine.states[state].on[event] || state;
}

elApp.addEventListener("click", (e) => {
  const state = elApp.dataset.state;
  activate(transition(state, e.type))
});

elPlay.addEventListener("click", (e) => {
  e.stopPropagation();
  const state = elApp.dataset.state;
  activate(transition(state, 'play'))
});

setTimeout(()=>{
  activate(transition(elApp.dataset.state, 'click'))
}, 500);
