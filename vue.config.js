module.exports = {
    configureWebpack: {
        //修改配置文件，起别名。。。
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }

        }
    }
}