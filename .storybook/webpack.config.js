module.exports = ({ config }) => {
    config.module.rules.push(
        ...[
            {
                test: /\.(png\?.*|jpg\?.*|jpg|png)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: require.resolve('awesome-typescript-loader'),
                    },
                ],
            }
        ]
    );

    config.resolve.extensions.push('.ts', '.tsx', '.md');
    return config;
};
