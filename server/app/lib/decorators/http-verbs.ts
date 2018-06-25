export function httpVerb(verb: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(verb, arguments);
    }
}

export function httpGet() {
    return httpVerb('get');
}

export function httpPost() {
    return httpVerb('post');
}

export function httpPut() {
    return httpVerb('put');
}

export function httpDelete() {
    return httpVerb('delete');
}

export function httpOptions() {
    return httpVerb('options');
}

export function httpHeader() {
    return httpVerb('header');
}
