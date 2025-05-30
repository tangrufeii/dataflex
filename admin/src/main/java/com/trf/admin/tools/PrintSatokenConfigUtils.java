package com.trf.admin.tools;

import cn.dev33.satoken.config.SaTokenConfig;
import com.trf.admin.DataFlexApplication;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.Map;

public class PrintSatokenConfigUtils {

    protected static final Logger log = LoggerFactory.getLogger(DataFlexApplication.class);
    public static String formatConfig(SaTokenConfig config) {
        StringBuilder sb = new StringBuilder("Sa-Token 配置:\n");
        try {
            for (Field field : FieldUtils.getAllFields(config.getClass())) {
                field.setAccessible(true);
                Object value = field.get(config);
                if (value != null && !field.getName().equals("serialVersionUID")) {
                    sb.append(String.format("  %-25s = %s\n", field.getName(), value instanceof Map ? "..." : value));  // 简化 Map 输出
                }
            }
        } catch (IllegalAccessException e) {
            log.error("反射读取配置失败", e);
        }
        return sb.toString();
    }
}
