package com.trf.common.entity;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

@Schema(description = "排序对象")
public class OrderItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Schema(description = "排序字段")
    private String column;
    @Schema(description = "是否升序")
    private boolean asc = true;

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public boolean isAsc() {
        return asc;
    }

    public void setAsc(boolean asc) {
        this.asc = asc;
    }

}
