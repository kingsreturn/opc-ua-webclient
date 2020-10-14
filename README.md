# opc-ua-webclient
* opc-ua webclient created by Nodejs using express Module

# Introduction
* This is a simple opc-ua NodeJs web Client. It use node-opcua to connect to the server opc.tcp://localhost:48010. The server can be downloaded from UaAutomation for free. After it connected with the opc-ua server, it will create a session to regularly read the NodeId: ns=2;s=Demo.Dynamic.Scalar.Float. The value will be showed on a local webserver created by express.

# Install
* clone the repository into your local computer and start the opc-ua server on your local computer
* start a terminal in the local repository and run next commands:
```Bash
  - npm install 
  - node index.js
```
* The local webserver will be created and the value will be showed on the webpage.You can use ctrl+C to terminate the local webserver and opcua webclient.
