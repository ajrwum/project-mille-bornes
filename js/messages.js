// all messages
const messages = {
  ERR_INVALID_INPUTS: "Please enter valid data for each player.",
  ERR_NO_SUCH_ACTION: "No such action is allowed.",
};

// display error message
function displayMsg(msg) {
  const msgElement = document.querySelector('#display-msg span');
  msgElement.textContent = msg;
}

function resetMsg() {
  const msgElement = document.querySelector('#display-msg span');
  msgElement.textContent = '';
}


export { messages, displayMsg, resetMsg }