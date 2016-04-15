之前遇到遇到一个问题，工程依赖公司自己的SNAPSHOT包，放在公司的Maven私库。因为经常需要变更，所以要拉取最新的jar包。可是问题出现了。工程的依赖jar包依旧是过时的，并没有刷到最新的包。甚至把把Maven工程拉到本地直接刷进本地Maven库，不过效果仍然不行。最后没办法只能把安卓caches整个缓存包都删了，才能刷到最新jar包。不过这样耗时耗力。不是根本解决方法。

在网上查找，gradle中的说明：

> 23.9.2.2. Refresh

> At times, the Gradle Dependency Cache can be out of sync with the actual state of the configured repositories. Perhaps a repository was initially misconfigured, or perhaps a “non-changing” module was published incorrectly. To refresh all dependencies in the dependency cache, use the --refresh-dependencies option on the command line.

> The --refresh-dependencies option tells Gradle to ignore all cached entries for resolved modules and artifacts. A fresh resolve will be performed against all configured repositories, with dynamic versions recalculated, modules refreshed, and artifacts downloaded. However, where possible Gradle will check if the previously downloaded artifacts are valid before downloading again. This is done by comparing published SHA1 values in the repository with the SHA1 values for existing downloaded artifacts.

> 23.9.3. Fine-tuned control over dependency caching

> You can fine-tune certain aspects of caching using the ResolutionStrategy for a configuration.

> By default, Gradle caches dynamic versions for 24 hours. To change how long Gradle will cache the resolved version for a dynamic version, use:

> Example 23.66. Dynamic version cache control

> build.gradle
configurations.all {
    resolutionStrategy.cacheDynamicVersionsFor 10, 'minutes'
}
By default, Gradle caches changing modules for 24 hours. To change how long Gradle will cache the meta-data and artifacts for a changing module, use:

> Example 23.67. Changing module cache control

> build.gradle
configurations.all {
    resolutionStrategy.cacheChangingModulesFor 4, 'hours'
}



通过阅读上面这几段话，gradle的依赖包是有缓存这个概念的。通过一些配置是可以即时的刷到最新jar的。另外，如果不设，默认是24小时更新一次。那当然不行了，我们这边时间短的话可能几十分钟就需要变化一次内容。时间太长了。
因此需要即时更新最新代码可以通过在build.gradle配置
全设为0秒后就基本可以保证能即时刷到最新jar包了
configurations.all {
    resolutionStrategy.cacheDynamicVersionsFor 0, 'seconds'
    resolutionStrategy.cacheChangingModulesFor 0, 'seconds'
}
