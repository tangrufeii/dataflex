package com.trf.admin;

import cn.dev33.satoken.SaManager;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Collections;

import static com.trf.admin.tools.PrintSatokenConfigUtils.formatConfig;

@SpringBootApplication(scanBasePackages = "com.trf")
@MapperScan("com.trf.**.mapper")
public class DataFlexApplication {
    /**用于日志打印
     *
     */
    protected static final Logger log = LoggerFactory.getLogger(DataFlexApplication.class);
    public static void main(String[] args) throws UnknownHostException {
        ConfigurableApplicationContext application = SpringApplication.run(DataFlexApplication.class, args);
        //控制台输出访问信息
        Environment env = application.getEnvironment();
        String ip = InetAddress.getLocalHost().getHostAddress();
        String port = env.getProperty("server.port");
        port = port == null ? "8080" : port;
        String path = env.getProperty("server.servlet.context-path");
        path = path == null ? "" : path;
        String tabString = String.join("", Collections.nCopies(8, "\t"));
        log.info("启动成功，Sa-Token 配置如下：" + formatConfig(SaManager.getConfig()));
        log.info("\n" +"     "+
                "________________________ _____________" +tabString+ "----------------------------------------------------------\n\t"+
                "_  _ \\_  ___/  ___/  __ `/__  __ \\  _ \\" + tabString+"Application Demo is running! Access URLs:\n\t" +
                "/  __/(__  )/ /__ / /_/ /__  /_/ /  __" + tabString +"本地访问地址: \thttp://localhost:" + port + path + "/\n\t" +
                "\\___//____/ \\___/ \\__,_/ _  .___/\\___/ " +tabString+"外部访问地址: \thttp://" + ip + ":" + port + path + "/\n\t" +
                "                         /_/           "+tabString+ "Swagger文档: \thttp://localhost:" + port + path + "/doc.html\n" +
                "\t---------------------------------------"+tabString+"----------------------------------------------------------");
    }

}
