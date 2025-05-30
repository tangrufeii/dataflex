package com.trf.common.entity;



import com.trf.common.Exception.ApiException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.io.Serializable;
import java.util.Optional;

@Getter
@Schema(description = "通用返回结果")
public class R<T> implements Serializable {
    @Schema(description = "返回码(200为成功,-1为失败)", example = "200")
    private long code;
    @Schema(description = "返回内容")
    private T data;
    @Schema(description = "返回消息", example = "操作成功")
    private String msg;

    public R() {
    }

    public R(ErrorCode errorCode) {
        errorCode =  Optional.ofNullable(errorCode).orElse(ErrorCode.FAILED);
        this.code = errorCode.getCode();
        this.msg = errorCode.getMsg();
    }

    public static <T> R<T> ok(T data) {
        ErrorCode aec = ErrorCode.SUCCESS;
        if (data instanceof Boolean && Boolean.FALSE.equals(data)) {
            aec = ErrorCode.FAILED;
        }

        return restResult(data, aec);
    }

    public static <T>  R<T> failed(String msg) {
        return restResult(null, ErrorCode.FAILED.getCode(), msg);
    }

    public static <T> R<T> failed(ErrorCode errorCode) {
        return restResult(null, errorCode);
    }

    public static <T> R<T> restResult(T data, ErrorCode errorCode) {
        return restResult(data, errorCode.getCode(), errorCode.getMsg());
    }

    private static <T> R<T> restResult(T data, long code, String msg) {
        R<T> apiResult = new R();
        apiResult.setCode(code);
        apiResult.setData(data);
        apiResult.setMsg(msg);
        return apiResult;
    }

    public boolean ok() {
        return ErrorCode.SUCCESS.getCode() == this.code;
    }

    public T serviceData() {
        if (!this.ok()) {
            throw new ApiException(this.msg);
        } else {
            return this.data;
        }
    }

    public R<T> setCode(final long code) {
        this.code = code;
        return this;
    }

    public R<T> setData(final T data) {
        this.data = data;
        return this;
    }

    public R<T> setMsg(final String msg) {
        this.msg = msg;
        return this;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof R)) {
            return false;
        } else {
            R<?> other = (R)o;
            if (!other.canEqual(this)) {
                return false;
            } else if (this.getCode() != other.getCode()) {
                return false;
            } else {
                Object thisData = this.getData();
                Object otherData = other.getData();
                if (thisData == null) {
                    if (otherData != null) {
                        return false;
                    }
                } else if (!thisData.equals(otherData)) {
                    return false;
                }

                Object thisMsg = this.getMsg();
                Object otherMsg = other.getMsg();
                if (thisMsg == null) {
                    if (otherMsg != null) {
                        return false;
                    }
                } else if (!thisMsg.equals(otherMsg)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof R;
    }

    public int hashCode() {
        int result = 1;
        long code = this.getCode();
        result = result * 59 + Long.hashCode(code);
        Object data = this.getData();
        result = result * 59 + (data == null ? 43 : data.hashCode());
        Object msg = this.getMsg();
        result = result * 59 + (msg == null ? 43 : msg.hashCode());
        return result;
    }

    public String toString() {
        return "R(code=" + this.getCode() + ", data=" + this.getData() + ", msg=" + this.getMsg() + ")";
    }


}
