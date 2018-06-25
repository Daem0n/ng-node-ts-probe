export function route(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(path, arguments);
    }
}
export function classRoute(path: string) {
    return function (target: any) {
        console.log(path, arguments);
    }
}
