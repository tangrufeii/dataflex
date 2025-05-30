package com.trf.common.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Function;

/**
 * 树形结构工具类
 */
public class TreeUtil {

    /**
     * 构建树形结构
     *
     * @param list 源数据列表
     * @param getIdFn 获取节点ID的函数
     * @param getParentIdFn 获取父节点ID的函数
     * @param getChildrenFn 获取子节点集合的函数
     * @param setChildrenFn 设置子节点集合的函数
     * @param <T> 节点类型
     * @param <K> 节点ID类型
     * @return 树形结构列表
     */
    public static <T, K> List<T> buildTree(List<T> list,
                                           Function<T, K> getIdFn,
                                           Function<T, K> getParentIdFn,
                                           Function<T, List<T>> getChildrenFn,
                                           BiConsumer<T, List<T>> setChildrenFn  ) {
                                           // 用Map存储所有节点
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        }
        Map<K, T> nodeMap = new HashMap<>(list.size());
        list.forEach(node -> nodeMap.put(getIdFn.apply(node), node));

        // 构建树形结构
        List<T> trees = new ArrayList<>();
        list.forEach(node -> {
            K parentId = getParentIdFn.apply(node);
            if (isRootNode(parentId)) {
                trees.add(node);
            } else {
                T parentNode = nodeMap.get(parentId);
                if (parentNode != null) {
                    List<T> children = getChildrenFn.apply(parentNode);
                    if (children == null) {
                        children = new ArrayList<>();
                        setChildrenFn.accept(parentNode,children);
                    }
                    children.add(node);
                }
            }
        });

        return trees;
    }

    private static <K> boolean isRootNode(K parentId) {
        if (parentId == null) return true;
        if (parentId instanceof Number) {
            return ((Number) parentId).longValue() <= 0;
        }
        return parentId.equals(0) || parentId.equals("0");  // 支持更多类型
    }
}
