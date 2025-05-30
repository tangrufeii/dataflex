package com.trf.admin.gen;



import com.trf.admin.model.User;
import com.trf.admin.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.ByteBuddy;
import net.bytebuddy.description.annotation.AnnotationDescription;
import net.bytebuddy.implementation.MethodDelegation;
import net.bytebuddy.implementation.bind.annotation.Argument;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;
import java.util.List;

/**
 * Generates rest controller for {@link User} at runtime:
 * {@code
 *
 * package com.example.dynamic.controller.demo;
 *
 * import com.example.dynamic.controller.demo.UserDynamicControllerGenerator.UserControllerMethodsImplementation;
 *
 * import java.util.List;
 *
 * import org.springframework.web.bind.annotation.PathVariable;
 * import org.springframework.web.bind.annotation.RequestParam;
 * import org.springframework.web.bind.annotation.RestController;
 *
 * @RestController
 * public class UserDynamicController {
 *     public List getAll() {
 *         return UserControllerMethodsImplementation.getAll();
 *     }
 *
 *     public User getById(@RequestParam(name = "id") Long id) {
 *         return UserControllerMethodsImplementation.get(id);
 *     }
 *
 *     public void save(@RequestBody User user) {
 *         UserControllerMethodsImplementation.save(user);
 *     }
 *
 *     public void update(@RequestParam(name = "id") Long id, @RequestBody User user) {
 *         UserControllerMethodsImplementation.update(id, user);
 *     }
 *
 *     public void updateNickName(@RequestParam(name = "id") Long id, @RequestParam(name = "nickName") String nickName) {
 *         UserControllerMethodsImplementation.updateNickName(id, nickName);
 *     }
 *
 *     public void delete(@PathVariable(name = "id") Long id) {
 *         UserControllerMethodsImplementation.delete(id);
 *     }
 *
 *     public UserDynamicController() {
 *     }
 * }
 *
 * }
 */
@Slf4j
@Component
@DependsOn("userService")
@RequiredArgsConstructor
public class UserDynamicControllerGenerator {

    private final ApplicationContext applicationContext;


    @SneakyThrows
    public Object generateUserController() {
        //init static implemention to avoid reflection useage
        UserControllerMethodsImplementation.userService = applicationContext.getBean(UserService.class);

        //Creates builder with unique classname and @Restcontroller annotation

        Class<?> dynamicControllerClass = new ByteBuddy()
                .subclass(Object.class)
                .name("UserDynamicController")
                .annotateType(AnnotationDescription.Builder
                        .ofType(RestController.class)
                        .build())

                .defineMethod("getAll", List.class, Modifier.PUBLIC)
                .intercept(MethodDelegation.to(UserControllerMethodsImplementation.class))

                .defineMethod("getByID", User.class, Modifier.PUBLIC)
                .withParameter(Long.class, "id")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(RequestParam.class)
                        .define("name", "id")
                        .build())
                .intercept(MethodDelegation.to(UserControllerMethodsImplementation.class))

                .defineMethod("save", void.class, Modifier.PUBLIC)
                .withParameter(User.class, "user")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(RequestBody.class)
                        .build())
                .intercept(MethodDelegation.to(UserControllerMethodsImplementation.class))

                .defineMethod("update", void.class, Modifier.PUBLIC)
                .withParameter(Long.class, "id")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(RequestParam.class)
                        .define("name", "id")
                        .build())
                .withParameter(User.class, "user")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(RequestBody.class)
                        .build())
                .intercept(MethodDelegation.to(UserControllerMethodsImplementation.class))

                .defineMethod("updateNickName", void.class, Modifier.PUBLIC)
                .withParameter(Long.class, "id")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(RequestParam.class)
                        .define("name", "id")
                        .build())
                .withParameter(String.class, "nickName")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(RequestParam.class)
                        .define("name", "nickName")
                        .build())
                .intercept(MethodDelegation.to(UserControllerMethodsImplementation.class))

                .defineMethod("delete", void.class, Modifier.PUBLIC)
                .withParameter(Long.class, "id")
                .annotateParameter(AnnotationDescription.Builder
                        .ofType(PathVariable.class)
                        .define("name", "id")
                        .build())
                .intercept(MethodDelegation.to(UserControllerMethodsImplementation.class))

                .make()
                .load(getClass().getClassLoader())
                .getLoaded();

        Constructor<?> constructor = dynamicControllerClass.getConstructor();
        Object userController = constructor.newInstance();


        log.info("Generated `DynamicController`: {}", userController.getClass().getName());
        return userController;
    }


    public static class UserControllerMethodsImplementation {

        private static UserService userService;

        public static List<User> getAll() {
            return userService.getAll();
        }

        public static User get(@Argument(0) Long id) {
            return userService.getUserById(id);
        }

        public static void save(@Argument(0) User user) {
            userService.save(user);
        }

        public static void update(@Argument(0) Long id,
                                  @Argument(1) User user) {
            userService.update(id, user);
        }

        public static void updateNickname(@Argument(0) Long id,
                                          @Argument(1) String nickName) {
            userService.updateNickName(id, nickName);
        }

        public static void delete(@Argument(0) Long id) {
            userService.delete(id);
        }
    }
}