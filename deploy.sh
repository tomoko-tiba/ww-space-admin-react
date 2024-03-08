# 构建
npm run build
# 压缩 dist 目录到压缩文件
cd ./dist
zip -r wwSpaceAdmin.zip ./*
# 传输 zip 文件到服务器
scp wwSpaceAdmin.zip ali-hk:
# 删除本地压缩包
rm wwSpaceAdmin.zip
# 服务器中解压文件到网站的 /dribbble-admin 目录
ssh ali-hk "unzip -o -d /var/www/html/wwspace-admin ~/wwSpaceAdmin.zip"
# 服务器中删除压缩包
ssh ali-hk "rm ~/wwSpaceAdmin.zip"