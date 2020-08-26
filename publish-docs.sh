#!/usr/bin/env bash
printf "=================== 文档发布脚本 =====================\n"
git pull
printf "\e[32m开始打包...\e[0m\n"
tar -cvf ng-tangram-docs.tar.gz docs/* package.json
printf "\e[32m打包完成，输入服务器连接密钥上传文件至服务器...\e[0m\n"
scp -r ./ng-tangram-docs.tar.gz root@39.97.116.60:/var/www
printf "\e[32m① 输入服务器（39.97.116.60）连接密钥，以重启服务...\e[0m\n"
ssh root@39.97.116.60 "cd /var/www; sh ng-tangram-docs.sh; echo '文档已发布，退出本次连接。'; exit"
rm ng-tangram-docs.tar.gz
printf "本地文件压缩包已删除。\n"
printf "结束"
