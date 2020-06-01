const path = require("path");


module.exports = {

    devServer: {    
        contentBase: path.join(__dirname, './src'),   
        historyApiFallback: true
      },
    entry: path.resolve(__dirname,"./src/index.js"),
    module: {
      
        rules: [
            {
                test:/\.js$/,
                use: "babel-loader"
            },
            
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss)$/,
                use: [
                  {
                    // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                  },
                  {
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                  },
                  {
                    // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                      plugins: function () {
                        return [
                          require('autoprefixer')
                        ];
                      }
                    }
                  },
                  {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                  }
                ]
              },
              
        ],
        
    },
    output: {
        filename: 'bundle.js'
      }
    
}