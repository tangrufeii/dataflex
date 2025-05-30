package com.trf.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.trf.system.entity.SysUser;
import com.trf.system.mapper.SysUserMapper;
import com.trf.system.service.SysUserService;
import org.springframework.stereotype.Service;

/**
 * 系统用户表(SysUser)表服务实现类
 *
 * @author trf
 * @since 2025-04-27 14:59:24
 */
@Service("sysUserService")
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

}

