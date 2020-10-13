const express = require("express");
const socketIO = require("socket.io");
const port = 3100;

const{
    AttributeIds,
    OPCUAClient,
    TimestampsToReturn,
} = require("node-opcua");

const endPointUrl = "opc.tcp://localhost:48010";
const NodeIdToMonitor = "ns=2;s=Demo.Dynamic.Scalar.Float";

(async() => {
    try{
        const client = OPCUAClient.create({
            endpoint_must_exist:false
        });
        client.on("backoff",(retry,delay) =>{
            console.log("Retrying to connect to ",endPointUrl, " attempt ",retry);
        });
        console.log("connecting to", endPointUrl);
        await client.connect(endPointUrl);
        console.log("connected to ",endPointUrl);

        const session = await client.createSession();
        console.log("session created");

        const subscription = await session.createSubscription2({
            requestedPublishingInterval: 2000,
            requestedMaxKeepAliveCount: 20,
            requestedLifetimeCount: 6000,
            maxNotificationsPerPublish: 1000,
            publishingEnabled: true,
            priority:10
        });

        subscription.on("keepalive",function(){
            console.log("keep alive");           
        }).on("terminated",function(){
            console.log("TERMINATED ---------------------------- >>")
        });
        
    const app = express();
    //app.set('view engine', 'html');
    app.use(express.static(__dirname + '/'));
    //app.set("views",__dirname + '/');
    app.get('/', function(req, res) {
        res.render('index.html')
    })

    //app.use(express.static(__dirname + '/'));

    //app.listen(3100);

    const io = socketIO.listen(app.listen(port));

    io.sockets.on('connection',function(socket){});

    console.log("Listening on port " + port);
    console.log("Visiting http://localhost:" + port);

    const itemToMonitor = {
        nodeId: NodeIdToMonitor,
        attributeId: AttributeIds.Value
    };

    const parameters = {
        samplingInterval : 100,
        discardOldest: true,
        queueSize: 100
    };

    const monitoredItem = await subscription.monitor(itemToMonitor,parameters,TimestampsToReturn.Both);

    monitoredItem.on("changed",(dataValue) => {
        console.log(dataValue.value.toString());
        io.sockets.emit('message',{
            value: dataValue.value.value,
            timestamp: dataValue.serverTimestamp,
            nodeId: NodeIdToMonitor,
            browserName:"Temperature"
        });
    });

    let ruuning = true;
    process.on("SIGINT",async() =>{
        if( ! ruuning){
            return;
        }
        console.log("shutting down client");
        ruuning = false;

        await subscription.terminate();
        await client.disconnect();
        console.log("Disconnected");
        process.exit(0);
    });

    }catch(err){
        console.log("Error: "+err.message);
        console.log(err);
        process.exit(-1);
    }
}
)();