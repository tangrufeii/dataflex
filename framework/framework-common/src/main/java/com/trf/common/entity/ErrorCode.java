package com.trf.common.entity;



public enum ErrorCode {
    FAILED(-1L, "操作失败"),
    SUCCESS(0L, "执行成功");
    private final long code;
    private final String msg;
    ErrorCode(final long code, final String msg) {
        this.code = code;
        this.msg = msg;
    }
    public static ErrorCode fromCode(long code) {
        ErrorCode[] ecs = values();
        ErrorCode[] var3 = ecs;
        int var4 = ecs.length;
        for(int var5 = 0; var5 < var4; ++var5) {
            ErrorCode ec = var3[var5];
            if (ec.getCode() == code) {
                return ec;
            }
        }
        return SUCCESS;
    }
    public long getCode() {
        return this.code;
    }

    public String getMsg() {
        return this.msg;
    }

    public String toString() {
        return String.format(" ErrorCode:{code=%s, msg=%s} ", this.code, this.msg);
    }
}
