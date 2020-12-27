#帮助命令

docker version  

docker info  # 查看docker系统的详细信息，包括镜像和容器

#镜像命令

docker images  #查看镜像

​        #参数

​          -a  #所有镜像

​         -q   # 只显示镜像ID

docker search  [镜像名称]  #搜索镜像

docker pull [镜像名称][:tag]  #下载镜像

![img](C:\Users\zcysmile\AppData\Local\YNote\data\zcysmile1210@163.com\497d82b0acb64f13bd806fc50a359148\7fab0e5cea2b40418fc9d074c277e251.jpg)

docker rmi -f  容器ID  #删除指ID的镜像

#容器命令

docker run [参数] 镜像名称  #启动一个容器

-d #run a container in background and print     在后台启动一个容器并且打印

# 部署一个tomcat

docker pull tomcat

docker run -d -p 3355:8080 --name tomcat01 tomcat

docker exec -it 容器ID /bin/bash

cp webapps.dist/*  webapps   #拷贝当前目录下的webapps.dist 文件夹中的所有文件到当前目录下的webapp文件夹中

curl localhost:3355

![image-20201220084412024](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220084412024.png)

![image-20201220100200759](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220100200759.png)

#安装数据库mysql

![image-20201220101849541](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220101849541.png)

![image-20201220102354484](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220102354484.png)

![image-20201220102806260](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220102806260.png)

![image-20201220105605913](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220105605913.png)

![image-20201220114639141](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220114639141.png)

![image-20201220115551446](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220115551446.png)![image-20201220121540576](C:\Users\zcysmile\AppData\Roaming\Typora\typora-user-images\image-20201220121540576.png)