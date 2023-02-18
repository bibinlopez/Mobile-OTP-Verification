const express = require('express');
const router = express.Router()

const SID = process.env.SID
const AUTH_ID = process.env.AUTH_ID
const SERVICE_ID = process.env.SERVICE_ID

const client = require('twilio')(SID, AUTH_ID);


router.post('/sendotp', (req, res) => {
console.log(req.body.number);
    client.verify
        .services(SERVICE_ID).verifications.create({
            body: 'hi',
            to: `+91${req.body.number}`,
            channel: "sms"

        })
        .then((resp) => {
            console.log('message sended');
            res.status(200).json({
                success: true,
                message: 'Verification Code has sended to given Mobile Number',
                status: resp
            });
        })
        .catch((err) => console.log(err))
})



router.post('/verifyotp', (req, res) => {
    client.verify
        .services(service_id)
        .verificationChecks.create({
            to: `+91${req.body.number}`,
            code: `${req.body.otp}`
        })
        .then((resp) => {
            console.log("otp res", resp);
            if (resp.valid) {
                res.status(200).json({ success: true , message: "Verification Completed Successfully", resp });
            }
            else{
                res.status(201).json({ success: false , message: "Invalid Verification Code, Please try again!!!!" , resp });
            }
        })
        .catch((err)=>{
            res.status(500).json({
                success: false,
                message: `Something went Wrong!!!... Please Try again Later!!!`,
                error: err
            })
        })
    
})


module.exports = router;
