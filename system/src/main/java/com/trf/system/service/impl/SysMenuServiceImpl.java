package com.trf.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.trf.system.mapper.SysMenuMapper;
import com.trf.system.entity.SysMenu;
import com.trf.system.service.SysMenuService;
import org.springframework.stereotype.Service;

/**
 * 菜单权限表(SysMenu)表服务实现类
 *
 * @author trf
 * @since 2025-04-29 09:51:09
 */
@Service("sysMenuService")
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

}

