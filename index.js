const express = require('express')
//const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const app=express()
const port = process.env.PORT || 3000;
const axios = require('axios');
const ABOUT = "about";

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(request,response) =>{
	res.status(200).send('Server is working')
})

app.post('/chatbot',(request,response) =>{
 const agent = new WebhookClient({ request, response });
 let state = request.body.queryResult.parameters.state;

 agent.add(`Here are the details for ${state}`);
  return axios.get('https://sheetdb.io/api/v1/39oraf7bripew')
.then((result) => {
            result.data.map(wordObj => {
	if(state == wordObj.State){
                agent.add(wordObj.Cases);
}
        });
    });

  let intentMap = new Map();
  intentMap.set(ABOUT, welcome);
  agent.handleRequest(intentMap);
});

app.listen(port, () => { console.log(`Server running on port number: ${port}`) })
