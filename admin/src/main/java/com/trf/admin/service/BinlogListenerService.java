//package com.trf.admin.service;
//
//import com.github.shyiko.mysql.binlog.BinaryLogClient;
//import com.github.shyiko.mysql.binlog.event.EventData;
//import com.github.shyiko.mysql.binlog.event.QueryEventData;
//import com.github.shyiko.mysql.binlog.event.TableMapEventData;
//import jakarta.annotation.PostConstruct;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//
//@Service
//public class BinlogListenerService {
//    private static final Logger log = LoggerFactory.getLogger(BinlogListenerService.class);
//    @Value("${spring.datasource.username}") private String username;
//    @Value("${spring.datasource.password}") private String password;
//
//    @PostConstruct  // 项目启动时自动运行
//    public void startListening() {
//        log.info(">>> BinlogListenerService 初始化，开始启动监听..."); // 添加日志
//        BinaryLogClient client = new BinaryLogClient(username, password);
//        client.setServerId(1); // 必须设置唯一ID
//
//        client.registerEventListener(event -> {
//            EventData data = event.getData();
//            if (data instanceof QueryEventData queryData) {
//                if (queryData.getSql().equalsIgnoreCase("BEGIN")) {
//                    //表新建操作
//                    log.info("检测到数据变更SQL: {}", queryData.getSql());
//                    return;
//                }
//                log.info("检测到表变更SQL: {}", queryData.getSql());
//                if (queryData.getSql().contains("CREATE TABLE")) {
//                    //表新建操作
//                }
//                if (queryData.getSql().contains("ALTER TABLE")) {
//                    //表变更操作
//                }
//                if (queryData.getSql().contains("DROP TABLE")) {
//                    //表删除操作
//                }
//            }
//        });
//        Thread binlogThread = new Thread(() -> {
//            try {
//                log.info("Binlog监听线程启动...");
//                client.connect();
//            } catch (IOException e) {
//                log.error("监听失败", e);
//            }
//        });
//        binlogThread.setName("MySQL-Binlog-Thread"); // 命名线程（方便调试）
//        binlogThread.setDaemon(false); // 设为非守护线程（防止主线程退出时被强行终止）
//        binlogThread.start();
//    }
//}
