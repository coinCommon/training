const whatsAppClient = require("@green-api/whatsapp-api-client");


class OtherController {


    async ReceiveNotifications(req, res, next) {

        try {
            let {idInstance, apiTokenInstance} = req.query

            let restAPI = whatsAppClient.restAPI(({
                idInstance,
                apiTokenInstance
            }))

                let response
                while (response = await restAPI.webhookService.receiveNotification()) {
                    let webhookBody = response.body;
                    if (webhookBody.typeWebhook === 'incomingMessageReceived') {
                        await restAPI.webhookService.deleteNotification(response.receiptId);
                        return webhookBody.messageData.textMessageData.textMessage
                    } else if (webhookBody.typeWebhook === 'stateInstanceChanged') {
                        return `stateInstance=${webhookBody.stateInstance}`
                    } else if (webhookBody.typeWebhook === 'outgoingMessageStatus') {
                        return `status=${webhookBody.status}`
                    } else if (webhookBody.typeWebhook === 'deviceInfo') {
                        return `status=${webhookBody.deviceData}`
                    }
                }


            return res.json(response)

        } catch (e) {
            return res.json(e)
        }

    }


}

module.exports = new OtherController()