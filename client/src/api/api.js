export const SendMessage = async(message, selectChat) => {
    try {
        let idInstance = localStorage.getItem('idInstance')
        let apiTokenInstance = localStorage.getItem('apiTokenInstance')
        let chatId = `${selectChat.name}@c.us`
        let body = {
            chatId: chatId,
            message: message
        }
        let url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`
        const headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        let response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        let result = await response.json();
        return result
    } catch (e) {
        return {message: 'Error', code: e}
    }
}

export const GetChatHistory = async(number) => {
    try {
        let idInstance = localStorage.getItem('idInstance')
        let apiTokenInstance = localStorage.getItem('apiTokenInstance')

        let chatId = `${number}@c.us`
        let body = {
            chatId: chatId
        }
        let url = `https://api.green-api.com/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`
        const headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        let response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        let result = await response.json();
        return result.reverse()
    } catch (e) {
        return {message: 'Error', code: e}
    }
}

export const GetReceiveNotification = async(res) => {
    try {
        let idInstance = localStorage.getItem('idInstance')
        let apiTokenInstance = localStorage.getItem('apiTokenInstance')

        let urlReceiveNotification = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`

        const headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        let receiveNotification = await fetch(urlReceiveNotification, {
            method: 'GET',
            headers: headers
        });
        let resultReceiveNotification = await receiveNotification.json();
        return resultReceiveNotification
    } catch (e) {
        return {message: 'Error', code: e}
    }
}
export const DeleteNotification = async(receiptId) => {
    try {
        let idInstance = localStorage.getItem('idInstance')
        let apiTokenInstance = localStorage.getItem('apiTokenInstance')

        const headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        let urlDeleteNotification = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
        let deleteNotification = await fetch(urlDeleteNotification, {
            method: 'DELETE',
            headers: headers
        });
        let resultDeleteNotification = await deleteNotification.json()
        return resultDeleteNotification
    } catch (e) {
        return {message: 'Error', code: e}
    }
}