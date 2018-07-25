## 区块链配置相关
main/blockchain/config.js 修改basepath为本地区块链节点存放地址, 当前路径下需要有genesis.json  
添加node1的enode
手动启动geth node1 
geth --datadir %datadir% --mine --minerthreads=1 --port 30301

## 数据库配置相关
main/util/db_manager.js 修改对应主机,密码,端口等
设置足够的审核人员


## 待优化
main/bll/DemandBLL.js中postNewRequirement数据库操作可优化
数据库错误异常链处理
启动geth进程后如何确保能够通过rpc连接

## 待修复!!!
查看交易链重构


## 待添加!!!
区块链挖矿和添加节点问题
节点资金初始化
挖矿资源问题!!!


## 测试进度
- 用户注册：　后台多用户注册通过

- 发布需求：　ServerItem ID2不连续问题待统一　后台多用户插入通过

- 申请需求: 



## 数据库相关
1. 设置Demand和Application中ServiceID为唯一主键   (已改)


## 初始化
1.设置blockchain路径,将genesis.json防止于路径中
2.新建node1, 初始化账户
geth --datadir node1 init genesis.json
geth --datadir node1 --mine --minerthreads=1 --port 30301 --rpc --rpcapi eth,web3,personal,net console --rpcport 8501

3. 初始化数据库, 在util/manager设置数据库访问配置
4.添加超级管理员, 更新账户地址

5.更新bootnodes地址