package com.trf.common.utils;

import java.util.Comparator;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * 增强版树形结构工具类
 */
public class TreeUtilPlus {
    
    /**
     * 构建树形结构（可排序）
     *
     * @param list 源数据列表
     * @param getIdFn 获取节点ID的函数
     * @param getParentIdFn 获取父节点ID的函数
     * @param getChildrenFn 获取子节点集合的函数
     * @param setChildrenFn 设置子节点集合的函数
     * @param comparator 排序比较器(可为null)
     * @param <T> 节点类型
     * @param <K> 节点ID类型
     * @return 树形结构列表
     */
    public static <T, K> List<T> buildTree(List<T> list,
                                           Function<T, K> getIdFn,
                                           Function<T, K> getParentIdFn,
                                           Function<T, List<T>> getChildrenFn,
                                           BiConsumer<T, List<T>> setChildrenFn ,
                                           Comparator<T> comparator) {
        // 构建基础树形结构
        List<T> trees = TreeUtil.buildTree(list, getIdFn, getParentIdFn, getChildrenFn, setChildrenFn);
        
        // 如果需要排序
        if (comparator != null) {
            sortTree(trees, getChildrenFn, comparator);
        }
        
        return trees;
    }
    
    /**
     * 递归排序树结构
     */
    private static <T> void sortTree(List<T> trees,
                                   Function<T, List<T>> getChildrenFn,
                                   Comparator<T> comparator) {
        trees.sort(comparator);
        for (T node : trees) {
            List<T> children = getChildrenFn.apply(node);
            if (children != null && !children.isEmpty()) {
                sortTree(children, getChildrenFn, comparator);
            }
        }
    }
}
