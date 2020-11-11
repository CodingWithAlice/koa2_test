exports.getPostData = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let result = '';

            ctx.req.on('data', (item) => {
                result += item;
            })
            ctx.req.on('end', () => {
                resolve(result);
            })
        } catch(err) {
            reject(err);
        }
    });
}
