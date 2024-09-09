const mongoose = require('mongoose');

const url = `mongodb+srv://rajkamalsen7:4wYghZ3h3Wc2vek4@cluster-crm.0mwq6.mongodb.net/crm_db?retryWrites=true&w=majority&appName=Cluster-crm`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,connectionParams)
.then(res=>console.log("Mongodb Connected Successfully"))
.catch(err=>console.log(err))