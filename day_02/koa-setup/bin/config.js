export function createConfig(answer){
    const haveMiddleware = (name) => {
        return answer.middleware.indexOf(`${name}`) !== -1
    }

    return {
        packageName:answer.packageName,
        middleware:{
            router:haveMiddleware('koaRouter'),
            static:haveMiddleware('koaStatic')
        }
    }
}
