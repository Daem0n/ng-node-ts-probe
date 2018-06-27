import 'reflect-metadata';

type DataCallback<T> = (data: T) => void;

export function withMetaData<T>(metaKey: string, target: object, propertyKey: string, defaultData: T, callback: DataCallback<T>) {
    let metadata: any;
    if (propertyKey) {
        metadata = Reflect.getMetadata(metaKey, target, propertyKey);
    } else {
        metadata = Reflect.getMetadata(metaKey, target);
    }
    metadata = metadata || defaultData;
    metadata = callback(metadata);
    if (metadata) {
        Reflect.defineMetadata(metaKey, metadata, target, propertyKey);
    }
}
