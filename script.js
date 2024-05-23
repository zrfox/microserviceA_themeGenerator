const zmq = require('zeromq');
const sock = new zmq.Reply();

//bind sock to port
sock.bind('tcp://127.0.0.1:3000')
  .then(() => {
    console.log('server bound to port 3000');

    (async () => {
      for await (const [msg] of sock) {
        console.log('Received message:', msg.toString());

        // Generate json object based on msg
        const jsonObj = generateJSON(msg.toString());

        // send json object to client
        await sock.send(JSON.stringify(jsonObj));
      }
    })();
  })
  .catch(err => {
    console.error('Error binding socket:', err);
  });

// Generates JSON object based on the received message
function generateJSON(message) {
  const theme = message;
  var randomNum = Math.floor(Math.random() * 3);
  if (typeof lastNum !== 'undefined' && lastNum == randomNum) {
    randomNum = (randomNum + 1) % 3;
  }
  lastNum = randomNum;

  let jsonObj;
  if (theme.toLowerCase() === "nature") {
    const natureThemes = [
      "https://images.unsplash.com/photo-1715151696404-aa4e214ade78?q=80&w=2729&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1553123428-247ffbd12d90?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1714997219788-660af304f464?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    jsonObj = {
      "themeURL": natureThemes[randomNum],
      "colors": {
        "lighter": "#F0F8FFE6",
        "darker": "#2F4F4FE6",
        "accent": "#A9A9A9F2",
        "font": "#000000"
      }
    };
  } else if (theme.toLowerCase() === "animal") {
    const animalThemes = [
      "https://images.unsplash.com/photo-1604994956900-de0daaf2d17f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715182038598-382e9f5dcb5b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715182020058-3909f649d1a2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    jsonObj = {
      "themeURL": animalThemes[randomNum],
      "colors": {
        "lighter": "#F0F8FFE6",
        "darker": "#2F4F4F",
        "accent": "#A9A9A9F2",
        "font": "#000000"
      }
    };
  } else {
    const defaultThemes = [
      { base: "#A52A2A", lighter: "#006400", darker: "#696969", accent: "#F8F8FF" },
      { base: "#A52A2A", lighter: "#F0F8FF", darker: "#D2691E", accent: "#FFF8DC" },
      { base: "#556B2F", lighter: "#006400", darker: "#2F4F4F", accent: "#8FBC8F" }
    ];
    jsonObj = {
      "colors": defaultThemes[randomNum]
    };
  }
  return jsonObj;
}
