参考http://blog.csdn.net/boystray/article/details/77840696

因为业务需要，当手机休眠待机时也需要获取定位信息。之前通过降低定位时间间隔的方式和增大距离，效果并不是太明显。在查找资料时，发现上诉优化要点，因此尝试其中一个方法。闹钟唤醒服务进行定位，并及时注销定位监听。

#### 注册重复闹钟
```java
    Intent serviceIntent = new Intent(this, TrackerService.class);
        PendingIntent mPendingIntent = PendingIntent.getService(this, 0, serviceIntent,
                PendingIntent.FLAG_UPDATE_CURRENT);

        AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);

        alarmManager.cancel(mPendingIntent);
        alarmManager.setInexactRepeating(AlarmManager.RTC_WAKEUP,
                System.currentTimeMillis(), 60 * 1000, mPendingIntent);
```


#### 定位实现代码
```java

public class TrackerService extends Service {
    private WpaApp mApp;
    private LocationManager mLocationManager;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i("定位","开始定位...");
        mLocationManager =  (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        mLocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 1000f,heartbeat);

        new Thread(){
            @Override
            public void run() {
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                stopSelf();
            }
        }.start();
    }

    public TrackerService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    private LocationListener heartbeat = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            mApp.setLocation(location);
            stopSelf();
            return;
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {

        }

        @Override
        public void onProviderEnabled(String s) {

        }

        @Override
        public void onProviderDisabled(String s) {

        }
    };

    @Override
    public void onDestroy() {
        super.onDestroy();
        mLocationManager.removeUpdates(heartbeat);
        mLocationManager = null;
        Log.i("定位","结束定位...");
    }
}

```