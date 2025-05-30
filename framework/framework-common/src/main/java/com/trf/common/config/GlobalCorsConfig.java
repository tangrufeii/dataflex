package com.trf.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * @description: 解决跨域问题的配置类
 * @auth: trf
 * @date: 2022-03-08 12:53
 */
@Configuration
public class GlobalCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        // 1. 根据情况添加cors配置源信息
        CorsConfiguration config = new CorsConfiguration();
       // config.addAllowedOrigin("http://localhost:8080");
        config.addAllowedOriginPattern("*");

        // 设置是否发送cookie信息
        config.setAllowCredentials(true);

        // 设置允许请求的方式
        config.addAllowedMethod("*");

        // 设置允许的header
        config.addAllowedHeader("*");

        // 2. 为url添加跨域配置
        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        corsSource.registerCorsConfiguration("/**", config);

        // 3. CorsFilter交给spring
        return new CorsFilter(corsSource);
    }
}