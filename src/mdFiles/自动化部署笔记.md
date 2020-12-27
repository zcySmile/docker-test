# 自动化部署

## 1.Docker

### 1.1 安装

```shell
# yum包更新到最新
yum update
# 安装需要的软件包
yum install -y yun-utils device-mapper-persistent-data lvm2
# 设置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 安装docker 出现输入界面都按y
yum install -y docker-ce
# 查看docker版本，验证是否成功
docker -v
```

### 1.2配置镜像加速器

登录阿里云账号，搜索镜像服务查看镜像加速器，可以看到镜像加速的方法，每个人的镜像加速地址是不一样的

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors":["https://8cqoh10g.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

```

### 1.3安装私有仓库

```shell
# 搜索镜像
docker search registry
# 拉去镜像
docker pull registry
# 创建容器
docker run -d -p 5000:5000 registry
# 配置私有仓库地址
vim /etc/docker/daemon.json
{
"insecure-registries":["ip:5000"]
}
sudo systemctl daemon-reload
sudo systemctl restart docker
# 启动本地仓库容器
docker start 容器id
```

### 1.4访问私有仓库

```shell
http://ip:5000/v2/catalog
```

如果访问不到，关闭防火墙

```shell
systemctl stop firewalld
```

## 2.docker下gitlab安装配置使用

### 2.1安装

```shell
# 查找Gitlab镜像
docker search gitlab
# gitlab 镜像拉取
docker pull gitlab/gitlab-ce
# 查看本地镜像
docker images
#本机建立的3个目录
#为了 gitlab 容器通过挂载本机目录启动后可以映射到本机，然后后续就可以直接在本机查看和编辑，不用再进容器查看
#配置文件
mkdir -p /home/gitlab/etc
#数据文件
mkdir -p /home/gitlab/data
# 日志文件
mkdir -p /home/gitlab/logs
# 启动容器
docker run --name='gitlab' -d \
-p 4443:443 -p 8888:80 \
-v /home/gitlab/etc:/etc/gitlab \
-v /home/gitlab/data:/var/opt/gitlab \
-v /home/gitlab/logs:/var/log/giblab \
gitlab/gitlab-ce:latest
# 查看启动日志
docker logs -f gitlab
```

### 2.2配置

> 按上面的方式，gitlab容器运行没有问题，但是在gitlab上创建项目的时候，生成项目的URL访问地址是按容器hostname来生成的，也就是容器ID。作为gitlab容器服务器，我们需要一个固定的URL访问地址，于是需要配置gitlab.rb(宿主机路径：/home/gitlab/config/gitlab.rb)

```shell
# 配置域名或ip
#配置gitlab.rb
cd /home/gitlab/etc
vim gitlab.rb
#配置http协议所使用的访问地址，不加端口默认80
external_url 'http://宿主机ip'
# 配置gitlab.yml
cd /home/gitlab/data/gitlab-rails/etc
vim gitlab.yml

gitlab:
      #Web server settings(none:host is the FQDN, do not include http://)
      host: 宿主机ip
      port：8888
      https: false
```

### 2.3 初始化密码

gitlab 默认管理用户是root

登录http://ip:8888 登录修改root密码

### 2.4登录

### 2.5 创建项目

## 3.安装Git

```shell
yum install y -git
git version
```

## 4.使用Git管理项目

### 4.1 使用idea从gitlab检出空项目

项目地址： http://ip:8888/root/projectName.git

### 4.2 复制项目并运行

idea中运行项目并访问： http://127.0.0.1:10000/use/1

进行开发

### 4.3提交代码到gitLab

## 5.制作镜像

### 5.1 拉取项目代码

在linux上服务器上拉取项目代码

```shell
cd /home
git clone 项目地址
cd 项目名
npm install
mkdir Dockerfile
# 编写文件
vim Dockerfile
# 在Dockerfile 文件所在目录下制作镜像
docker build -t 镜像名
```

### 5.2创建启动容器

```shell
docker run -d -p 映射端口:端口 --name 容器名称  镜像名称
```

### 5.3 访问页面

## 6.Jenkins安装和使用

```shell
yun install java-1.8.0-openjdk.x86_64
```

​        

### 6.1安装

```shell
docker pull jenkins/jenkins:lts
#创建容器
docker run --name jenkins\
-u root \
--rm \
-d \
-p 8080:8080 -p 50000:50000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /user/bin/docker:/user/bin/docker \
-v /user/lib/jvm/java-版本编号：/user/java/jdk_版本编号、
-v /use/local/maven3:/user/local/maven \
-v /user/local/maven_repository:/user/local/maven_repository \
-v /home/jenkins-data/:/var/jenkins_home \
jenkins/jenkins:lst

# 查看容器的启动日志
docker logs -f 容器id
```





