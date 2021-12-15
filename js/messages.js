// all messages
const messages = {
  ERR_INVALID_INPUTS: "Please enter the name and age (as number) for each player.",
};

// display error message
function displayMsg(msg) {
  const msgElement = document.querySelector('#display-msg span');
  msgElement.textContent = msg;
}


export { messages, displayMsg }