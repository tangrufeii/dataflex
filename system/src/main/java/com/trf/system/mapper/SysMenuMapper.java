package com.trf.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.trf.system.entity.SysMenu;
import org.apache.ibatis.annotations.Mapper;

/**
 * 菜单权限表(SysMenu)表数据库访问层
 *
 * @author trf
 * @since 2025-04-29 09:51:09
 */
@Mapper
public interface SysMenuMapper extends BaseMapper<SysMenu> {

}

