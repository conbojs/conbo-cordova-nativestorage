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
 * NativeHash is a persistent Hash class that is saved using cordova-plugin-nativestorage
 * @author 		Neil Rackett
 */
var NativeHash = /** @class */ (function (_super) {
    __extends(NativeHash, _super);
    function NativeHash() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeHash.prototype.__construct = function (options) {
        var defaultName = 'ConboNativeHash';
        options = conbo_1.defineDefaults(options, { name: defaultName });
        var name = options.name;
        if (name == defaultName) {
            conbo_1.warn('No name specified for ' + this.toString() + ', using "' + defaultName + '"');
        }
        document.addEventListener('deviceready', this._deviceReadyHandler.bind(this, name), false);
        conbo_1.Hash.prototype.__construct.call(this, options);
    };
    NativeHash.prototype._deviceReadyHandler = function (name, event) {
        var _this = this;
        if (!NativeStorage) {
            throw new Error('NativeStorage is not available, please run: cordova plugin add cordova-plugin-nativestorage');
        }
        // Sync with NativeStorage
        this.addEventListener(conbo_1.ConboEvent.CHANGE, function (event) {
            var value = JSON.stringify(_this);
            NativeStorage.setItem(name, value, conbo_1.noop, function (error) {
                conbo_1.warn(error.code);
                if (!!error.exception)
                    conbo_1.warn(error.exception);
            });
        }, { priority: 1000 });
        NativeStorage.getItem(name, 
        // Already exists
        function (value) {
            conbo_1.assign(_this, JSON.parse(value));
            _this.dispatchEvent(new conbo_1.DataEvent('ready', _this));
        }, 
        // Doesn't exist yet
        function (error) {
            var value = localStorage.getItem(name);
            // Are we migrating this value from LocalStorage?
            if (value) {
                conbo_1.assign(_this, JSON.parse(value));
                conbo_1.info("Migrated " + name + " from localStorage to NativeStorage");
            }
            _this.flush();
        });
    };
    /**
     * Immediately writes all data using NativeStorage. If you don't use this method,
     * Conbo writes the data the next time it detects a change to a bindable property.
     */
    NativeHash.prototype.flush = function () {
        this.dispatchEvent(new conbo_1.ConboEvent(conbo_1.ConboEvent.CHANGE));
        return this;
    };
    NativeHash.prototype.toString = function () {
        return 'conbo.NativeHash';
    };
    return NativeHash;
}(conbo_1.Hash));
exports.default = NativeHash;
