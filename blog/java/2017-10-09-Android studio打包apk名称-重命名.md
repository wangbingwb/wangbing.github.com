每次需要打包给同事测试或其他用途时，默认打包都是app-debug.apk。每次都需要单独修改名称，才好发给同事，不然同事都不知道是什么apk。
这也不是事儿，还是想办法解决一下吧。

#####直接上.gradle配置：
```java

def releaseTime() {
    return new Date().format("yyyyMMdd", TimeZone.getTimeZone("UTC"))
}

android {
    .
    .
    .

    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            def outputFile = output.outputFile
            if (outputFile != null && outputFile.name.endsWith('.apk')) {

                // 自定义名称.apk
                def fileName = "app-name-${defaultConfig.versionName}-${releaseTime() }.apk"
                output.outputFile = new File(outputFile.parent, fileName)
            }
        }
    }
}
```