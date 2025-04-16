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
=======
React_Rails_todo
# プロジェクト
#React_Rails_todo

- React+Railsで作ったTodoアプリケーション

- 機能
    - タスクの登録
    - タスクの一覧機能
    - タスクの編集機能
    - タスクの完了、未完了の表示（チェックリスト）
    - 完了したタスクの削除機能
    - 特定のタスクの削除機能

- 処理の大きな流れ
    - フロントでAPIを叩き、結果を受け取ってFEで出力する
        - BEのcors.rbファイルでFEからのリクエスト(localhost3000)を受け取るコオとができるように定義

- DE
    - タスクの管理をできるようにしたい
        - タスクが持つ状態
            - タスク名
            - タスクが作成された日時
            - 更新された日時
            - id
            - 完了 or 未完了
    - Tasksテーブル　＝＞　Taskモデル　＝＞　Tasksコントローラー

- タスクの一覧機能 => fetch関数
    - FE
        - useEffectでコンポーネントのレンダリング時にfetch関数を発火させる
            - 変数resに対して非同期処理でHTTPメソッドがgetにしてAPIを叩く
                - setTasksに対してres.dataを代入する
                    - useStateの状態変数が変更されたので差分に応じてレンダリングされるようになる
        - CheckboxGroupコンポーネント
            - tasks.map関数をTaskコンポーネントに対して実行する

- タスクの登録機能
    - FE
        - 必要な要件
            - Taskという状態を定義する
                - Tasksというタスク全体の状態をuseStateで定義する
                    - Tasksという状態はnameプロパティと完了、未完了を示す2つのプロパティを持つTaskの上位概念
                        - Taskという概念の中には
                            - name
                            - done
            - タスクの作成をしたい場合にAPIをPOSTメソッドで叩けるようにする
                - 関数に切り出す
            - 入力フィールドを定義する
                - onChange関数を紐づけて入力に応じてイベントが発生するようにする
        - 必要な処理
            - useStateを定義する
                - name
                    - TaskとしてAPIを叩く時に登録したいタスク名
                - Tasks
                    - Taskとして保存した集合体
        - Input要素(入力フィールドを用意する)
            - onChange関数を紐づけてsetNameを発火させる
                - onChange関数
                    - value => name
                    - setName(e.target.value)
        - Button要素を作成する　＝＞　APIを叩く関数を紐づける
            - createTask
                - axiosを使って非同期処理でPOSTメソッドでAPIを叩く
                    - 第2引数にはnameプロパティにnameを、is_doneプロパティに初期値としてfalseを渡す
                - setNameに空文字を渡して関数をクリアにする
                - fetch関数を発火させせて変数tasksの状態を更新する
                    - コンポーネントのレンダリングを起こしてtasksに対して再度map関数を実行してタスクリストを更新する
- タスクの編集機能
    - Appコンポーネント
        - Tasksに対して繰り返し処理を実行しTaskコンポーネントを表示する
            - Taskコンポーネント
                - 編集ボタンが用意されている
                    - 編集ボタンをクリックする事でイベントハンドラーが発火して三項演算子によって表示が切り替わる
                        - isEditの真偽値を反転させる
                - タスク名が表示されていたコンポーネントが入力フィールドに変わるようにする
                    - 入力onChange関数を紐づけて入力フィールドの内容が変わるたびにイベントが発生するようにする
                - 保存ボタン
                    - axiosでAPIをPOSTメソッドで叩いて状態を更新する
                - キャンセルボタン
                    - setIsEditをfalseにして
                    - setEditName関数にpropsで受け取った状態を渡す  
                        - falseに変わり、タスク名は変わらない
- タスクの削除機能
    - destroyTask
        - delateメソッドでAPIを叩く
            - 処理が終わったらfetch関数を実行する
                - コンポーネントが再レンダリングされる
- チェックリスト（完了・未完了）
    - チェックリストの状態をクリックイベントによって真偽値を使い反転させる