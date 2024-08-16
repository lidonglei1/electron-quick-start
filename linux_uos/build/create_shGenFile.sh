#!/bin/bash

# 目标目录
DIRECTORY="/data/home/huawei/YBC/DLGG/sh"

# 生成的文件名
FILENAME="shGenFile"

# 检查目标目录是否存在，如果不存在则创建
if [ ! -d "$DIRECTORY" ]; then
    mkdir -p "$DIRECTORY"
fi

# 创建文件
touch "$DIRECTORY/$FILENAME"

# 提示信息
echo "文件 $FILENAME 已成功创建在目录 $DIRECTORY 下"
