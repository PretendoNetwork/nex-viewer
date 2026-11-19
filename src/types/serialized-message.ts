export interface BasicSerializedField {
	__displayTypeName?: string;
	__typeName?: string;
	__value?: any;
	__saveable?: boolean; // * Lets the UI offer to save the field to disk
	__bytes?: number[]; // * The fields raw bytes, for when `__value` holds a display form of them instead
	__filename?: string; // * The name to suggest when saving
}

export interface ExpandableSerializedField extends BasicSerializedField {
	__parent?: ExpandableSerializedField;
	__version?: number;
	__fields?: Record<string, SerializedField | ExpandableSerializedField>;
}

export type SerializedField = BasicSerializedField | ExpandableSerializedField;

export type SerializedMessage = {
	id: number;
	elapsed_time: number;
	transport: string;
	source: string;
	destination: string;
	destination_path?: string;
	service?: string;
	method?: string;
	direction?: string;
	status?: string | number; // * HTTP transactions use the numeric status code
	overview_sections: {
		title: string;
		columns: number;
		fields: {
			name: string;
			value: string;
		}[];
	}[];
	hex_views: {
		title: string;
		bytes: number[];
	}[];
	serialized_tabs: {
		title: string;
		subtitle?: string;
		fields: {
			name: string;
			data: SerializedField;
			language?: string; // * Triggers the UI to render the data in MonacoViewer rather than the normal collapsible system
			bytes?: number[];
			image?: string; // * Triggers the UI to render `bytes` as an image of this content type, rather than as text
		}[];
	}[];
	stack_trace?: string;
};
