// rn-coronanet - Coronavirus social distancing network
// Copyright (c) 2020 Péter Szilágyi. All rights reserved.

package xyz.coronanet;

import android.app.Service;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.R;

import xyz.coronanet.Bridge;
import xyz.coronanet.GatewayStatus;
import io.ipsn.ghostbridge.GhostBridge;

// GatewayService is the foreground Android service that acts as the gateway into
// the P2P corona network.
public class GatewayService extends Service {
  // bridge is the API server library implemented in Go that React Native can call
  // directly via HTTP.
  private Bridge bridge;

  @Override
  public void onCreate() {
    // Create the corona network gateway, don't do anything with it
    try {
      bridge = new Bridge(getFilesDir().getPath());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    // Create a notification channel to talk between the service and the UI
    NotificationManager manager = getSystemService(NotificationManager.class);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel channel = new NotificationChannel(
        "CoronaNetworkServiceChannel",
        "Corona Network Service Channel",
        NotificationManager.IMPORTANCE_DEFAULT
      );
      channel.setSound(null, null);
      manager.createNotificationChannel(channel);
    }
    // Tell Android to convert this service into a foreground one
    Intent notificationIntent = new Intent(this, MainActivity.class);
    PendingIntent notificationPendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

    Notification.Builder notifier = new Notification.Builder(this, "CoronaNetworkServiceChannel");
    Notification notification = notifier
      .setSmallIcon(R.drawable.sym_def_app_icon)
      .setSound(null)
      .setContentIntent(notificationPendingIntent)
      .build();

    startForeground(1, notification);

    try {
      bridge.enableGateway();
    } catch (Exception e) {
      e.printStackTrace();
    }
    // Start a background thread to periodically update the notification status
    Thread updater = new Thread() {
      public void run() {
        while (true) {
          try {
            GatewayStatus status = bridge.gatewayStatus();
            if (!status.getEnabled()) {
              notifier.setContentTitle("You are currently offline");
              notifier.setContentText("You won't get or send updates");
            } else if (!status.getConnected()) {
              notifier.setContentTitle("You are currently connecting");
              notifier.setContentText("Waiting for mobile or WiFi network");
            } else {
              notifier.setContentTitle("You are currently online");

              long   ingress    = status.getIngress();
              String ingressStr = ingress < 1024L ? ingress + " B"
                : ingress <= 0xfffccccccccccccL >> 40 ? String.format("%.1f KiB", ingress / 0x1p10)
                : ingress <= 0xfffccccccccccccL >> 30 ? String.format("%.1f MiB", ingress / 0x1p20)
                : ingress <= 0xfffccccccccccccL >> 20 ? String.format("%.1f GiB", ingress / 0x1p30)
                : ingress <= 0xfffccccccccccccL >> 10 ? String.format("%.1f TiB", ingress / 0x1p40)
                : ingress <= 0xfffccccccccccccL ? String.format("%.1f PiB", (ingress >> 10) / 0x1p40)
                : String.format("%.1f EiB", (ingress >> 20) / 0x1p40);

              long   egress    = status.getEgress();
              String egressStr = egress < 1024L ? egress + " B"
                : egress <= 0xfffccccccccccccL >> 40 ? String.format("%.1f KiB", egress / 0x1p10)
                : egress <= 0xfffccccccccccccL >> 30 ? String.format("%.1f MiB", egress / 0x1p20)
                : egress <= 0xfffccccccccccccL >> 20 ? String.format("%.1f GiB", egress / 0x1p30)
                : egress <= 0xfffccccccccccccL >> 10 ? String.format("%.1f TiB", egress / 0x1p40)
                : egress <= 0xfffccccccccccccL ? String.format("%.1f PiB", (egress >> 10) / 0x1p40)
                : String.format("%.1f EiB", (egress >> 20) / 0x1p40);

              notifier.setContentText("Downloaded " + ingressStr + ", uploaded " + egressStr);
            }
            manager.notify(1, notifier.build());

            Thread.sleep(5000);
          } catch (Exception e) { }
        }
      }
    };
    updater.start();

    // A new user interface attached to the gateway, inject the certs
    try {
      GhostBridge.init(bridge.port(), bridge.cert(), bridge.token());
    } catch (Exception e) {
      e.printStackTrace();
    }
    // If we get killed, after returning from here, restart
    return START_STICKY;
  }

  @Override
  public IBinder onBind(Intent intent) {
      return null;
  }

  @Override
  public void onDestroy() {
  }
}
