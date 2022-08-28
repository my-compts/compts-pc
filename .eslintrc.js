module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always'], // 是否要分号结尾
    quotes: [1, 'single'], // 引号
    'space-before-function-paren': 0, // 函数（）前面是否必须要空格
    'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    'no-tabs': 0, // 忽略缩进的报错
    'no-multi-spaces': 2, // 不能有多余的空格
    'no-mixed-spaces-and-tabs': 0, // 忽略空格和tab的差异
    'no-irregular-whitespace': 2,
    indent: [2, 2, { SwitchCase: 1 }], // 必须缩进2格
    'vue/html-indent': [
      'error',
      2,
      {
        // vue/html缩进规则，2表示一个indent缩进两个space
        attribute: 1, // 属性缩进1indent
        baseIndent: 1, // 基本缩进1indent
        closeBracket: 0, // 闭合标签不缩进
        alignAttributesVertically: true, // 所有属性对齐
        ignores: []
      }
    ],
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
    'handle-callback-err': 0,
    'no-unused-vars': 0,
    'import/no-webpack-loader-syntax': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
