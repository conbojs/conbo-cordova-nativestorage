import { List } from 'conbo';
/**
 * NativeList is a persistent List class that is saved using cordova-plugin-nativestorage
 * @author 		Neil Rackett
 */
export default class NativeList extends List {
    private __construct;
    private _deviceReadyHandler;
    /**
     * Immediately writes all data using NativeStorage. If you don't use this method,
     * Conbo writes the data the next time it detects a change to a bindable property.
     */
    flush(): this;
    toString(): string;
}
