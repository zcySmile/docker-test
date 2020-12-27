# 1.需要掌握的技术栈

+ HTML5

  + 语义化标签类
  + 音视频处理
  + canvas/webGl
  + history API
  + requrestAnimationFram
  + 地理位置
  + web socket

+ CSS3

  + 常规
  + 动画
  + 盒子模型
  + 响应式布局

+ Javascript

  + ES6/7/8/9/10

  + DOM BOM

  + 设计模式

  + 堆栈内存

  + 闭包作用域AO/VO/GO/EC/ECSTACK

  + 面向对象OOP

  + THIS

  + EventLoop

  + 浏览器渲染原理

  + 回流重绘

  + AJax/Fetch/axios

  + http1.0/2.0

  + TCP

  + 跨域处理方案

  + 性能优化

  + Hybrid, APP,小程序

  + + Hybrid
    + uni-app
    + RN
    + Flutter
    + 小程序MPVUE
    + Weex
    + PWA

  + 工程化

  + + webpack
    + git
    + linux/nginx

  + 全栈方面

  + + node
    + express
    + koa2
    + mongodb
    + nuxt.js/next.js

  + 框架方面

    - Vue
    - React

    

    ## 2.经典面试题

    ### 2.1盒子水平垂直居中

    + 定位三种
    + display:flex
    + javascript
    + display:table-cell

    ```css
     // .box 在body中水平居中
    .body{
        height: 100%;
        overfolw: hidden;
    }
    .box{
        box-sizing: border-box;
        width: 100px;
        height: 50px;
        line-height: 48px;
        text-align: center;
        font-size: 16px;
        border: 1px solid red;
        background: back;
    }
    // 定位方式
    body{
        position: relative;
    }
    .box{ // 有宽和高，并且宽和高不变
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px;
        margin-left: -50px;
    }
    .box{// 有宽和高，但是不用考虑宽和高的具体值
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .box{ // 不用考虑宽和高，但是兼容性不好
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,50%);
    }
    // flex方式
    body：{
        display：flex;
        justify-content: center;
        align-items: center;
    }
    //display-table方式
    body{
        display: table-cell;
        vertical-align:middle;
        text-align: center;
        // 需要固定宽和高
        width： 500px；
        height: 500px;
    }
    .box{
        display: inline-block;
    }
    ```

    ### 2.2 CSS盒子模型

    标准盒模型、IE/怪异盒模型, Flex 弹性伸缩盒模型  多列布局

    ### 3.3几大经典布局方案

    > 圣杯布局
    >
    > 双飞翼布局
    >
    > =》左右固定，中间自适应

    ```css
    // 圣杯布局
    <body class="container clearfix">
      <div class="center"></div>
      <div class="left"></div>
      <div class="right"></div>
    </body>
     
    ```

    ```css
    // 双飞翼布局
    <body class="clearfix">
      <div class="container">
         <div class="center">     </div>
    </div>
      <div class="left"></div>
      <div class="right"></div>
    </body>
    ```

    > calc: 兼容到IE9

    ### 2.4移动端响应式布局开发的三大方案

    + media
    + rem
    + flex
    + vh/vm

    ### 2.5 作业

    1. 使用CSS，让一个div消失在视野中，可以有多少中方案
    2. z-index的工作原理，适用范围（文档流、定位）
    3. 谈谈你对HTML5的理解
    4. 如何使一个div里面的文字垂直居中，并且文字的大小根据屏幕自适应

    ​     

  ​         

  ​       

  ​       