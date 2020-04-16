import { List, defineDefaults, warn, ConboEvent, noop, info, DataEvent } from 'conbo';

/**
 * NativeList is a persistent List class that is saved using cordova-plugin-nativestorage
 * @author 		Neil Rackett
 */
export default class NativeList extends List
{
	private __construct(options:any):void
	{
		var defaultName = 'ConboNativeList';
		
		options = defineDefaults(options, {name:defaultName});
		
		let { name } = options;

		if (name == defaultName)
		{
			warn('No name specified for '+this.toString()+', using "'+defaultName+'"');
		}

		document.addEventListener('deviceready', this._deviceReadyHandler.bind(this, name));
		
		(<any>List.prototype).__construct.call(this, options);
	}

	private _deviceReadyHandler(name:string, event:Event):void
	{
		if (!NativeStorage)
		{
			throw new Error('NativeStorage is not available, please run: cordova plugin add cordova-plugin-nativestorage');
		}

		// Sync with NativeStorage
		this.addEventListener(ConboEvent.CHANGE, (event:ConboEvent) =>
		{
			let value = JSON.stringify(this);
			
			NativeStorage.setItem(name, value, noop, (error:any) =>
			{
				warn(error.code);
				if (!!error.exception) warn(error.exception);
			});
		}, 
		{priority:1000});
		
		NativeStorage.getItem
		(
			name,
			
			// Already exists
			(value:string) =>
			{
				this.source = JSON.parse(value);
				this.dispatchEvent(new DataEvent('ready', this));
			},

			// Doesn't exist yet
			(error:any) =>
			{
				let value = localStorage.getItem(name);

				// Are we migrating this value from LocalStorage?
				if (value)
				{
					this.source = JSON.parse(value);
					info(`Migrated ${name} from localStorage to NativeStorage`);
				}

				this.flush();
			}
		);
	}
	
	/**
	 * Immediately writes all data using NativeStorage. If you don't use this method, 
	 * Conbo writes the data the next time it detects a change to a bindable property.
	 */
	public flush():this
	{
		this.dispatchEvent(new ConboEvent(ConboEvent.CHANGE));
		return this;
	}
	
	public toString():string
	{
		return 'conbo.NativeList';
	}
	
}
