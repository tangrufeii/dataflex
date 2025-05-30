package com.trf.common.entity;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Schema(description = "分页响应数据")
public class PageResponse<T> {
    @Schema(description = "当前页的数据列表",implementation = Object.class)

    private List<T> records;

    @Schema(description = "总记录数")
    private long total;

    @Schema(description = "每页记录数")
    private long size;

    @Schema(description = "当前页码")
    private long current;

    public PageResponse(IPage<T> pageData) {
        this.records = pageData.getRecords();
        this.total = pageData.getTotal();
        this.size = pageData.getSize();
        this.current = pageData.getCurrent();
    }
}
