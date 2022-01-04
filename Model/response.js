
module.exports = (sequelize, dataType) => {
    const message = sequelize.define('message', {
        fullName: {
            type: dataType.STRING,
            allowNull: false
        },
        email: {
            type: dataType.STRING,
            allowNull: false
        },
        subject: {
            type: dataType.STRING,
            allowNull: false
        },
        comment: {
            type: dataType.STRING(1024),
            allowNull: false
        }
    })
    return message;
}