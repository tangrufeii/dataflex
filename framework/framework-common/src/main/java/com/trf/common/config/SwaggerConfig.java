package com.trf.common.config;//package com.trf.dataflex.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

///**
// * 配置类用于设置和定制 Swagger/OpenAPI 文档。
// * 通过外部配置文件（如 application.properties 或 application.yml），
// * 可以定制 API 文档的标题、版本、描述、服务条款的 URL 以及许可证信息。
// * 如果没有在配置文件中指定这些值，将使用默认值。
// */
@Configuration
public class SwaggerConfig {

    // API 文档的标题，默认为 "API Documentation"
    @Value("${api.title:API Documentation}")
    private String apiTitle;

    // API 文档的版本，默认为 "1.0"
    @Value("${api.version:1.0}")
    private String apiVersion;

    // API 文档的描述，默认为 "OpenAPI Documentation"
    @Value("${api.description:OpenAPI Documentation}")
    private String apiDescription;

    // API 文档的服务条款的 URL，默认为空
    @Value("${api.termsOfServiceUrl:duck.vin}")
    private String apiTermsOfServiceUrl;

    // API 文档的许可证名称，默认为 "name"
    @Value("${api.license.name:name}")
    private String apiLicenseName;

    // API 文档的许可证 URL，默认为 "url"
    @Value("${api.license.url:url}")
    private String apiLicenseUrl;
    // 添加作者信息的配置
    @Value("${api.contact.name:作者名}")
    private String apiContactName;

    @Value("${api.contact.url:作者    网址}")
    private String apiContactUrl;

    @Value("${api.contact.email:作者电子邮箱}")
    private String apiContactEmail;

    /**
     * 创建自定义的 OpenAPI 对象。
     * 使用 @Value 注解注入的值来定制 OpenAPI 文档的基本信息，
     * 包括标题、版本、描述、服务条款 URL 和许可证信息。
     * 这些值可以通过外部配置文件设置，以适应不同项目的需求。
     *
     * @return 定制的 OpenAPI 对象
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title(apiTitle)
                        .version(apiVersion)
                        .description(apiDescription)
                        .termsOfService(apiTermsOfServiceUrl)
                        .contact(new Contact()
                                .name(apiContactName)
                                .url(apiContactUrl)
                                .email(apiContactEmail))
                        .license(new License()
                                .name(apiLicenseName)
                                .url(apiLicenseUrl)));
    }
}
