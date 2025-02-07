const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //optimization
// const TerserPlugin = require("terser-webpack-plugin"); //optimization
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const Dotenv = require("dotenv-webpack");

module.exports = {
  // mode: 'production', // LE INDICO EL MODO EXPLICITAMENTE
  entry: "./src/index.js", // el punto de entrada de mi aplicación
  output: {
    // Esta es la salida de mi bundle
    path: path.resolve(__dirname, "dist"),
    // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
    // para no tener conflictos entre Linux, Windows, etc
    filename: "[name].[contenthash].js",
    // EL NOMBRE DEL ARCHIVO FINAL,
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  devtool: 'source-map', //genera mapa del codigo en Json, identifica cada parte del proyecto
  //   watch: true,
  resolve: {
    extensions: [".js"], // LOS ARCHIVOS QUE WEBPACK VA A LEER
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    // REGLAS PARA TRABAJAR CON WEBPACK
    rules: [
      {
        test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
        exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.png/, // REGLA PARA ACEPTAR IMAGENES .PNG
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
        use: {
          loader: "url-loader", // NOMBRE DEL LOADER
          options: {
            limit: false, // O LE PASAMOS UN NUMERO
            // Habilita o deshabilita la transformación de archivos en base64.
            mimetype: "aplication/font-woff",
            // Especifica el tipo MIME con el que se alineará el archivo.
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.
            name: "[name].[contenthash].[ext]",
            // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
            // ubuntu-regularhola.woff
            outputPath: "./assets/fonts/",
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
            publicPath: "../assets/fonts/",
            // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
            esModule: false,
          },
        },
      },
    ],
  },
  // SECCION DE PLUGINS
  plugins: [
    new HtmlWebpackPlugin({
      // CONFIGURACIÓN DEL PLUGIN
      inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
      template: "./public/index.html", // LA RUTA AL TEMPLATE HTML
      filename: "./index.html", // NOMBRE FINAL DEL ARCHIVO
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }), // INSTANCIAMOS EL PLUGIN
    new CopyPlugin({
      // CONFIGURACIÓN DEL COPY PLUGIN
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"), // CARPETA A MOVER AL DIST
          to: "assets/images", // RUTA FINAL DEL DIST
        },
      ],
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, "dist"), //De donde debe leer
    compress: true, //[pra usar gzip]
    historyApiFallback: true,
    port: 3006,
  },
};
