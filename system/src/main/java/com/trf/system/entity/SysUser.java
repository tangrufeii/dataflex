package com.trf.system.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;




/**
 * 系统用户表(SysUser)实体类
 *
 * @author trf
 * @since 2025-04-27 14:59:24
 */

/**
 * 切记不要继承extends Model<SysUser>!!!否则会导致文档深层递归导致栈内存溢出
 */
@Setter
@Getter
@Schema(name = "(系统用户表)", description = "系统用户表(SysUser)实体类")
@TableName(value = "sys_user")
public class SysUser implements Serializable {
    @Serial
    private static final long serialVersionUID = -13047673565077189L;
    /**
     * 用户ID
     */
    @Schema(description = "用户ID")
    private Long id;
    /**
     * 用户名
     */
    @Schema(description = "用户名")
    private String username;
    /**
     * 密码（加密存储）
     */
    @Schema(description = "密码（加密存储）")
    private String password;
    /**
     * 加密盐值
     */
    @Schema(description = "加密盐值")
    private String salt;
    /**
     * 真实姓名
     */
    @Schema(description = "真实姓名")
    private String realName;
    /**
     * 头像URL
     */
    @Schema(description = "头像URL")
    private String avatar;
    /**
     * 邮箱
     */
    @Schema(description = "邮箱")
    private String email;
    /**
     * 手机号
     */
    @Schema(description = "手机号")
    private String mobile;
    /**
     * 状态（1正常 0停用）
     */
    @Schema(description = "状态（1正常 0停用）")
    private Integer status;
    /**
     * 部门ID
     */
    @Schema(description = "部门ID")
    private Long deptId;
    /**
     * 最后登录IP
     */
    @Schema(description = "最后登录IP")
    private String lastLoginIp;
    /**
     * 最后登录时间
     */
    @Schema(description = "最后登录时间")
    private Date lastLoginTime;
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

}

