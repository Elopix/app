package com.bslim_upload;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.imagepicker.ImagePickerPackage;
import com.sha256lib.Sha256Package;
import com.BV.LinearGradient.LinearGradientPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import org.reactnative.camera.RNCameraPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNImgToBase64Package(),
            new ImagePickerPackage(),
            new Sha256Package(),
            new LinearGradientPackage(),
            new SnackbarPackage(),
            new RNCameraPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeOneSignalPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
