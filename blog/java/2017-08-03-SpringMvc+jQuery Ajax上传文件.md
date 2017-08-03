
#####控制器中这样配置，pictureFile会自动注入。
```java
	@RequestMapping(value = "/upload",method = RequestMethod.POST)
	public String upload(@RequestParam MultipartFile pictureFile,HttpServletRequest request){

		return "";
    }
````

####js中这样写
```java
    var fileList = document.getElementById("pictureFile").files;
    var file = fileList[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    var fd = new FormData();
    fd.append("pictureFile", file);
    fd.append("Ext", "");

    $.ajax({
        url:"**/upload",
        type: "post",
        dataType: "json",
        data:fd,
        contentType: false, // 注意这里应设为false
        processData: false,
        cache: false,
        success: function (result) {
            console.log(result)
        }
    })

```
