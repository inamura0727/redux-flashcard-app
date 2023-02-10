# エラー関連
#### エラー文
cannot assign to read only property '0' of object '[object array]'
 
#### 問題の状況
シャッフルボタンを押した際に、initinalState:{ value: CardData }のCardDataをシャッフルしたかった。
```
 for (let i = CardData.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        <!-- 以下の記述の部分に 上記のエラーが入る-->
        [CardData[i], CardData[j]] = [CardData[j], CardData[i]];
      }
```

#### 原因
読み取り専用データを変えようとしたため、エラーが発生。（なぜ専用読み取りになってイルカはわかりませんでした...）

####　　とった対策
変更できなかったデータをコピーして他の変数に入れて、その値を修正。以下のように変更。

スプレッド構文によるオブジェクトのコピーをシャロー（shallow）コピーという。
```
let tmp =[...CardData]
for (let i = tmp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
      }
       state.value = tmp
```

#### 参考にしたサイト
- [シャローコピー・ディープコピーとは](https://zenn.dev/luvmini511/articles/722cb85067d4e9)
- [[React] TypeError: Cannot assign to read only property '0' of object '[object Array]'](https://velog.io/@rkio/React-TypeError-Cannot-assign-to-read-only-property-0-of-object-object-Array)
- [Deep copy (ディープコピー)](https://developer.mozilla.org/ja/docs/Glossary/Deep_copy)
- [Shallow copy (シャローコピー)](https://developer.mozilla.org/ja/docs/Glossary/Shallow_copy)





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# redux-flascard-app
