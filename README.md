# microserviceA_themeGenerator
Microservice A. Theme generator.

1.Requesting data from the microservice requires creating a ZMQ requester socket. 
Example: 
context = zmq.Context()
socket = context.socket(zmq.REQ)
socket.connect("tcp://127.0.0.1:3000")

2. Create a string for one of the 3 choices: "color", "animal", "nature" to generate a random theme.
Example: 
theme_choice = "animal"

3. Send the string through the socket.
Example:
socket.send_sendstring(theme_choice)

4. Receive and decode the JSON object into a string.
Example:
response = socket.rec().decode();

5. Turn the JSON string into a python object.
Example:
json_response = json.loads(response)

6. Access the objects values
Example: 
json_response.get('themeURL') or json_response.get('colors')
