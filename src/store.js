const uid = (() => {
    let counter = 0
    return () => {
        counter++
        return counter
    }
})()

function createStore(initialData = {}) {
    let data = initialData

    const listeners = []
    const notifyListeners = (prevData, nextData) => listeners.forEach(listener => listener(prevData, nextData));

    const set = dataItem => {
        if (!dataItem) return
        let dataToUpdate = data
        switch(dataItem.type) {
            case 'set_posts': {
                dataToUpdate = Object.assign({}, dataToUpdate, {posts: {id: uid(), items: dataItem.posts}})
                break;
            }
            case 'set_messages': {
                dataToUpdate = Object.assign({}, dataToUpdate, {messages: {id: uid(), items: dataItem.messages}})
                break;
            }
            case 'set_route': {
                dataToUpdate = Object.assign({}, dataToUpdate, {routeId: dataItem.routeId})
                break;
            }
            default: break;
        }
        if (dataToUpdate !== data) {
            const prevData = data
            data = dataToUpdate
            notifyListeners(prevData, data)
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
}

export default createStore;
