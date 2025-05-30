package com.trf.dataflex;

import net.bytebuddy.ByteBuddy;
import net.bytebuddy.dynamic.DynamicType;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;

@SpringBootTest
class ByteBuddyTest {

    @Test
    public void createTest() throws IOException {
//        try (DynamicType.Unloaded<Object> upLoaded = new ByteBuddy()
//                .subclass(Object.class)
//                .make()) {
//            upLoaded.saveIn(new File(path));
//        }
    }

}