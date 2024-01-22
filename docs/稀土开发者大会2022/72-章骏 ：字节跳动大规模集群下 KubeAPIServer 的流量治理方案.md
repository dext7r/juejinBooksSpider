# 章骏 ：字节跳动大规模集群下 KubeAPIServer 的流量治理方案

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_01.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11704f9febdc471f8704f655519a471d~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_02.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdf1649be78a4c19bbfbcb99a21e2280~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_03.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23ac71187bc843bc80916015b385bd04~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_04.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93f13031071a4a129204367d7ab41713~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_05.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67c9357b18e9400bb3cbd994dafd1faa~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_06.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e71a64711854481f8c463c803b329977~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_07.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf719e6dedf43fba109ae61cf0a2722~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_08.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3948e33ebb14c7f819c72244ec70f13~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_09.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc1a3c9fa9984a3bad80e5daa68188b4~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_10.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66fc83ca39ef4d72a0eb4b161a5ba2a3~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_11.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4065f07366a4f34ad78247c4983820c~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_12.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18c6bcfcd44840ba9cd7c1470b81385e~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_13.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef1be8bbdd164ed59b30670de642c67c~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_14.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aedee4f43d094d2ab2b813578351ac80~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_15.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/657bd098d70e43eb81083aa7a6b58031~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_16.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a66326c58a18425bb147d771f07b2688~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_17.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88129a0cb5664ece8501019097c344d3~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_18.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4a47a9b4e604c9c9ed4c46caa8f14a1~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_19.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3df76363f1748ad91b4d9005afe48a8~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_20.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fa278d9ef354c16b5f37e27aa417ea7~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_21.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80e833264bed44399b8f93175987b1bd~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_22.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4180f40c9f05464bbb9f204d9eb5343f~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_23.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72f65dff29584b13bf9cbd419223c46b~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_24.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71e1d8cfdab94c10887dbaa96c7deeb6~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_25.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eabd0deb87894b3a902cba72711ab39a~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_26.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fd8b63b0d884942b633c5084e1c0753~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_27.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed4bc0d200a34b64ac57fd8bb40f3dde~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_28.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50fa95d3c18a40578685cc8c6dc43d61~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_29.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/840b4cabbeec4b15af332a4b646d6144~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_30.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e670aa8753543559dea6132ab05d026~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_31.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/585e21acb86d4da39c6b60d6d5a64aa8~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_32.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e104fb4061bd419398b716519fdee7f2~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_33.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee6b4d35df854712932d8676dc3066ee~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_34.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a21e8ace846c4a42bd310c16b637a235~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_35.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/064d43afe21e40afa555fa422f56979f~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_36.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/272de55399c34132a618b88b49a1b2d6~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_37.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6715fdd17ebf4d0394508d4368487866~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_38.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f0b8cd2c7c245cd8357d51ad6a03da3~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_39.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d569ca54c01f4ec0bc778714cf16cd35~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_40.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f86fe85059dd43cfa8944e9888ef9cbd~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

![章骏 - 字节跳动大规模集群下 KubeAPIServer 的流量治理方案_页面_42.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9138ede9d62d44889a595ce10d7708d4~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

[原文地址](https://juejin.cn/book/7127092198096502822/section/7128277680168009735)