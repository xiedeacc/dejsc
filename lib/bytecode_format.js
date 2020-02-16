'use strict';

function SerializedCodeData(bytecodeBuffer) {
    if (!Buffer.isBuffer(bytecodeBuffer)) {
        throw new Error(`bytecodeBuffer must be a buffer object.`);
    }

    this._buffer = bytecodeBuffer;
}

SerializedCodeData.prototype.buffer = function() {
    return this._buffer;
}

SerializedCodeData.prototype.getHeaderValue = function(offset) {
    return this._buffer.readUInt32LE(offset);
}

SerializedCodeData.prototype.setHeaderValue = function(offset, value) {
    this._buffer.writeUInt32LE(value, offset);
}

SerializedCodeData.prototype.dataHeader = function() {
    //TODO: find out payload
}

module.exports = SerializedCodeData