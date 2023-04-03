const Stream = require('../../stream');

class GetMaintenanceStatusResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.maintenanceStatus = stream.readUInt16LE();
		this.maintenanceTime = stream.readUInt32LE();
		this.isSuccess = stream.readBoolean();
	}

	toJSON() {
		return {
			maintenanceStatus: {
				__typeName: 'uint16',
				__typeValue: this.maintenanceStatus
			},
			maintenanceTime: {
				__typeName: 'uint32',
				__typeValue: this.maintenanceTime
			},
			isSuccess: {
				__typeName: 'boolean',
				__typeValue: this.isSuccess
			}
		};
	}
}

module.exports = {
	GetMaintenanceStatusResponse
};
