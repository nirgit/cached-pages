const store = (function() {
    let data = {}

    const listeners = []
    const notifyListeners = () => listeners.forEach(listener => listener());

    const set = dataItem => {
        if (!dataItem) return
        let dataToUpdate = data
        switch(dataItem.type) {
            case 'set_posts': {
                dataToUpdate = Object.assign({}, dataToUpdate, {posts: dataItem.posts})
                break;
            }
            case 'set_messages': {
                dataToUpdate = Object.assign({}, dataToUpdate, {messages: dataItem.messages})
                break;
            }
            default: break;
        }
        if (dataToUpdate !== data) {
            data = dataToUpdate
            notifyListeners(data)
        }
    }

    return {
        addListener(listener) {
            listeners.push(listener)
        },
        notifyAll: notifyListeners,
        get() {
            return data
        },
        set
    }
})()

export default store;
