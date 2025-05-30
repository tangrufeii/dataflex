package com.trf.common.db;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
@Slf4j
@Component
public class DBUtils {
    private final DataSource dataSource;
    private final DatabaseMetaData metaData;

    public DBUtils(DataSource dataSource) throws SQLException {
        this.dataSource = Objects.requireNonNull(dataSource);
        try (Connection conn = dataSource.getConnection()) {
            this.metaData = conn.getMetaData();
        }
    }

    // 获取所有表名（根据数据库类型适配）
    public List<String> getAllTables(String schema) throws SQLException {
        List<String> tables = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             ResultSet rs = metaData.getTables(null, schema, "%", new String[]{"TABLE", "VIEW"})) {
            while (rs.next()) {
                tables.add(rs.getString("TABLE_NAME"));
            }
        }
        return tables;
    }

    // 获取表结构详情（包含字段注释）
    public List<ColumnMeta> getTableStructure(String schema, String tableName) throws SQLException {
        List<ColumnMeta> columns = new ArrayList<>();
        try (Connection conn = dataSource.getConnection()) {
            // 基本信息获取
            ResultSet columnsRs = metaData.getColumns(null, schema, tableName, "%");
            while (columnsRs.next()) {
                ColumnMeta meta = new ColumnMeta(
                        columnsRs.getString("COLUMN_NAME"),
                        columnsRs.getString("TYPE_NAME"),
                        columnsRs.getInt("COLUMN_SIZE"),
                        columnsRs.getBoolean("IS_NULLABLE"),
                        columnsRs.getString("REMARKS") // 字段注释
                );
                log.info(meta.toString());
                columns.add(meta);
            }

            // 主键信息获取
            ResultSet pkRs = metaData.getPrimaryKeys(null, schema, tableName);
            Set<String> primaryKeys = new HashSet<>();
            while (pkRs.next()) {
                primaryKeys.add(pkRs.getString("COLUMN_NAME"));
            }
            columns.forEach(col -> col.setPrimaryKey(primaryKeys.contains(col.getName())));
        }
        return columns;
    }
        // 字段元数据
    @AllArgsConstructor
    @Data
    public static class ColumnMeta {
        /** 字段名称 */
        private final String name;
        /** 字段类型 */
        private final String type;
        /** 字段大小 */
        private final int size;
        /** 字段是否非空 */
        private final boolean nullable;
        /** 字段描述 */
        private final String comment;
        private boolean primaryKey;

        public ColumnMeta(String name, String type, int size, boolean nullable, String comment) {
                this.name = name;
                this.type = type;
                this.size = size;
                this.nullable = nullable;
                this.comment = comment;
        }

         @Override
        public String toString() {
            return "ColumnMeta{" +
                        "name='" + name + '\'' +
                        ", type='" + type + '\'' +
                        ", size=" + size +
                        ", nullable=" + nullable +
                        ", comment='" + comment + '\'' +
                        ", primaryKey=" + primaryKey +
                        '}';
            }
        }
}
