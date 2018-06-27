import 'reflect-metadata';
import { MetadataConstants as metaKeys } from '../constants';
import { withMetaData } from '../lib/metadata';
import { normalizePath } from '../lib/utils';

export function route(...paths: string[]) {
    // noinspection JSUnusedLocalSymbols
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        withMetaData(metaKeys.routePath, target, propertyKey, [], data => {
            for (let path of paths) {
                data.push(normalizePath(path));
            }
            return data;
        });
    }
}

export function classRoute(...paths: string[]) {
    return function (target: any) {
        withMetaData(metaKeys.routePath, target.prototype, metaKeys.routePath, [], data => {
            for (let path of paths) {
                data.push(normalizePath(path));
            }
            return data;
        });
    }
}
