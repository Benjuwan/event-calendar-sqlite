## Event-Calendar-SQLite
[reserve-sys-sqlite](https://github.com/Benjuwan/reserve-sys-sqlite)をベースにしたイベントカレンダーシステムUIです<br><br>

任意の会場（場所・部屋）数を用意するとともに、各会場ごとのイベント予約を視覚的に把握及び管理・編集できるようにしています<br>
ログイン機能を設けて管理者権限のユーザーだけがイベント内容を編集できるようにするのが一般的ですが、アカウント作成・管理が手間というユーザー（またはアカウント作成という部分にハードルを感じる弊社員のような方々）向けに、**「ログイン機能は無し」 + 「管理者専用ページを用意」することで抵抗なく手軽に扱える**ようにしました。<br>
具体的には`https://{サイトドメイン}/ctrl-schedules`というようにURL末尾に`ctrl-schedules`を付けることで、イベント情報を編集できる管理者専用ページに飛びます。<br><br>

---

- 管理者専用ページ（`/ctrl-schedules`）
<img width="611" height="850" alt="Image" src="https://github.com/user-attachments/assets/e8a28bea-72fb-4716-8488-deb0fa20d409" />

- ゲストページ（`/`）
<img width="605" height="848" alt="Image" src="https://github.com/user-attachments/assets/e7a10f73-ecac-4ea9-a6bc-209b1c94e62b" />

- 管理者専用ページ（`/ctrl-schedules`）でのみ登録イベントの編集が可能<br>
※ゲストページでは`内容修正`ボタンが表示されません
<img width="615" height="798" alt="Image" src="https://github.com/user-attachments/assets/9b0d5752-d18a-441f-86c0-5f71ba4c9917" />

---

`prisma`×`SQLite`でイベント予約をビルトインのデータベースに保存・管理する仕様にしています。<br>

- `src/types/rooms-atom.ts`：会場数と予約可能時間（※現状9～19時まで）の設定ファイル
- `src/constants/adminPagePathName.ts`：管理者専用ページのURLパス文字列
    - 現状`'ctrl-schedules'`で設定：<br>
    Next.js のファイルシステムベースのルーティングに則り、URLパスを変更したい場合は`src/app`内に希望するページURL名のフォルダ（ディレクトリ）を設けてください（※`layout.tsx`, `page.tsx`は変更せず、そのままでok）

### 仕様紹介
仕様や予約フロー、UIに関しては[reserve-sys-sqlite](https://github.com/Benjuwan/reserve-sys-sqlite)リポジトリとほぼ同様なので、気になる方は先のリンクを参照してください。

## 技術構成
- @eslint/eslintrc@3.3.1
- @prisma/client@6.17.1
- @types/node@24.8.1
- @types/react-dom@19.2.2
- @types/react@19.2.2
- @types/uuid@10.0.0
- eslint-config-next@15.5.6
- eslint@9.38.0
- jotai@2.15.0
- next@15.5.6
- prisma@6.17.1
- react-dom@19.2.0
- react@19.2.0
- typescript@5.9.3
- uuid@13.0.0

> [!NOTE]
> - `npm audit`で定期的に脆弱性のチェックを行う
> - `npm update`で定期的に（互換性を維持した）更新を行う
>   - `^`（キャレット：「指定されたバージョンからメジャーバージョンを変更しない範囲で最新のバージョンまでを許容」する機能を示す記号）が付いていても油断せず定期的にチェックする<br>例：`"next": "^14.2.12"`の場合、14.2.12以上 15.0.0未満のバージョンが許容される
> - `npm outdated`で表示される`Current`と`Wanted`の内容が等しいのが望ましい
> - 特定ライブラリを最新にするには`npm install ライブラリ名@latest`コマンドを実行する

### アップデートや更新後に読み込みエラーが発生する場合は以下を実施
`npm audit fix`または`npm update`後にエラーが発生してサイトが表示されない場合は`npx prisma generate`を実施する。
```bash
# Prismaクライアントを更新してスキーマを反映
npx prisma generate
```

## セットアップ（起動）に必要な作業
1. `.env.local`を用意
```bash
# NEXT_PUBLIC を前置した環境変数はクライアントサイドに露出する 
NEXT_PUBLIC_API_URL=http://localhost:3000/
```

2. `Prisma`クライアントを更新してスキーマを反映（`npx prisma generate`を実行）
```bash
npx prisma generate
```

## 備考
- `prisma studio`<br>
`GUI`でテーブル操作できる機能
```bash
# npx prisma studio で起動
npx prisma studio
```

- `prisma`のアップデートコマンド<br>
```bash
npm i --save-dev prisma@latest
npm i @prisma/client@latest 
```

## Prisma × SQLite の設定（初期セットアップ）方法
- [Prisma × SQLite | memo.md](./memo.md#prisma--sqlite)
- [Prismaの設定 | Next.js（v15）× Prisma × SQLite で会議室予約システムを作ってみた](https://qiita.com/benjuwan/items/c4341ca41758b076a385#prisma%E3%81%AE%E8%A8%AD%E5%AE%9A)

## データベースの仕様（テーブル）更新
登録内容を変更したい場合、以下フローを実行する必要がある。

- `prisma/schema.prisma`<br>
`model`オブジェクトの内容を編集（登録内容を追加・削除）
- `prisma/schema.prisma`の`model`オブジェクト編集後、以下のコマンドをターミナルに打つ
```bash
# マイグレーションファイルを作成し、データベースに変更を適用
npx prisma migrate dev --name what_you_changed # --name 以降は任意の命名

# Prismaクライアントを更新して新しいスキーマを反映
npx prisma generate
```

> [!NOTE]
> - `prisma/dev.db-journal`<br>
> `dev.db-journal`という設定中のデータベース（今回は`SQLite`）の内部処理用ファイルが自動的に生成・削除されるが無視して構わない。<br>
> `dev.db-journal`は`SQLite`が自動的に管理する`SQLite`のトランザクションログファイルで、データベース操作の一時的な記録を保持している。

### その他の更新・修正が必要なファイル
※以下の更新・修正は本リポジトリにおいてのみ適用されるもので一般的なものではありません。
- `src/app/components/schedule/todoItems/ts/todoItemType.ts`<br>
登録内容の型情報を編集
- `src/app/components/schedule/todoItems/TodoForm.tsx`
    - `todoItems`ステートの初期値である`initTodoItems`オブジェクトを編集（オブジェクトに当該登録内容であるプロパティ・キーを追加・削除）
    - （変更した）当該登録内容に関する入力フォームを（`src/app/components/schedule/todoItems/utils`配下に）用意または調整
- `src/app/api/reservations/`配下の`Route Handlers`の登録内容を編集<br>
（※[前述の`prisma`データベース更新フロー](#データベースの仕様テーブル更新)が済んでいないと進まないので注意）
    - `POST`, `PUT`に関する`data`オブジェクト内を編集（例：プロパティ・キーの追加など）<br>
    ※`data`オブジェクト編集後に型エラーが表示される場合は一旦`VSCode`を閉じてみる
