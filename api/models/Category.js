var moment = require('moment');

module.exports = {
    tableName: 'category',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
        },
        name:{
            type: 'string',
            size: 50,
            required: true
        },
        lang: {
            type: 'string',
            defaultsTo: 'cn',
            required: true
        },
        inserttime: {
            columnName: 'inserttime',
            type: 'datetime'
        },
        updatetime: {
            type: 'datetime'
        },
        status: {
            type: 'integer',
            defaultsTo: '1',
            required: true
        }
    },
    afterCreate: function (attrs, cb){
        var date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        //var date = moment(new Date()).locale('es').tz('America/Mexico_City').format();
        attrs.inserttime = date;
        return cb();
    },
    afterUpdate: function (attrs, cb){
        //var date = moment(new Date()).locale('es').tz('America/Mexico_City').format();
        var date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        attrs.updatetime = date;
        return cb();
    }
}