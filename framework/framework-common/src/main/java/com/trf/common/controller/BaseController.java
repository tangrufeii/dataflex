package com.trf.common.controller;



import com.trf.common.entity.ErrorCode;
import com.trf.common.entity.R;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Objects;


/**
 * @author tangrufei
 * @date 2023-08-11 15:37
 */

public class BaseController
{
    /**用于日志打印
     *
     */
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 页面跳转
     */
    public String redirect(String url)
    {
        return String.format("redirect:%s", url);
    }


    protected <T> R<T> success(T data) {
        return R.ok(data);
    }

    protected <T> R<T> failed(String msg) {
        return R.failed(msg);
    }

    protected <T> R<T> failed(ErrorCode errorCode) {
        return R.failed(errorCode);
    }
}
