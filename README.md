# unar-cli

## 项目开发规范

git clone 下项目之后，进入项目文件夹，运行：
```bash
npm install -g unar-cli
unar init demo
cd demo
yarn
yarn build
```
## 开发
### 浏览器调试 

``` bash
node --inspect ./bin/unar init

打开chrome控制台 找到node六边形图标
```

### 本地全局调试 

``` bash
cd unar-cli
npm link

// 方式一 cli
unar init [projectName]

// 方式二 vscode 
// 项目根目录下建立 ./vscode/launch.json 运行之

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "unar",
            "program": "${workspaceFolder}/bin/unar",
            "args":["init"]//,projectName
        }
    ]
}
```
### 暂无明显测试说明
本地执行，创建项目检验
### changelog
```
// 重大改变更改major 例如：结构调整、重新设计
// 较大改变更改minor 例如：添加较大新功能
// 补丁改变更改patch 例如：如bugfix

major.minor.patch
```


