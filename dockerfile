##对应的Dockerfile文件
#以nodejs为基础镜像
FROM node:12

# Create app directory
WORKDIR /data/app

COPY package*.json ./
RUN npm install

# 拷贝应用程序
COPY server.js .

#EXPOSE命令只是声明了容器应该打开的端口并没有实际上将它打开!
EXPOSE 8000

# 运行命令
CMD [ "node", "app.js" ]