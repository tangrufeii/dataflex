package com.trf.admin.controller;



import com.trf.admin.gen.UserDynamicControllerGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;
@Slf4j
@RestController
@RequestMapping("/dynamic")
@RequiredArgsConstructor
public class DynamicController {

    private final UserDynamicControllerGenerator controllerGenerator;

    private final RequestMappingHandlerMapping handlerMapping;



    @GetMapping("/test")
    public String testDynamicBean() throws Exception {
        Object userController = controllerGenerator.generateUserController();
        handlerMapping.registerMapping(
                RequestMappingInfo.paths("/users/")
                        .methods(RequestMethod.GET)
                        .produces(MediaType.APPLICATION_JSON_VALUE)
                        .build(),
                userController,
                userController.getClass()
                        .getMethod("getAll"));
        log.info("Registered request handler for `DynamicController`: {}", userController.getClass().getName());
        return "test";
    }
}
