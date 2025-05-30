package com.trf.common.config;//package com.trf.dataflex.common.config;
//
//import com.trf.dataflex.common.db.DBUtils;
//import org.springframework.beans.factory.SmartInitializingSingleton;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.method.HandlerMethod;
//import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
//import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
//
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//@Configuration
///**
// * 动态接口注册
// */
//public class DynamicRegistrationConfig {
//    @Autowired
//    private ApplicationContext applicationContext;
//    @Autowired
//    private DBUtils dbUtils;
//
//    @Bean
//    public SmartInitializingSingleton dynamicEndpointInitializer() throws SQLException {
//        // 此时所有@Controller bean已初始化完成
//        return registerDynamicEndpoints();
//    }
//
//    private SmartInitializingSingleton registerDynamicEndpoints() throws SQLException {
//        // 获取Request Mapping处理器映射，用于获取所有请求映射信息
//        RequestMappingHandlerMapping mapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
//        Map<RequestMappingInfo, HandlerMethod> methodMap = mapping.getHandlerMethods();
//        // 初始化URL列表
//        List<String> urlList = new ArrayList<>();
//        // 遍历所有的请求映射信息
//        for (RequestMappingInfo info : methodMap.keySet()){
//            // 获取当前映射信息中的URL模式
//            Set<String> urlSet = info.getPatternsCondition().getPatterns();
//            // 获取当前映射信息中的请求方法
//            Set<RequestMethod> Methods = info.getMethodsCondition().getMethods();
//            // 打印请求方法，用于调试目的
//            for (String url : urlSet){
//                // 加上自己的域名和端口号，就可以直接调用
//                urlList.add("http://localhost:8080"+url);
//                System.out.println("url:"+url);
//            }
//
//        }
//        //TODO 数据库基础接口统一自动创建
//        System.out.println("Registering Dynamic Endpoints");
//        dbUtils.getAllTables("test");
//        return null;
//    }
//
//}
