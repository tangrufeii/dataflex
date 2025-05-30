package com.trf.dataflex;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.builder.CustomFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@SpringBootTest
class MybatisGenTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;
    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Test
    public void genCode(){
        String projectPath=   Paths.get(System.getProperty("user.dir")).toAbsolutePath().toString();
        String outputPath=   Paths.get(System.getProperty("user.dir")).toAbsolutePath() + "\\src\\main\\java";
        System.out.println(outputPath);
        /**
         * 快速生成器构建
          */
        FastAutoGenerator.create(dbUrl, dbUsername, dbPassword)
                //全局配置
                .globalConfig(builder -> {
                    builder.author("trf")
                            .enableSwagger() //开启swagger模式
                            .outputDir( projectPath+ "\\src\\main\\java")
                            .commentDate("yyyy-MM-dd");
                })
                // 包配置
                .packageConfig(builder -> builder
                        .parent("com.trf.dataflex")
                        .entity("entity")
                        .mapper("mapper")
                        .service("service")
                        .serviceImpl("service.impl")
                        .xml("mapper.xml")
                )
                // 策略配置
                .strategyConfig(builder ->
                        builder.addInclude("sys_menu")
                                .entityBuilder()
                                .enableLombok() // 使用Lombok
                                .controllerBuilder()
                                .enableRestStyle() // 启用RestController

                        )
                .injectionConfig(injectConfig -> {
                    Map<String,Object> customMap = new HashMap<>();
                    customMap.put("abc","1234");
                    injectConfig.customMap(customMap); //注入自定义属性
                    injectConfig.customFile(new CustomFile.Builder()
                            .fileName("entityDTO.java") //文件名称
                            .templatePath("templates/entityDTO.java.ftl") //指定生成模板路径
                            .packageName("dto") //包名,自3.5.10开始,可通过在package里面获取自定义包全路径,低版本下无法获取,示例:package.entityDTO
                            .build());
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();

    }
}