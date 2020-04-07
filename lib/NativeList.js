"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var conbo_1 = require("conbo");
/**
 * NativeList is a persistent List class that is saved using cordova-plugin-nativestorage
 * @author 		Neil Rackett
 */
var NativeList = /** @class */ (function (_super) {
    __extends(NativeList, _super);
    function NativeList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeList.prototype.__construct = function (options) {
        var defaultName = 'ConboNativeList';
        options = conbo_1.defineDefaults(options, { name: defaultName });
        var name = options.name;
        if (name == defaultName) {
            conbo_1.warn('No name specified for ' + this.toString() + ', using "' + defaultName + '"');
        }
        document.addEventListener('deviceready', this._deviceReadyHandler.bind(this, name), false);
        conbo_1.List.prototype.__construct.call(this, options);
    };
    NativeList.prototype._deviceReadyHandler = function (name, event) {
        var _this = this;
        if (!NativeStorage) {
            throw new Error('NativeStorage is not available, please run: cordova plugin add cordova-plugin-nativestorage');
        }
        // Sync with NativeStorage
        this.addEventListener(conbo_1.ConboEvent.CHANGE, function (event) {
            var value = JSON.stringify(_this.source);
            NativeStorage.setItem(name, value, conbo_1.noop, function (error) {
                conbo_1.warn(error.code);
                if (!!error.exception)
                    conbo_1.warn(error.exception);
            });
        }, { priority: 1000 });
        NativeStorage.getItem(name, 
        // Already exists
        function (value) {
            _this.source = JSON.parse(value);
            _this.dispatchEvent(new conbo_1.DataEvent('ready'));
        }, 
        // Doesn't exist yet
        function (error) {
            var value = localStorage.getItem(name);
            // Are we migrating this value from LocalStorage?
            if (value) {
                _this.source = JSON.parse(value);
                conbo_1.info("Migrated " + name + " from localStorage to NativeStorage");
            }
            _this.flush();
        });
    };
    /**
     * Immediately writes all data using NativeStorage. If you don't use this method,
     * Conbo writes the data the next time it detects a change to a bindable property.
     */
    NativeList.prototype.flush = function () {
        this.dispatchEvent(new conbo_1.ConboEvent(conbo_1.ConboEvent.CHANGE));
        return this;
    };
    NativeList.prototype.toString = function () {
        return 'conbo.NativeList';
    };
    return NativeList;
}(conbo_1.List));
exports.default = NativeList;
