import {MetadataConstants as metaKeys} from "../constants";
import {HttpVerbError} from "../errors/http-verb-error";
import {withMetaData} from "../lib/metadata";

interface IVerbDescriptor {
    verb: string
}

// noinspection JSUnusedLocalSymbols
function httpVerbDescriptor(this: IVerbDescriptor, target: any, propertyKey: string, _: PropertyDescriptor) {
    withMetaData(metaKeys.httpVerbs, target, propertyKey, [], data => {
        data.push(this.verb);
        return data;
    });
}

export function httpVerb(verb: string) {
    const enabledVerbs: string[] = [
        'get',
        'post',
        'put',
        'delete',
        'options',
        'header',
    ];
    if (!verb || !verb.length) throw new HttpVerbError('Http verb should not be empty');
    verb = verb.toLowerCase();
    if (enabledVerbs.indexOf(verb) < 0) throw new HttpVerbError('Invalid http verb');
    return httpVerbDescriptor.bind({verb: verb});
}

export function httpGet(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return httpVerb('get')(target, propertyKey, descriptor);
}

export function httpPost(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return httpVerb('post')(target, propertyKey, descriptor);
}

export function httpPut(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return httpVerb('put')(target, propertyKey, descriptor);
}

export function httpDelete(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return httpVerb('delete')(target, propertyKey, descriptor);
}

export function httpOptions(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return httpVerb('options')(target, propertyKey, descriptor);
}

export function httpHeader(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return httpVerb('header')(target, propertyKey, descriptor);
}
