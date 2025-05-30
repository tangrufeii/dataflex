package com.trf.system.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 菜单权限表(SysMenu)实体类
 *
 * @author trf
 * @since 2025-04-29 09:51:09
 */
@Setter
@Getter
@Schema(name = "(菜单权限表)", description = "菜单权限表(SysMenu)实体类")
@TableName(value = "sys_menu")
public class SysMenu implements Serializable {
    @Serial
    private static final long serialVersionUID = 665959726369866031L;
    /**
     * 菜单ID
     */
    @Schema(description = "菜单ID")
    private Long id;
    /**
     * 父菜单ID（0表示根菜单）
     */
    @Schema(description = "父菜单ID（0表示根菜单）")
    private Long parentId;
    /**
     * 菜单名称
     */
    @Schema(description = "菜单名称")
    private String name;
    /**
     * 菜单图标
     */
    @Schema(description = "菜单图标")
    private String icon;
    /**
     * 路由路径
     */
    @Schema(description = "路由路径")
    private String path;
    /**
     * 组件路径
     */
    @Schema(description = "组件路径")
    private String component;
    /**
     * 权限标识
     */
    @Schema(description = "权限标识")
    private String perms;
    /**
     * 菜单类型（1目录 2菜单 3按钮）
     */
    @Schema(description = "菜单类型（1目录 2菜单 3按钮）")
    private Integer type;
    /**
     * 排序
     */
    @Schema(description = "排序")
    private Integer sort;
    /**
     * 是否可见（1显示 0隐藏）
     */
    @Schema(description = "是否可见（1显示 0隐藏）")
    private Integer visible;
    /**
     * 状态（1正常 0停用）
     */
    @Schema(description = "状态（1正常 0停用）")
    private Integer status;
    /**
     * 创建时间
     */
    @Schema(description = "创建时间")
    private Date createTime;
    /**
     * 更新时间
     */
    @Schema(description = "更新时间")
    private Date updateTime;
    /**
     * 删除标识（0未删除 1已删除）
     */
    @Schema(description = "删除标识（0未删除 1已删除）")
    private Integer deleted;

    @Schema(description = "国际化键")
    private String i18nKey;

    @Schema(description = "是否是外链(0否 1是)")
    private Integer isFrame;

    @Schema(description = "外链链接")
    private String url;

    @Schema(description = "子菜单列表")
    @TableField(exist = false) // 重要：标记此字段非数据库字段
    private List<SysMenu> children; // 修改为List类型

}

