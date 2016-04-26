改变手机壁纸需要使用到Android提供的WallpaperManager类，该对象提供了以下方法来改变壁纸：
- setBitmap(Bitmap bitmap);
设置bitmap位图对象为壁纸。

- setResource(int resid);
设置一个资源图片为壁纸。

- setStream(InputStream data);
设置一个图片资源的输入流为壁纸的。

##### WallpaperManager的获取：
WallpaperManager提供一个静态方法来获取它的单例
```java
public static WallpaperManager getInstance(Context context)
```

AndroidManifest还需声明该权限
```java
<uses-permission android:name="android.permission.SET_WALLPAPER"></uses-permission>
```

下面一个简单布局，一个按钮控制更换壁纸和恢复系统壁纸
```java
btn.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        try {
            WallpaperManager instance = WallpaperManager.getInstance(MainActivity.this);

            Log.i("",""+(i%2 == 0));
            if (i%2 == 0){
                //设置一张图片
                instance.setResource(R.drawable.zh_2);
                //instance.setBitmap(bitmap);
                //instance.setStream(inputStream);
            }else {
                //清除自己的壁纸，恢复系统壁纸
                instance.clear();
            }
            i++;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
});
```
