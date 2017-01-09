

module.exports = {
    entry: './src/Formatter.ts',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: ['', '.ts']
    },
    module: {
        loaders: [
            {test: /.ts$/, loader: 'awesome-typescript-loader'}
        ]
    }
};