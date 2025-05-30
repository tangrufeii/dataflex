package com.trf.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.trf.common.controller.BaseController;
import com.trf.common.entity.PageRequest;
import com.trf.common.entity.PageResponse;
import com.trf.common.entity.R;
import com.trf.common.utils.TreeUtil;
import com.trf.common.utils.TreeUtilPlus;
import com.trf.system.entity.SysMenu;
import com.trf.system.service.SysMenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.Comparator;
import java.util.List;


/**
 * 菜单权限表(SysMenu)表控制层
 *
 * @author trf
 * @since 2025-04-29 09:51:09
 */
@RestController
@RequestMapping("sysMenu")
@Tag(name = "菜单权限表(SysMenu)表控制层")
public class SysMenuController extends BaseController {
    /**
     * 服务对象
     */
    @Resource
    private SysMenuService sysMenuService;

    /**
     * 查询所有数据
     *
     * @param sysMenu 查询实体
     * @return 所有数据
     */
    @GetMapping
    @Operation(summary = "查询所有数据")
    public R<List<SysMenu>> selectAll(SysMenu sysMenu) {
        // 1. 查询所有菜单
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>(sysMenu);
        List<SysMenu> allMenus = sysMenuService.list(wrapper);
        // 2. 构建树形结构并按 sort 字段排序
        List<SysMenu> menuTree = TreeUtilPlus.buildTree(
                allMenus,                // 数据源
                SysMenu::getId,          // 获取ID的方法
                SysMenu::getParentId,    // 获取父ID的方法
                SysMenu::getChildren,    // 获取子节点集合的方法
                SysMenu::setChildren,    // 设置子节点集合的方法
                Comparator.comparing(
                        SysMenu::getSort,
                        Comparator.nullsLast(Comparator.nullsLast(Comparator.naturalOrder()))
                ) // 按 sort 升序排序.空值在最后
        );
        // 3. 返回结果
        return success(menuTree);
    }
    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("{id}")
    @Operation(summary = "通过主键查询单条数据")
    public R<SysMenu> selectOne(@PathVariable Serializable id) {
        return success(this.sysMenuService.getById(id));
    }

    /**
     * 新增数据
     *
     * @param sysMenu 实体对象
     * @return 新增结果
     */
    @PostMapping
    @Operation(summary = "新增数据")
    public R<Boolean> insert(@RequestBody SysMenu sysMenu) {
        return success(this.sysMenuService.save(sysMenu));
    }

    /**
     * 修改数据
     *
     * @param sysMenu 实体对象
     * @return 修改结果
     */
    @PutMapping
    @Operation(summary = "修改数据")
    public R<Boolean> update(@RequestBody SysMenu sysMenu) {
        return success(this.sysMenuService.updateById(sysMenu));
    }

    /**
     * 删除数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping
    @Operation(summary = "删除数据")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return success(this.sysMenuService.removeByIds(idList));
    }
}

