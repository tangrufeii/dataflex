package com.trf.common.Exception;


import com.trf.common.entity.ErrorCode;

public class ApiException extends RuntimeException {
    private static final long serialVersionUID = -5885155226898287929L;
    private ErrorCode errorCode;

    public ApiException(ErrorCode errorCode) {
        super(errorCode.getMsg());
        this.errorCode = errorCode;
    }

    public ApiException(String message) {
        super(message);
    }

    public ApiException(Throwable cause) {
        super(cause);
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    public ErrorCode getErrorCode() {
        return this.errorCode;
    }
}
