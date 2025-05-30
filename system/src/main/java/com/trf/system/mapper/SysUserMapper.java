package com.trf.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.trf.system.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * 系统用户表(SysUser)表数据库访问层
 *
 * @author trf
 * @since 2025-04-27 14:59:24
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

}

