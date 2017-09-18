var moment = require('moment');

module.exports = {
    identity: 'Videofiles',
    tableName: 'videofiles',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true
        },
        nownessid: {
            type: 'integer'
        },
        nownessname: {
            type: 'string'
        },
        title: {
            type: 'string',
            required: true
        },
        subtitle: {
            type: 'string'
        },
        category: {
            type: 'integer',
            required: true
        },
        keyword: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        debut: {
            type: 'integer',
            required: true
        },
        filepath: {
            type: 'string'
        },
        filename: {
            type: 'string'
        },
        originalfilename: {
            type: 'string'
        },
        url: {
            type: 'string'
        },
        extvideourl: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        inserttime: {
            type: 'datetime',
        },
        updatetime: {
            type: 'datetime',
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