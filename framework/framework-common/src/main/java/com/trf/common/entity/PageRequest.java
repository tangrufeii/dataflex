package com.trf.common.entity;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Schema(description = "分页请求数据")
public class PageRequest<T> {
    @Schema
    private boolean isPage;
    @Schema(description = "排序规则")
    private List<OrderItem> orders;
    @Schema(description = "总记录数")
    private long total;

    @Schema(description = "每页记录数")
    private long size=10;

    @Schema(description = "当前页码(默认从1开始)")
    private long current;
    /**
     * 将自定义的PageRequest转换为MyBatis-Plus的Page对象
     *
     * @return MyBatis-Plus的Page对象
     */
    public  <T> Page<T> toPage() {
        Page<T> page = new Page<>(this.getCurrent(), this.getSize());

        // 应用排序规则
        if (this.getOrders() != null) {
            this.getOrders().forEach(orderItem -> {
                if (orderItem.isAsc()) {
                    page.addOrder(com.baomidou.mybatisplus.core.metadata.OrderItem.asc(orderItem.getColumn()));
                } else {
                    page.addOrder(com.baomidou.mybatisplus.core.metadata.OrderItem.desc(orderItem.getColumn()));
                }
            });
        }
        return page;
    }

}
