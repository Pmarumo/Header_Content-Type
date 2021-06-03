const jwt = require('jsonwebtoken');

function criarToken(usuario) {
    const payload = {
        id: usuario.id
    };

 //   return jwt.sign(payload, '0ArJo8AqwoyuaXLvSEuDPmaTG/PJ8ipTKOtLjazGfq829K9/+Ge0JebvjoSUku2y2VlBBeh9e653B9fvr74KF0jwx0nkOL5jZpmlpNW3F2Xazmo7+8R7CHLnvqealOj53/fT2PESyCfUZBomloWjgeWliSntZZGOBX8asPKNad2GZx96f/Tb8j6tnbEHFa0tPyia58/N+gLu9yzGuJsZ8oq0NXHSltMsjlr55WtbfWvakqA/3UTaghFLs5AfMA7nc1IwMRBOmndwdmruw2f7tp7SYXiy+3ku6pxeS5lKla3eGn+IY+hztvouuzWW8Ua4dt1qpKncuWlIOQFNgnfsmg==');
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '2m'});

}

module.exports = criarToken