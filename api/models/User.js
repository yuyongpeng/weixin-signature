var bcrypt = require('bcrypt');

module.exports = {
    tableName: 'user',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        inserttime: {
            columnName: 'inserttime',
            type: 'datetime'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    },
/*    afterCreate: function (attrs, cb){
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
    */
};