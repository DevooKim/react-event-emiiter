class EventEmitter {
    constructor() {
        this.list = new Map();
    }

    on(type, action) {
        this.list.has(type) || this.list.set(type, []);
        if (this.list.get(type)) this.list.get(type).push(action);
        return this;
    }
    emit(type, ...args) {
        console.log(this.list);
        this.list.get(type) && this.list.get(type).forEach((cb) => cb(...args));
    }
    removeEvent(type) {
        this.list.delete(type);
    }
    removeAllEvent() {
        this.list = new Map();
    }
}

export default EventEmitter;
