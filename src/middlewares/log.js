// Este middleware vai registrar no terminal cada acesso à sua API
const logMiddleware = (req, res, next) => {
    const data = new Date().toLocaleString();
    const metodo = req.method;
    const url = req.url;

    console.log(`[${data}] ${metodo} solicitado em: ${url}`);

    // O next() é OBRIGATÓRIO. Ele diz ao Express para seguir para a próxima função.
    next();
};

module.exports = logMiddleware;