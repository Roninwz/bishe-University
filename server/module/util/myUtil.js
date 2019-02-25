/**
 *
 * @author Roninwz
 * @date 2018/12/24 15:35
 * @since 1.0.0
 */
const roninwzUtil={};
roninwzUtil.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};


module.exports = roninwzUtil;