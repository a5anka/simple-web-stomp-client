window.onload = function() {

 // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');
  var publish_input = document.getElementById('publish_input');
  var subscribe_input = document.getElementById('subscribe_input');
  var connectBtn = document.getElementById('connect');

  var url = "ws://localhost:5775/";
  var destination = "chat_queue";
  var publish_location = "chat_queue"
  var client = null;
    
  var subscribe_callback = function(message){
       messagesList.innerHTML += '<li class="sent"><span>Received:</span>' + message.body +
                              '</li>';
  }

  var connect_callback = function(event) {
    socketStatus.innerHTML = 'Connected to server';

    socketStatus.className = 'open'; 
       
    var subscription = client.subscribe(destination, subscribe_callback);
  };

  var error_callback = function(error) {
    console.log('WebSocket Error: ' + error);
  };

  form.onsubmit = function(e) {
    e.preventDefault();

    // Retrieve the message from the textarea.
    var message = messageField.value;

    // Send the message through the WebSocket.
      client.send(publish_location, {}, message);

    // Clear out the message field.
    messageField.value = '';

    return false;
  };

  connectBtn.onclick = function(e) {
    e.preventDefault();

      destination = subscribe_input.value;
      publish_location = publish_input.value;

      client = Stomp.client(url);

      client.connect("admin", "admin", connect_callback, error_callback);

    return false;
  };

  closeBtn.onclick = function(e) {
    e.preventDefault();

    // Close the WebSocket.
    client.disconnect(function () {
        socketStatus.innerHTML = 'Disconnected from Server.';
        socketStatus.className = 'closed';
    });

    return false;
  };


};
